import React from "react";
import "./VideoItem.css";

const VideoItem = function (props) {
  return (
    <div
      onClick={() => props.onVideoSelect(props.videoURL)}
      className="video-item item"
    >
      <img
        src={props.videoURL.snippet.thumbnails.medium.url}
        alt={props.videoURL.snippet.title}
        className="ui image"
      />
      <div className="content">
        <div className="header">{props.videoURL.snippet.title}</div>
        <br />
        <div className="header">
          {props.videoURL.snippet.publishTime.split("T")[0]}
        </div>
      </div>
    </div>
  );
};
export default VideoItem;
