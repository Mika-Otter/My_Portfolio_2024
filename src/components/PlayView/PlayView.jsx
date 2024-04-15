import React from "react";
import s from "./PlayView.module.scss";

export default function PlayView(setIsPlayed) {
    return (
        <div className={s.playView}>
            <button type="button" className={s.playView__play}>
                PLAY
            </button>
            <span>/</span>
            <button type="button" className={s.playView__view}>
                VIEW
            </button>
        </div>
    );
}
