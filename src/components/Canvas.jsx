import { useRef, useEffect, useState } from "react";
import { initializeGame } from "../gameLogic/GameIntializer";
import Background from "./Game/Environnement/Background";
import { Door } from "./Game/Environnement/Door";
import { ActivePlayer } from "./Game/Player/PlayerActive";
import { parseCollisions } from "../gameLogic/CollisionLevel";
import { HandleInput } from "../gameLogic/InputManager";
import { gameAnimate } from "../gameLogic/GameAnimate";
import { useBackgroundHeight, useSetBackgroundHeight } from "../context/BackgroundHeightContext";

export default function Canvas({ setMapRow, isPlayed, toExp, changetoExp }) {
    const canvasRef = useRef(null);
    const backgroundHeight = useBackgroundHeight();
    const setBackgroundHeight = useSetBackgroundHeight();
    const [keysTab, setKeysTab] = useState([]);
    const [lastKeysTab, setLastKeysTab] = useState([""]);
    const [inputHandler, setInputHandler] = useState(null);
    let handler;
    const [firstGame, setFirstGame] = useState(true);
    const [player, setPlayer] = useState(null);
    const [RoomLevel, setRoomLevel] = useState(1);

    const changeRoom = () => {
        setRoomLevel(2);
    };

    useEffect(() => {
        console.log(RoomLevel, "yooooo");
    }, [RoomLevel]);

    useEffect(() => {
        handler = new HandleInput(keysTab, lastKeysTab, isPlayed);
        setInputHandler(handler);

        // Appeler les méthodes d'initialisation après la création de l'instance HandleInput
        if (!isPlayed) {
            handler.initializeWheelListener();
        } else {
            handler.initializeKeyListener();
        }
        return () => {
            if (handler) {
                handler.removeListeners();
            }
        };
    }, [isPlayed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.scrollBy(0, -100);

        let {
            player,
            camera,
            doors,
            background,
            currentCollisionLevel,
            collisionBlocksList,
            i,
            overlay,
            mapRow,
            water,
            cloud,
        } = initializeGame({ canvas, keysTab, lastKeysTab, toExp, RoomLevel, changeRoom });

        function mainChangeLevel() {
            if (mapRow.row > mapRow.precedentRow) {
                i++;
                if (i < collisionBlocksList.length) {
                    currentCollisionLevel = collisionBlocksList[i];
                }
            }
        }

        if (toExp) {
            // player.goToExp()
            player.enterInDoor();
            changetoExp();
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
            water,
            cloud,
        });
        setBackgroundHeight(background.height);
    }, [changeRoom, toExp]);

    return <canvas ref={canvasRef} />;
}
