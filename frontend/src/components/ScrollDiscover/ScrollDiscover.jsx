import React from "react";
import s from "./ScrollDiscover.module.scss";

export default function ScrollDiscover({ isMobile }) {
  return (
    <div className={isMobile ? s.scroll__mobile : s.scroll}>
      <div className={isMobile ? s.scroll__mobile__text : s.scroll__text}>
        <span>SCROLL FOR DISCOVER</span>
      </div>
      <div
        className={isMobile ? s.scroll__mobile__circle : s.scroll__circle}
      ></div>
    </div>
  );
}
