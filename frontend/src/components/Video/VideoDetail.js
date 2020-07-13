import React from "react";

const VideoDetails = function (props) {
  if (!props.video) {
    return <div>Loading...</div>;
  }
  const videoSrc = "https://www.youtube.com/embed/";

  return (
    <div>
      <div className="ui embed">
        <iframe
          title="video player"
          src={videoSrc + props.video.id.videoId}
        ></iframe>
      </div>
      <div class="jumbotron" style={{ opacity: 0.8 }}>
        <h4 className="ui header">{props.video.snippet.title}</h4>
      </div>
    </div>
  );
};

export default VideoDetails;
