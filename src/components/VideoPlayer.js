import React from "react";

function VideoPlayer() {
  return (
    <React.Fragment>
      <div className="video-container">
        <video controls autoPlay>
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"></source>
        </video>
      </div>
    </React.Fragment>
  );
}

export default VideoPlayer;
