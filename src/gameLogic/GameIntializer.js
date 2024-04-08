import { parseCollisions, changeLevel } from "./CollisionLevel";
import { HandleInput } from "./InputManager";
import { Door } from "../components/Environnement/Door";
import { ActivePlayer } from "../components/Player/PlayerActive";
import Background from "../Background";

// Initialisation d'autres éléments du jeu, comme la classe Player, Background, etc.
export function initializeGame(canvas, ctx) {
    // Déclarer les variables
    let overlay = { opacity: 0 };
    let background;
    let newLevel = { level: 0, precedentLevel: 0 };
    let i = 0;
    let doors;
    let RoomLevel = 1;
    const keysTab = [];
    const lastKeysTab = [""];
    const camera = { position: { x: 0, y: 0 } };

    // Initialiser les éléments du jeu
    background = new Background({
        position: { x: 0, y: 0 },
        imageSrc: "./assets/img/MAPTILED3.png",
    });
    const collisionBlocksList = parseCollisions(background);
    let currentCollisionLevel = collisionBlocksList[0];

    doors = [
        new Door({
            position: { x: 1376 * 1.8, y: 4959 * 1.8 + 50 },
            imageSrc: "./assets/sprite-door/doorOpen.png",
            frameRate: 5,
            loop: false,
            autoplay: false,
            overlay,
        }),
    ];

    const player = new ActivePlayer({
        collisionBlocks: collisionBlocksList[0],
        doors,
        canvas,
        collisionBlocksList,
        keysTab,
        lastKeysTab,
        newLevel,
    });

    // Initialiser le gestionnaire d'entrée
    const input = new HandleInput(keysTab, lastKeysTab);

    // Retourner les éléments initialisés
    return {
        player,
        canvas,
        keysTab,
        lastKeysTab,
        camera,
        doors,
        background,
        currentCollisionLevel,
        newLevel,
        i,
    };
}
