import { parseCollisions, changeLevel } from "./CollisionLevel";
import { HandleInput } from "./InputManager";
import { Door } from "../components/Environnement/Door";
import { ActivePlayer } from "../components/Player/PlayerActive";
import Background from "../Background";

// Initialisation d'autres éléments du jeu, comme la classe Player, Background, etc.
export function initializeGame(canvas) {
    let mapRow = { row: 0, precedentRow: 0 };
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
                    canvas,
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
            },
        },
        2: {
            init: () => {},
        },
    };
    RoomsLevels[RoomLevel].init();

    const keysTab = [];
    const lastKeysTab = [""];

    let i = 0;
    const collisionBlocksList = parseCollisions(background);
    let currentCollisionLevel = collisionBlocksList[i];

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
    });
    const input = new HandleInput(keysTab, lastKeysTab);

    const camera = {
        position: {
            x: 0,
            y: 0,
        },
    };

    doors = player.doors;

    // Retourner les éléments initialisés
    return {
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
    };
}
