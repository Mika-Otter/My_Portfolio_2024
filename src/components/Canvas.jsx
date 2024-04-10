import { useRef, useEffect } from "react";
import { initializeGame } from "../gameLogic/GameIntializer";
import Background from "../Background";
import { Door } from "./Game/Environnement/Door";
import { ActivePlayer } from "./Game/Player/PlayerActive";
import { parseCollisions } from "../gameLogic/CollisionLevel";
import { HandleInput } from "../gameLogic/InputManager";
import { gameAnimate } from "../gameLogic/GameAnimate";
import { useBackgroundHeight, useSetBackgroundHeight } from "../context/BackgroundHeightContext";

export default function Canvas({ setMapRow }) {
    const canvasRef = useRef(null);
    const backgroundHeight = useBackgroundHeight();
    const setBackgroundHeight = useSetBackgroundHeight();

    useEffect(() => {
        window.scrollBy(0, -100);
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
        setBackgroundHeight(background.height);
    }, []);

    return <canvas ref={canvasRef} />;
}
