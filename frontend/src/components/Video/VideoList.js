import React from "react";
import VideoItem from "./VideoItem";

const VideoList = function (props) {
  const videos = props.videos;

  const renderedList = videos.map((video) => {
    return (
      <VideoItem
        key={video.id.videoId}
        onVideoSelect={props.onVideoSelect}
        videoURL={video}
      />
    );
  });

  return <div className="videoList">{renderedList}</div>;
};

export default VideoList;
