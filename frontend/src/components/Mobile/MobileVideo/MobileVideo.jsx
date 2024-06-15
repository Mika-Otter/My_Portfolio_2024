import React from "react";
import s from "./MobileVideo.module.scss";
import VideoPhone from "../../../assets/video/VideoPhone.mp4";
import Video from "../../Video/Video";

export default function MobileVideo() {
  return (
    <>
      <div className={s.video}>
        <video src={VideoPhone} loop muted playsInline autoPlay />
      </div>
    </>
  );
}
