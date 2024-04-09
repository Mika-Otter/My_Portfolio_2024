import React, { useState } from "react";
import useCanvas from "../hooks/useCanvas";
import drawPlayer from "./Player/drawPlayer";
import movePlayer from "./Player/movePlayer";

export default function Canvas() {
    const [x, setX] = useState(100);
    const [y, setY] = useState(100);

    const handleKeyDown = (e) => {
        movePlayer(e, setX, setY, x, y);
        console.log(x, "yoooooooooosssssssss"); // Déplace le joueur en fonction de la touche enfoncée
    };

    const handleDraw = (ctx) => {
        drawPlayer(ctx, x, y); // Dessine le joueur à sa position actuelle
    };

    const canvasRef = useCanvas(handleDraw);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            tabIndex={0} // Permet au canvas de recevoir les événements de clavier
            onKeyDown={(e) => handleKeyDown(e)}
        />
    );
}
