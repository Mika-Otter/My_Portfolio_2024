import React, { useEffect, useRef } from "react";
import s from "./Wind.module.scss";
import { Winds } from "../Winds";

export default function Wind() {
    const canvasWindRef = useRef();

    useEffect(() => {
        const canvas = canvasWindRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        const CANVAS_WIDTH = canvas.width;
        canvas.height = window.innerHeight;
        const CANVAS_HEIGHT = canvas.height;
        const winds = new Winds(canvas);

        let lastTime = 0;
        function animate(timeStamp) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;

            requestAnimationFrame(animate);

            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            winds.draw(ctx);
            winds.update(deltaTime);
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
//     frameX * spriteWidth
//     0,
//     spriteWidth,
//     spriteHeight,
//     0,
//     0,
//     spriteWidth,
//     spriteWidth
// );
