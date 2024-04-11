import React from "react";
import s from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <div className={s.navbar}>
            <div className={s.navbar__logo}>
                <img src="./logo.png" alt="" />
            </div>
            <div className={s.navbar__menu}></div>
            <div className={s.navbar__letstalk}></div>
            <div className={s.navbar__sound}></div>
        </div>
    );
}
