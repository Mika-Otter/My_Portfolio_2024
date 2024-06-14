import React from "react";
import s from "./MobileNavbar.module.scss";
import { LogoSVG } from "../../SVG/LogoSVG";
import AudioPlayer from "../../Audio/Audio";
import Logo from "../../Logo/Logo";

export default function MobileNavbar({ activeSound }) {
  return (
    <>
      <nav className={s.navbar}>
        <div className={s.logo}>
          <Logo color={"#091429"} />
        </div>
        <div className={s.menu}>
          <span>Menu</span>
        </div>
        <div className={s.contact}>
          <span>Contact</span>
        </div>
        <div className={s.audio}>
          <AudioPlayer color={"#091429"} activeSound={activeSound} />
        </div>
      </nav>
    </>
  );
}
