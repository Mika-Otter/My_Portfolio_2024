import React from "react";
import s from "./Title.module.scss";

export default function Title() {
    return (
        <>
            <div className={s.title}>
                <h1 className={s.title__first}>I CREATE FOR</h1>
                <h1 className={s.title__second}>YOU</h1>
                <div className={s.smalltext}>
                    <span>interactive experiences</span>
                    <span className={s.smalltext__second}>find the eggs and enjoy.</span>
                </div>
            </div>
        </>
    );
}
