import { PlayerCamera } from "./PlayerCamera";
import { PlayerCollision } from "./PlayerCollision";

export class PlayerUpdate {
    constructor(player, camera, canvas) {
        this.player = player;
        this.camera = camera;
        this.canvas = canvas;

        this.collisionHandler = new PlayerCollision();
        this.cameraHandler = new PlayerCamera();
    }

    update() {
        this.collisionHandler.checkForHorizontalCollision();
    }
}
