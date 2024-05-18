import { useRef, useEffect, useState } from "react";
import { initializeGame } from "../gameLogic/GameIntializer";
import { HandleInput } from "../gameLogic/InputManager";
import { gameAnimate } from "../gameLogic/GameAnimate";
import { useBackgroundHeight, useSetBackgroundHeight } from "../context/BackgroundHeightContext";

export default function Canvas({ isPlayed, toExp, changetoExp, RoomLevel, changeRoom }) {
    const canvasRef = useRef(null);
    const backgroundHeight = useBackgroundHeight();
    const setBackgroundHeight = useSetBackgroundHeight();
    const [keysTab, setKeysTab] = useState([]);
    const [lastKeysTab, setLastKeysTab] = useState([""]);
    const [inputHandler, setInputHandler] = useState(null);
    let handler;
    const [firstGame, setFirstGame] = useState(true);
    const [player, setPlayer] = useState(null);
    const [canvas, setCanvas] = useState(null);
    const [ctx, setCtx] = useState(null);

    // useEffect(() => {
    //     console.log(RoomLevel, "yooooo");
    // }, [RoomLevel]);

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
        if (toExp) {
            // player.goToExp()
            player.enterInDoor();
            changetoExp();
            setTimeout(() => {
                setChangingLevel(true);
            }, 50);
        }
    });

    useEffect(() => {
        const newCanvas = canvasRef.current;
        const newCtx = newCanvas.getContext("2d");
        newCanvas.width = window.width;
        newCanvas.height = window.height;
        setCanvas(newCanvas);
        setCtx(newCtx);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animation;

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
        setPlayer(player);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        function mainChangeLevel() {
            if (mapRow.row > mapRow.precedentRow) {
                i++;
                if (i < collisionBlocksList.length) {
                    currentCollisionLevel = collisionBlocksList[i];
                }
            }
        }

        let lastTime = 0;
        function animate(timeStamp) {
            // const deltaTime = timeStamp - lastTime;
            // lastTime = timeStamp;

            mainChangeLevel();

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.translate(camera.position.x, camera.position.y);

            doors.forEach((door) => {
                door.draw(ctx);
            });

            background.draw(ctx, canvas);
            currentCollisionLevel.forEach((collisionBlock) => {
                collisionBlock.draw(ctx);
            });
            player.draw(ctx);
            player.updatePlayer({
                background,
                context: ctx,
                canvas,
                camera,
            });
            if (RoomLevel === 1) {
                water.draw(ctx, canvas);
                cloud.draw(ctx, canvas);
            }
            ctx.restore();

            ctx.save();

            ctx.globalAlpha = overlay.opacity;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
            animation = requestAnimationFrame(animate);
        }

        background.onload = animate(0);
        setBackgroundHeight(background.height);
        return () => {
            cancelAnimationFrame(animation);
        };
    }, [RoomLevel]);

    return <canvas ref={canvasRef} />;
}
