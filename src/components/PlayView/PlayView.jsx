import React from "react";
import s from "./PlayView.module.scss";

export default function PlayView({ playMode, viewMode }) {
    return (
        <div className={s.playView}>
            <button type="button" className={s.playView__view} onClick={() => viewMode()}>
                VIEW
            </button>
            <button type="button" className={s.playView__play} onClick={() => playMode()}>
                PLAY
            </button>
        </div>
    );
}
