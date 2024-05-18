import React from "react";
import s from "./Logo.module.scss";
import { LogoSVG } from "../SVG/LogoSVG";

export default function Logo() {
    return (
        <div className={s.logo}>
            <LogoSVG />
        </div>
    );
}
