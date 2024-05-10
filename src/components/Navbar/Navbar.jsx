import React from "react";
import s from "./Navbar.module.scss";
import { MenuBoxSVG } from "../SVG/MenuBox";
import { LetsTalkBoxSVG } from "../SVG/LetsTalkBoxSVG";
import { LogoSVG } from "../SVG/LogoSVG";
import Logo from "../Logo/Logo";
import { SoundSVG } from "../SVG/SoundSVG";
import { MenuIconSVG } from "../SVG/MenuIconSVG";
import { ArrowLetsTalkSVG } from "../SVG/ArrowLetsTalksSVG";
import AudioPlayer from "../Audio/Audio";

export default function Navbar({ activeSound, handleMenu }) {
    return (
        <div className={s.navbar}>
            <div className={s.navbar__menu}>
                <span onClick={() => handleMenu()}>MENU</span>
                {/* <div className={s.navbar__menu__icone}>
                    <MenuIconSVG />
                </div> */}
            </div>
            <div className={s.navbar__letstalk}>
                <span>CONTACT </span>
                <div className={s.navbar__letstalk__icone}>{/* <ArrowLetsTalkSVG /> */}</div>
                <span>/</span>
            </div>
            <div className={s.navbar__sound}>
                <AudioPlayer activeSound={activeSound} />
            </div>
        </div>
    );
}
