import { parseCollisions, changeLevel } from "./CollisionLevel";
import { HandleInput } from "./InputManager";
import { Door } from "../components/Game/Environnement/Door";
import { ActivePlayer } from "../components/Game/Player/PlayerActive";
import Background from "../components/Game/Environnement/Background";
import Cloud from "../components/Game/Environnement/Cloud";

export function initializeGame({ canvas, keysTab, lastKeysTab, toExp, RoomLevel, changeRoom }) {
    let mapRow = { row: 0, precedentRow: 0 };
    let background;
    let doors;
    let clouds;
    let scale;
    let overlay = {
        opacity: 0,
    };
    let cloud;
    let water;

    let RoomsLevels = {
        1: {
            init: () => {
                background = new Background({
                    position: { x: 0, y: 5 },
                    imageSrc: "./src/assets/img/map-final.png",
                    canvas,
                    originalWidth: 70 * 32,
                    width: canvas.width,
                    aspectRatio: 70 / 180,
                });
                scale = background.width / background.originalWidth;
                doors = [
                    new Door({
                        position: { x: 2506 * scale, y: 8900 * scale }, // x * 1.8, y * 1.8 for ZOOM 180% + adjusment
                        imageSrc: "./src/assets/sprite-door/doorOpen.png",
                        frameRate: 5,
                        loop: false,
                        autoplay: false,
                        overlay,
                        changeRoom,
                        originalWidth: 70 * 32,
                        width: 3000,
                        aspectRatio: 70 / 180,
                    }),
                ];
                water = new Background({
                    position: { x: 0, y: 5 },
                    imageSrc: "./src/assets/img/water.png",
                    canvas,
                    originalWidth: 70 * 32,
                    width: canvas.width,
                    aspectRatio: 70 / 180,
                });
                cloud = new Cloud({
                    position: { x: 900, y: 30 },
                    imageSrc: "./src/assets/img/cloud.png",
                    canvas,
                    scale,
                    originalWidth: 70 * 32,
                    width: canvas.width,
                    aspectRatio: 70 / 180,
                });
            },
        },
        2: {
            init: () => {
                background = new Background({
                    position: { x: 0, y: 5 },
                    imageSrc: "./src/assets/img/MAPTILED2.png",
                    canvas,
                    originalWidth: 70 * 32,
                    width: canvas.width,
                    aspectRatio: 70 / 180,
                });
                scale = background.width / background.originalWidth;
                doors = [
                    new Door({
                        position: { x: 2506 * scale, y: 8900 * scale }, // x * 1.8, y * 1.8 for ZOOM 180% + adjusment
                        imageSrc: "./src/assets/sprite-door/doorOpen.png",
                        frameRate: 5,
                        loop: false,
                        autoplay: false,
                        overlay,
                        changeRoom,
                    }),
                ];
            },
        },
    };

    RoomsLevels[RoomLevel].init();

    let i = 0;
    const collisionBlocksList = parseCollisions(background);
    let currentCollisionLevel = collisionBlocksList[i];

    const player = new ActivePlayer({
        collisionBlocks: currentCollisionLevel,
        background,
        doors,
        canvas,
        collisionBlocksList,
        keysTab,
        lastKeysTab,
        overlay,
        mapRow,
        toExp,
        scale,
    });

    const camera = {
        position: {
            x: 0,
            y: 0,
        },
    };

    doors = player.doors;

    return {
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
    };
}
