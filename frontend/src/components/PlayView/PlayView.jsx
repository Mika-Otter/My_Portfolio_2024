import React from "react";
import s from "./PlayView.module.scss";

export default function PlayView({ playMode, viewMode, isPlayed, firstControls, handleControls }) {
    return (
        <div className={s.playView}>
            <button
                type="button"
                className={isPlayed ? s.playView__viewOff : s.playView__view}
                onClick={() => viewMode()}
            >
                VIEW
            </button>
            <button
                type="button"
                className={isPlayed ? s.playView__play : s.playView__playOff}
                onClick={() => {
                    playMode();
                    if (firstControls) {
                        handleControls();
                    }
                }}
            >
                PLAY
            </button>
        </div>
    );
}
