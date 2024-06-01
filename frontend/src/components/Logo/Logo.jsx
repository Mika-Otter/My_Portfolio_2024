import React from "react";
import s from "./Logo.module.scss";
import { LogoSVG } from "../SVG/LogoSVG";

export default function Logo({handleGoToHome}) {
    return (
        <div className={s.logo} onClick={() => handleGoToHome()}>
            <LogoSVG />
        </div>
    );
}
