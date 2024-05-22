import React, { useEffect, useRef } from "react";
import s from "./Audio.module.scss";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { initializeCanvas } from "./utils/animationAudio";

export default function AudioPlayer({ activeSound }) {
    const { audioPlayerRef, playingAudio, playMusic } = useAudioPlayer(0.2, activeSound);
    const canvasRef = useRef();
    const animationRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const speed = 0.07;
        const squares = [
            { x: 9, y: 35, width: 3, height: -5, color: "black", dy: 0.7, max: -6 },
            { x: 14, y: 35, width: 3, height: -5, color: "black", dy: 2, max: -13 },
            { x: 19, y: 35, width: 3, height: -5, color: "black", dy: 3, max: -15 },
            { x: 24, y: 35, width: 3, height: -5, color: "black", dy: 1.6, max: -16 },
            { x: 29, y: 35, width: 3, height: -5, color: "black", dy: 1, max: -8 },
        ];
        const animate = initializeCanvas(canvas, squares, speed);
        animationRef.current = requestAnimationFrame(() => animate(playingAudio));
        return () => cancelAnimationFrame(animationRef.current);
    }, [playingAudio]);

    return (
        <div className={s.audioplayer}>
            <audio
                ref={audioPlayerRef}
                controls
                loop
                src="./douceuridealev8.mp3"
                className={s.audioplayer__player}
            ></audio>
            <canvas ref={canvasRef} onClick={playMusic}></canvas>
        </div>
    );
}
