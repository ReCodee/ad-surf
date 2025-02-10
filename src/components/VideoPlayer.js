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
    fetchAd();
    const interval = setInterval(() => {
      fetchAd();
      randomizePosition();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchAd = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_AD_STREAM_URL}/ads`);
    setAd(data[Math.floor(Math.random() * data.length)]);
  };

  const randomizePosition = () => {
    setPosition({
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 70 + 10}%`,
      bottom: `${Math.random() * 30 + 10}%`,
      right: `${Math.random() * 70 + 30}%`,
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
