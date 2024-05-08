import React, { useEffect, useRef } from "react";
import s from "./Wind.module.scss";

export default function Wind() {
    const canvasWindRef = useRef();

    useEffect(() => {
        const canvas = canvasWindRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        const CANVAS_WIDTH = canvas.width;
        canvas.height = window.innerHeight;
        const CANVAS_HEIGHT = canvas.height;

        const windImg = new Image();
        windImg.src = "/regularwind.png";
        const spriteWidth = 1640;
        const spriteHeight = 700;
        let frameX = 0;

        function animate() {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            // ctx.fillStyle = "red";
            // ctx.fillRect(20, 20, 500, 500);
            ctx.drawImage(windImg, 0, 0);

            // if (frameX < 45) frameX++;
            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return (
        <>
            <canvas ref={canvasWindRef} className={s.wind}></canvas>
        </>
    );
}

// ctx.drawImage(
//     windImg,
//     frameX * spriteWidth,
//     0,
//     spriteWidth,
//     spriteHeight,
//     0,
//     0,
//     spriteWidth,
//     spriteWidth
// );
