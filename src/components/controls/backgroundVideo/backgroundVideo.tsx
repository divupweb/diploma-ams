import React from "react";
import videoplayback from "../../../assets/videos/videoplayback.mp4";
import "./backgroundVideo.scss";

const BackgroundVideo: React.FC = () => {
  return (
    <video className="video-background" loop autoPlay muted id="myVideo">
      <source src={videoplayback} type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;
