import React from "react";
import s from "./Navbar.module.scss"
import AudioPlayer from "../Audio/Audio";

export default function Navbar({ activeSound, handleMenu }) {
    return (
        <div className={s.navbar}>
            <div className={s.navbar__rotator}>
                <div className={s.navbar__ctn}>
                    <div className={s.navbar__ctn__wrapper} onClick={() => handleMenu()}>
                        <div className={s.navbar__ctn__button}>
                            <span>MENU</span>
                            <span>MENU</span>
                        </div>
                        {/* <div className={s.navbar__menu__icone}>
                    <MenuIconSVG />
                </div> */}
                    </div>
                    <div className={s.navbar__ctn__separator}>
                        <span>/</span>
                    </div>
                    <div className={s.navbar__ctn__wrapper}>
                        <div className={s.navbar__ctn__button}>
                            <span>CONTACT </span>
                            <span>CONTACT </span>
                        </div>
                    </div>
                </div>
                <div className={s.navbar__sound}>
                    <AudioPlayer activeSound={activeSound} />
                </div>
            </div>
        </div>
    );
}
