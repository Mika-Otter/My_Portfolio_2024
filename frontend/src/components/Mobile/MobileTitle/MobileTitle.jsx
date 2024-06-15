import React from "react";
import s from "./MobileTitle.module.scss";

export default function MobileTitle() {
  return (
    <>
      <div className={s.title}>
        <h2 className={s.title__one}>I CREATE</h2>
        <h2 className={s.title__two}>FOR YOU</h2>
        <div className={s.title__line}>
          <span className={s.title__line__text}>interactive experiences</span>
          <span className={s.title__line__text}>go to desktop</span>

          <span className={s.title__line__text}>for full experience.</span>
        </div>
      </div>
    </>
  );
}
