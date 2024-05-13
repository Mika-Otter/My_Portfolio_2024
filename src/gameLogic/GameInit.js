import { parseCollisions, changeLevel } from "./CollisionLevel";
import { Door } from "../components/Game/Environnement/Door";
import { ActivePlayer } from "../components/Game/Player/PlayerActive";
import Background from "../components/Game/Environnement/Background";
import Cloud from "../components/Game/Environnement/Cloud";

export class Game {
    constructor({ canvas, keysTab, lastKeysTab, toExp, RoomLevel, changeRoom }) {
        this.canvas = canvas;
        this.keysTab = keysTab;
        this.lastKeysTab = lastKeysTab;
        this.toExp = toExp;
        this.RoomLevel = RoomLevel;
        this.changeRoom = changeRoom;
        this.mapRow = { row: 0, precedentRow: 0 };
        this.background;
        this.doors;
        this.clouds;
        this.scale;
        this.overlay = { opacity: 0 };
        this.cloud;
        this.water;
        this.collisionBlocksList;
        this.currentCollisionLevel;
        this.i = 0;
        this.player;
    }

    initialize() {
        // this.initializeLevel();
        this.initializeCamera();
        this.initializeRoomsLevel();
    }

    initializeLevel() {
        // Initialisation du niveau commun à tous les niveaux
        // Exemple: Initialisation de l'échelle, du fond d'écran de l'eau, etc.
    }

    initializeRoomsLevel() {
        const RoomLevel = this.RoomLevel;
        const canvas = this.canvas;

        // Initialisation du niveau spécifique en fonction de la valeur de RoomLevel
        const RoomsLevels = {
            1: {
                init: () => {
                    this.background = new Background({
                        position: { x: 0, y: 5 },
                        imageSrc: "./src/assets/img/map-final.png",
                        canvas,
                        originalWidth: 70 * 32,
                        width: canvas.width,
                        aspectRatio: 70 / 180,
                    });
                    this.scale = this.background.width / this.background.originalWidth;
                    this.doors = [
                        new Door({
                            position: { x: 2506 * this.scale, y: 8900 * this.scale },
                            imageSrc: "./src/assets/sprite-door/doorOpen.png",
                            frameRate: 5,
                            loop: false,
                            autoplay: false,
                            overlay: this.overlay,
                            changeRoom: this.changeRoom,
                            originalWidth: 70 * 32,
                            width: 3000,
                            aspectRatio: 70 / 180,
                        }),
                    ];
                    this.water = new Background({
                        position: { x: 0, y: 5 },
                        imageSrc: "./src/assets/img/water.png",
                        canvas,
                        originalWidth: 70 * 32,
                        width: canvas.width,
                        aspectRatio: 70 / 180,
                    });
                    this.cloud = new Cloud({
                        position: { x: 900, y: 30 },
                        imageSrc: "./src/assets/img/cloud.png",
                        canvas,
                        scale: this.scale,
                        originalWidth: 70 * 32,
                        width: canvas.width,
                        aspectRatio: 70 / 180,
                    });
                    // Parse collisions for level 1
                    this.collisionBlocksList = parseCollisions(this.background);
                    this.currentCollisionLevel = this.collisionBlocksList[this.i];
                    this.player = new ActivePlayer({
                        collisionBlocks: this.currentCollisionLevel,
                        background: this.background,
                        doors: this.doors,
                        canvas: this.canvas,
                        collisionBlocksList: this.collisionBlocksList,
                        keysTab: this.keysTab,
                        lastKeysTab: this.lastKeysTab,
                        overlay: this.overlay,
                        mapRow: this.mapRow,
                        toExp: this.toExp,
                        scale: this.scale,
                    });
                },
            },
            2: {
                init: () => {
                    this.background = new Background({
                        position: { x: 0, y: 0 },
                        imageSrc: "./src/assets/img/lastmap.png",
                        canvas,
                        originalWidth: 100 * 32,
                        width: canvas.width * 1.3,
                        aspectRatio: 3200 / 3586,
                    });
                    this.scale = this.background.width / this.background.originalWidth;
                    this.doors = [
                        new Door({
                            position: { x: 2506 * this.scale, y: 8900 * this.scale },
                            imageSrc: "./src/assets/sprite-door/doorOpen.png",
                            frameRate: 5,
                            loop: false,
                            autoplay: false,
                            overlay: this.overlay,
                            changeRoom: this.changeRoom,
                        }),
                    ];
                    // Parse collisions for level 2
                    this.collisionBlocksList = parseCollisions(this.background);
                    this.currentCollisionLevel = this.collisionBlocksList[1];
                    this.player = new ActivePlayer({
                        collisionBlocks: this.currentCollisionLevel,
                        background: this.background,
                        doors: this.doors,
                        canvas: this.canvas,
                        collisionBlocksList: this.collisionBlocksList,
                        keysTab: this.keysTab,
                        lastKeysTab: this.lastKeysTab,
                        overlay: this.overlay,
                        mapRow: this.mapRow,
                        toExp: this.toExp,
                        scale: this.scale,
                    });
                },
            },
        };

        RoomsLevels[this.RoomLevel].init();
    }

    initializeCamera() {
        this.camera = {
            position: {
                x: 0,
                y: 0,
            },
        };
    }

    getGameObjects() {
        return {
            player: this.player,
            camera: this.camera,
            doors: this.doors,
            background: this.background,
            currentCollisionLevel: this.currentCollisionLevel,
            collisionBlocksList: this.collisionBlocksList,
            i: this.i,
            overlay: this.overlay,
            mapRow: this.mapRow,
            water: this.water,
            cloud: this.cloud,
        };
    }
    getAnimateObjects() {
        return {
            player: this.player,
            camera: this.camera,
            background: this.background,
            water: this.water,
            cloud: this.cloud,
            currentCollisionLevel: this.currentCollisionLevel,
            doors: this.doors,
            overlay: this.overlay,
        };
    }
}
