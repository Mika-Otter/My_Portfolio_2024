import React, { useEffect, useRef, useState } from "react";
import s from "./Audio.module.scss";

export default function AudioPlayer() {
    const audioPlayerRef = useRef();
    const [playingAudio, setPlayingAudio] = useState(false);
    const canvasRef = useRef();

    let testAudio = new Audio("./douceuridealev12.mp3");

    function playMusic() {
        setPlayingAudio((prevPlayingAudio) => !prevPlayingAudio);
        console.log(playingAudio);
    }

    useEffect(() => {
        playingAudio ? audioPlayerRef.current.play() : audioPlayerRef.current.pause();
    }, [playingAudio]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 200;
        canvas.height = 200;

        const squares = [
            { x: 10, y: 50, width: 10, height: 20, color: "blue", dx: 1, dy: 0 },
            { x: 30, y: 50, width: 10, height: 20, color: "blue", dx: 0, dy: 1 },
            { x: 50, y: 50, width: 10, height: 20, color: "blue", dx: 1, dy: 1 },
            { x: 70, y: 50, width: 10, height: 20, color: "blue", dx: 0, dy: 1 },
            { x: 90, y: 50, width: 10, height: 20, color: "blue", dx: 1, dy: 0 },
        ];

        function drawSquare(square) {
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, square.width, square.height);
        }

        function updateSquare(square) {
            // Mettre à jour la position du carré
            square.x += square.dx;
            square.y += square.dy;

            // Si le carré atteint les bords, changer de direction
            if (square.x <= 0 || square.x + square.width >= canvas.width) {
                square.dx *= -1;
            }
            if (square.y <= 0 || square.y + square.height >= canvas.height) {
                square.dy *= -1;
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            squares.forEach((square) => {
                updateSquare(square);
                drawSquare(square);
            });

            requestAnimationFrame(animate);
        }

        animate();
    });

    return (
        <>
            <div className={s.audioplayer}>
                <audio ref={audioPlayerRef} controls loop src="./douceuridealev8.mp3"></audio>
                <button type="button" onClick={() => playMusic()}>
                    hello
                </button>
                <canvas ref={canvasRef}></canvas>
            </div>
        </>
    );
}
