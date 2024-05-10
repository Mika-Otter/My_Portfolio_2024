import React, { useEffect, useRef, useState } from "react";

export default function Test() {
    const canvasRef = useRef();
    const [counter, setCounter] = useState(1);

    function handleCounter() {
        setCounter((prev) => prev + 1);
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 300;
        canvas.height = 300;

        let x = 100;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "red";
            ctx.fillRect(x, 100, 30, 30);
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            x -= 1;

            if (x < 1) {
                x * -1;
            }
            draw();
            requestAnimationFrame(animate);
        }

        animate(); // Commence l'animation
    }, [counter]);

    return (
        <>
            <button type="button" onClick={() => handleCounter()}>
                Add
            </button>
            <span>{counter}</span>
            <canvas ref={canvasRef}></canvas>
        </>
    );
}
