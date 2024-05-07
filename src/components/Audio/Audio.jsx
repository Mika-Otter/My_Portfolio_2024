import React, { useEffect, useRef, useState } from "react";
import s from "./Audio.module.scss";

export default function AudioPlayer() {
    const audioPlayerRef = useRef();
    const [playingAudio, setPlayingAudio] = useState(false);

    let testAudio = new Audio("./douceuridealev8.mp3");

    function playMusic() {
        setPlayingAudio((prevPlayingAudio) => !prevPlayingAudio);
        console.log(playingAudio);
    }

    useEffect(() => {
        playingAudio ? audioPlayerRef.current.play() : audioPlayerRef.current.pause();
    }, [playingAudio]);

    return (
        <>
            <div className={s.audioplayer}>
                <audio ref={audioPlayerRef} controls src="./douceuridealev8.mp3"></audio>
                <button type="button" onClick={() => playMusic()}>
                    hello
                </button>
            </div>
        </>
    );
}
