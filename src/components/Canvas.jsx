import { useRef, useEffect } from "react";
import { initializeGame } from "../gameLogic/GameIntializer";
import { gameAnimate } from "../gameLogic/GameAnimate";
import Background from "../Background";
import { Door } from "./Environnement/Door";
import { ActivePlayer } from "./Player/PlayerActive";
import {
    collisionsLevel1,
    collisionsLevel2,
    collisionsLevel3,
    collisionsLevel4,
    collisionsLevel5,
} from "../data/collisions";
import { CollisionBlock } from "./Environnement/CollisionBlock";
import { HandleInput } from "../gameLogic/InputManager";
import { parse2D, calculateHeight, createObjectsFrom2D } from "../utils/utils";

export default function Canvas(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
        let newLevel = { level: 0, precedentLevel: 0 };
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let background;
        let doors;

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

        // PARSED COLLISIONS_________________________________________________
        const parsedCollisionsLevel1 = parse2D(collisionsLevel1); // 56 rows
        const parsedCollisionsLevel2 = parse2D(collisionsLevel2); // 56 rows
        const parsedCollisionsLevel3 = parse2D(collisionsLevel3); // 52 rows
        const parsedCollisionsLevel4 = parse2D(collisionsLevel4); // 74 rows
        const parsedCollisionsLevel5 = parse2D(collisionsLevel5); // 78 rows

        const heightParsedLevel1 = calculateHeight(parsedCollisionsLevel1);
        const heightParsedLevel2 = calculateHeight(parsedCollisionsLevel2);
        const heightParsedLevel3 = calculateHeight(parsedCollisionsLevel3);
        const heightParsedLevel4 = calculateHeight(parsedCollisionsLevel4);

        const collisionBlocksLevel1 = createObjectsFrom2D(parsedCollisionsLevel1, {
            CollisionBlock: CollisionBlock,
            background: background,
            blockValue: 1,
            limitValue: 2,
            precedentHeight: 0,
        });

        const collisionBlocksLevel2 = createObjectsFrom2D(parsedCollisionsLevel2, {
            CollisionBlock: CollisionBlock,
            background: background,
            blockValue: 2,
            limitValue: 3,
            precedentHeight: heightParsedLevel1,
        });
        const collisionBlocksLevel3 = createObjectsFrom2D(parsedCollisionsLevel3, {
            CollisionBlock: CollisionBlock,
            background: background,
            blockValue: 3,
            limitValue: 1,
            precedentHeight: heightParsedLevel1 + heightParsedLevel2,
        });
        const collisionBlocksLevel4 = createObjectsFrom2D(parsedCollisionsLevel4, {
            CollisionBlock: CollisionBlock,
            background: background,
            blockValue: 4,
            limitValue: 2,
            precedentHeight: heightParsedLevel1 + heightParsedLevel2 + heightParsedLevel3,
        });
        const collisionBlocksLevel5 = createObjectsFrom2D(parsedCollisionsLevel5, {
            CollisionBlock: CollisionBlock,
            background: background,
            blockValue: 1,
            limitValue: 4,
            precedentHeight:
                heightParsedLevel1 + heightParsedLevel2 + heightParsedLevel3 + heightParsedLevel4,
        });

        const collisionBlocksList = [
            collisionBlocksLevel1,
            collisionBlocksLevel2,
            collisionBlocksLevel3,
            collisionBlocksLevel4,
            collisionBlocksLevel5,
        ];

        let i = 0;
        let currentCollisionLevel = collisionBlocksList[i];
        // let testCollision = collisionBlocksList[0];

        function mainChangeLevel() {
            if (newLevel.level > newLevel.precedentLevel) {
                currentCollisionLevel = collisionBlocksList[i++];
                newLevel.precedentLevel = newLevel.level;
            }
        }

        // GAME DISPLAY________________________________________________________
        const overlay = {
            opacity: 0,
        };

        const player = new ActivePlayer({
            collisionBlocks: currentCollisionLevel,
            doors,
            canvas,
            collisionBlocksList,
            keysTab,
            lastKeysTab,
            overlay,
            newLevel,
        });
        const input = new HandleInput(keysTab, lastKeysTab);

        console.log(currentCollisionLevel[currentCollisionLevel.length - 1].position.y);
        const camera = {
            position: {
                x: 0,
                y: 0,
            },
        };

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
        RoomsLevels[RoomLevel].init();
        background.onload = animate(0);
    }, []);

    return <canvas ref={canvasRef} width={props.width} height={props.height} />;
}
