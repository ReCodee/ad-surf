import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./VideoPlayer.css";

export default function VideoPlayer() {
  const [ad, setAd] = useState(null);
  const [position, setPosition] = useState({
    top: "10%",
    left: "10%",
    bottom: "30%",
    right: "10%",
  });
  const [adHoverStart, setAdHoverStart] = useState(0);
  const videoRef = useRef(null);
  const adContainerRef = useRef(null);
  const wsRef = useRef(null);

  const toggleFullScreen = async () => {
    const container = document.querySelector(".video-container");
    if (!document.fullscreenElement) {
      try {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (container.webkitRequestFullScreen) {
          await container.webkitRequestFullScreen();
        } else if (container.mozRequestFullScreen) {
          await container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
          await container.msRequestFullscreen();
        }
      } catch (err) {
        console.error("Failed to enter fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    wsRef.current = new WebSocket(`${process.env.REACT_APP_AD_STREAM_URL}/ws/ads`);

    wsRef.current.onmessage = (event) => {
      const ad = JSON.parse(event.data);
      console.log(ad);
      setAd(ad);
      randomizePosition();
    };

    wsRef.current.onclose = () => {
      setTimeout(() => {
        wsRef.current = new WebSocket(`${process.env.REACT_APP_AD_STREAM_URL}/ws/ads`);
      }, 1000);
    };

    // const interval = setInterval(() => {
    //   if (wsRef.current.readyState === WebSocket.OPEN) {
    //     wsRef.current.send('fetch');
    //   }
    //   randomizePosition();
    // }, 10000);

  }, []);

  const randomizePosition = () => {
    setPosition({
      top: `${Math.random() * 50 + 10}%`,   
      left: `${Math.random() * 50 + 10}%`,  
      bottom: `${Math.random() * 20 + 20}%`,
      right: `${Math.random() * 50 + 20}%`,
    });
  };

  const handleAdClick = async () => {
    const adRect = adContainerRef.current.getBoundingClientRect();
    const videoRect = videoRef.current.getBoundingClientRect();
    const relativeX = adRect.left - videoRect.left;
    const relativeY = adRect.top - videoRect.top;

    await axios.post(`${process.env.REACT_APP_AD_STREAM_URL}/ads/click`, {
      adId: ad.id,
      timestamp: new Date().toISOString(),
      videoTime: videoRef.current.currentTime,
      hoverTime: (new Date().getTime() - adHoverStart) / 1000,
      position: {
        x: Math.round(relativeX),
        y: Math.round(relativeY),
      }

    });
    window.open(ad.url, "_blank");
  };

  return (
    <div className="video-container">
      <video ref={videoRef} id="video" className="video" controls autoPlay>
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>
      {ad && (
        <div
          ref={adContainerRef}
          className="ad-container"
          style={{ ...position }}
          onClick={handleAdClick}
          onMouseEnter={() => setAdHoverStart(new Date().getTime())}
        >
          <img src={ad.image} alt="Ad" className="ad-image" />
        </div>

      )}
      <button className="fullscreen-toggle-btn" onClick={toggleFullScreen}>
        ⛶
      </button>
    </div>
  );
}
