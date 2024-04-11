import React from "react";
import s from "./Navbar.module.scss";
import { MenuBoxSVG } from "../SVG/MenuBox";
import { LetsTalkBoxSVG } from "../SVG/LetsTalkBoxSVG";

export default function Navbar() {
    return (
        <div className={s.navbar}>
            <div className={s.navbar__logo}>
                <img src="./logo.png" alt="logo" />
            </div>
            <div className={s.navbar__menu}>
                <MenuBoxSVG />
            </div>
            <div className={s.navbar__letstalk}>
                <LetsTalkBoxSVG />
            </div>
            <div className={s.navbar__sound}>
                <img src="./fake-sound.png" alt="logo" />
            </div>
        </div>
    );
}
