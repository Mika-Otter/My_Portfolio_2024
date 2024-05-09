import React, { useEffect, useRef, useState } from "react";
import s from "./Audio.module.scss";

export default function AudioPlayer({ activeSound }) {
    const audioPlayerRef = useRef();
    const [playingAudio, setPlayingAudio] = useState(false);
    const canvasRef = useRef();
    const animationRef = useRef();

    let testAudio = new Audio("./douceuridealev12.mp3");

    function playMusic() {
        setPlayingAudio((prevPlayingAudio) => !prevPlayingAudio);
        console.log(playingAudio);
    }

    useEffect(() => {
        activeSound ? setPlayingAudio(true) : null;
    }, [activeSound]);

    useEffect(() => {
        playingAudio ? audioPlayerRef.current.play() : audioPlayerRef.current.pause();
    }, [playingAudio]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 40;
        canvas.height = 50;

        let speed = 0.07;

        const squares = [
            { x: 9, y: 35, width: 3, height: -5, color: "black", dy: 0.7, max: -6 },
            { x: 14, y: 35, width: 3, height: -5, color: "black", dy: 2, max: -13 },
            { x: 19, y: 35, width: 3, height: -5, color: "black", dy: 3, max: -15 },
            { x: 24, y: 35, width: 3, height: -5, color: "black", dy: 1.6, max: -16 },
            { x: 29, y: 35, width: 3, height: -5, color: "black", dy: 1, max: -8 },
        ];

        function drawSquare(square) {
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, square.width, square.height);
        }

        function updateSquare(square) {
            // Update the position of the square
            square.height += square.dy * speed;

            // If the square goes beyond the boundaries, reset its position
            if (square.height <= square.max || square.height > -5) {
                square.dy *= -1;
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            squares.forEach((square) => {
                drawSquare(square);
            });
            if (playingAudio) {
                squares.forEach((square) => {
                    updateSquare(square);
                });
            } else {
                squares.forEach((square) => {
                    if (square.height <= -5) {
                        square.height += 0.1;
                        square.color = "";
                    }
                });
            }

            animationRef.current = requestAnimationFrame(animate);
        }
        animate();
        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [playingAudio]);

    return (
        <>
            <div className={s.audioplayer}>
                <audio
                    ref={audioPlayerRef}
                    controls
                    loop
                    src="./douceuridealev8.mp3"
                    className={s.audioplayer__player}
                ></audio>
                <canvas ref={canvasRef} onClick={() => playMusic()}></canvas>
            </div>
        </>
    );
}
