import { useRef, useEffect } from "react";
import { initializeGame } from "../gameLogic/GameIntializer";
import Background from "../Background";
import { Door } from "./Environnement/Door";
import { ActivePlayer } from "./Player/PlayerActive";
import { parseCollisions } from "../gameLogic/CollisionLevel";
import { HandleInput } from "../gameLogic/InputManager";
import { gameAnimate } from "../gameLogic/GameAnimate";

export default function Canvas({ setMapRow }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let {
            player,
            keysTab,
            lastKeysTab,
            camera,
            doors,
            background,
            currentCollisionLevel,
            collisionBlocksList,
            i,
            RoomLevel,
            RoomsLevels,
            input,
            overlay,
            mapRow,
        } = initializeGame(canvas);

        function mainChangeLevel() {
            if (mapRow.row > mapRow.precedentRow) {
                i++;
                if (i < collisionBlocksList.length) {
                    currentCollisionLevel = collisionBlocksList[i];
                }
            }
        }

        gameAnimate({
            ctx,
            canvas,
            camera,
            doors,
            player,
            background,
            currentCollisionLevel,
            overlay,
            mainChangeLevel,
        });
    }, []);

    return <canvas ref={canvasRef} />;
}
