import React, { useEffect, useRef, useState } from "react";
import { HandleInput } from "../gameLogic/InputManager";
import { TestOne } from "./Test";

export default function Test() {
    const canvasRef = useRef();
    const [counter, setCounter] = useState(1);
    const [inputHandler, setInputHandler] = useState(null);
    const [keysTab, setKeysTab] = useState([]);
    const [lastKeysTab, setLastKeysTab] = useState([""]);
    const [player, setPlayer] = useState(null);
    const [canvas, setCanvas] = useState(null);
    const [ctx, setCtx] = useState(null);
    let handler;
    const [changingColor, setChangingColor] = useState(false);

    function handleCounter() {
        setCounter((prev) => prev + 1);
    }

    const changeColor = () => {
        setChangingColor(true);
    };

    useEffect(() => {
        handler = new HandleInput(keysTab, lastKeysTab);
        setInputHandler(handler);
        handler.initializeKeyListener();

        return () => {
            if (handler) {
                handler.removeListeners();
            }
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 300;
        canvas.height = 300;
        setCanvas(canvas);
        setCtx(ctx);
        let newPlayer = new TestOne({ keysTab: keysTab });
        setPlayer(newPlayer);
    }, []);

    useEffect(() => {
        if (player !== null) {
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                player.draw(ctx);
                player.update(ctx);
                requestAnimationFrame(animate);
            }

            animate();
        }
    }, [counter]);

    useEffect(() => {
        if (player !== null && changingColor) {
            player.changeColor(); // Met à jour la couleur de l'objet
        }
    }, [changingColor]);
    return (
        <>
            <button type="button" onClick={() => handleCounter()}>
                Add
            </button>
            <button type="button" onClick={() => changeColor()}>
                Change color
            </button>
            <span>{counter}</span>
            <canvas ref={canvasRef}></canvas>
        </>
    );
}
