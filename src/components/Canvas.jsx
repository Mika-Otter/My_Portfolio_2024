import { useRef, useEffect } from "react";
import { initializeGame } from "../gameLogic/GameIntializer";
import Background from "../Background";
import { Door } from "./Environnement/Door";
import { ActivePlayer } from "./Player/PlayerActive";
import { parseCollisions } from "../gameLogic/CollisionLevel";
import { HandleInput } from "../gameLogic/InputManager";

export default function Canvas({ mapRow, setMapRow }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let background;
        let doors;
        let overlay = {
            opacity: 0,
        };

        // GLOBAL VARIABLES________________________________________________
        let RoomLevel = 1;
        let RoomsLevels = {
            1: {
                init: () => {
                    background = new Background({
                        position: { x: 0, y: 0 },
                        imageSrc: "./src/assets/img/MAPTILED3.png",
                    });
                    doors = [
                        new Door({
                            position: { x: 1376 * 1.8, y: 4959 * 1.8 + 50 }, // x * 1.8, y * 1.8 for ZOOM 180% + adjusment
                            imageSrc: "./src/assets/sprite-door/doorOpen.png",
                            frameRate: 5,
                            loop: false,
                            autoplay: false,
                            overlay,
                        }),
                    ];
                    player.doors = doors;
                },
            },
            2: {
                init: () => {},
            },
        };

        const keysTab = [];
        const lastKeysTab = [""];

        let i = 0;
        const collisionBlocksList = parseCollisions(background);
        let currentCollisionLevel = collisionBlocksList[i];

        function mainChangeLevel() {
            if (mapRow.row > mapRow.precedentRow) {
                i++;
                if (i < collisionBlocksList.length) {
                    currentCollisionLevel = collisionBlocksList[i];
                }
            }
        }

        // GAME DISPLAY________________________________________________________

        const player = new ActivePlayer({
            collisionBlocks: currentCollisionLevel,
            doors,
            canvas,
            collisionBlocksList,
            keysTab,
            lastKeysTab,
            overlay,
            mapRow,
            setMapRow,
        });
        const input = new HandleInput(keysTab, lastKeysTab);

        const camera = {
            position: {
                x: 0,
                y: 0,
            },
        };

        RoomsLevels[RoomLevel].init();
        doors = player.doors;

        function animate() {
            requestAnimationFrame(animate);
            mainChangeLevel();

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.translate(camera.position.x, camera.position.y);

            doors.forEach((door) => {
                door.draw(ctx);
            });
            player.draw(ctx);
            player.updatePlayer({
                background: background,
                context: ctx,
                canvas,
                camera,
            });

            background.draw(ctx);
            // console.log(currentCollisionLevel, "HHHEEEELLLOO");
            currentCollisionLevel.forEach((collisionBlock) => {
                collisionBlock.draw(ctx);
            });

            ctx.restore();
            ctx.save();
            ctx.globalAlpha = overlay.opacity;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }

        background.onload = animate(0);
    }, []);

    return <canvas ref={canvasRef} />;
}
