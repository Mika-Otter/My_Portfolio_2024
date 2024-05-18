import { parseCollisions, changeLevel } from "./CollisionLevel";
import { Door } from "../components/Game/Environnement/Door";
import { ActivePlayer } from "../components/Game/Player/PlayerActive";
import Background from "../components/Game/Environnement/Background";
import Cloud from "../components/Game/Environnement/Cloud";
import Starship from "../components/Game/Environnement/Starship";
import Secret from "./Secrets";

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
        this.starShip;
        this.secrets;
    }

    initialize() {
        this.initializeCamera();
        this.initializeRoomsLevel();
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
                        imageSrc: "./src/assets/img/home-map.png",
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
                    this.cloud = new Background({
                        position: { x: 0, y: 5 },
                        imageSrc: "./src/assets/img/cloud.png",
                        canvas,
                        // scale: this.scale,
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
                    this.secrets = [
                        new Secret({
                            imageSrc: "./src/assets/img/mushroom-Sheet.png",
                            width: 32,
                            height: 32,
                            frameY: 0,
                            frameMax: 22,
                            position: { x: 1125, y: 1594 },
                            scale: this.scale,
                        }),
                        new Secret({
                            imageSrc: "./src/assets/img/cat-Sheet.png",
                            width: 34,
                            height: 32,
                            frameY: 0,
                            frameMax: 24,
                            position: { x: 1210, y: 4124 },
                            scale: this.scale,
                        }),
                        new Secret({
                            imageSrc: "./src/assets/img/robot-Sheet.png",
                            width: 64,
                            height: 96,
                            frameY: 0,
                            frameMax: 23,
                            position: { x: 270, y: 2453 },
                            scale: this.scale,
                        }),
                    ];
                },
            },
            2: {
                init: () => {
                    this.background = new Background({
                        position: { x: 0, y: 0 },
                        imageSrc: "./src/assets/img/contact-map.png",
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

                    this.starShip = new Starship({
                        position: { x: 600, y: 1200 },
                        autoplay: false,
                    });

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
                        starShip: this.starShip,
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
            starShip: this.starShip,
            secrets: this.secrets,
        };
    }
}
