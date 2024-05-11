import { useRef, useEffect, useState } from "react";
import { initializeGame } from "../gameLogic/GameIntializer";
import { HandleInput } from "../gameLogic/InputManager";
import { gameAnimate } from "../gameLogic/GameAnimate";
import { useBackgroundHeight, useSetBackgroundHeight } from "../context/BackgroundHeightContext";
import { Game } from "../gameLogic/GameInit";

export default function CanvasTest({
    isPlayed,
    toExp,
    changetoExp,
    RoomLevel,
    changeRoom,
    nextLevel,
}) {
    const canvasRef = useRef(null);
    const backgroundHeight = useBackgroundHeight();
    const setBackgroundHeight = useSetBackgroundHeight();
    const [keysTab, setKeysTab] = useState([]);
    const [lastKeysTab, setLastKeysTab] = useState([""]);
    const [inputHandler, setInputHandler] = useState(null);
    let handler;
    const [firstGame, setFirstGame] = useState(true);
    const [player, setPlayer] = useState(null);
    const [changingLevel, setChangingLevel] = useState(false);

    useEffect(() => {
        handler = new HandleInput(keysTab, lastKeysTab, isPlayed);
        setInputHandler(handler);

        // Appeler les méthodes d'initialisation après la création de l'instance HandleInput
        if (!isPlayed) {
            handler.initializeWheelListener();
        } else {
            handler.initializeKeyListener();
        }
        if (nextLevel === true) {
            handler.removeListeners();
        }
        return () => {
            if (handler) {
                handler.removeListeners();
            }
        };
    }, [isPlayed, RoomLevel, nextLevel]);

    // useEffect(() => {
    //     if (toExp) {
    //         // player.goToExp()
    //         player.enterInDoor();
    //         changetoExp();
    //         setTimeout(() => {
    //             setChangingLevel(true);
    //         }, 50);
    //     }
    // });

    useEffect(() => {
        if (nextLevel) {
            player.testActivate();

            setTimeout(() => {
                changeRoom();
            }, 3000);
        }
    }, [nextLevel]);

    useEffect(() => {}, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animation;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const game = new Game({ canvas, keysTab, lastKeysTab, toExp, RoomLevel, changeRoom });
        game.initialize();
        const { player, camera, background, water, cloud, currentCollisionLevel, doors, overlay } =
            game.getAnimateObjects();
        setPlayer(player);

        let lastTime = 0;
        window.scrollBy(0, -100);
        function animate(timeStamp) {
            // const deltaTime = timeStamp - lastTime;
            // lastTime = timeStamp;

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
