import React from "react";
import s from "./Navbar.module.scss";
import { MenuBoxSVG } from "../SVG/MenuBox";
import { LetsTalkBoxSVG } from "../SVG/LetsTalkBoxSVG";
import { LogoSVG } from "../SVG/LogoSVG";
import Logo from "../Logo/Logo";
import { SoundSVG } from "../SVG/SoundSVG";

export default function Navbar() {
    return (
        <div className={s.navbar}>
            <div className={s.navbar__menu}>
                <span>MENU</span>
            </div>
            <div className={s.navbar__letstalk}>
                <span>LET'S TALK</span>
            </div>
            <div className={s.navbar__sound}>
                <SoundSVG />
            </div>
        </div>
    );
}
