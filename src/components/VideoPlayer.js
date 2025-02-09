import React from "react";
import "./VideoPlayer.css";

function VideoPlayer() {
  return (
    <div className="video-container">
      <video id="video" className="video" controls autoPlay>
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        ></source>
      </video>
    </div>
  );
}

export default VideoPlayer;
