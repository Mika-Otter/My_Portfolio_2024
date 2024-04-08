import { Player } from "./Player";
import { newLevel } from "../../main";

export class ActivePlayer extends Player {
    constructor({ collisionBlocks, doors, canvas, collisionBlocksList, keysTab, lastKeysTab }) {
        super({ collisionBlocks });
        this.canvas = canvas;
        this.collisionBlocksList = collisionBlocksList;
        this.keysTab = keysTab;
        this.lastKeysTab = lastKeysTab;
        this.canvas = canvas;
        this.moving = false;
        this.collisionBlocksList = collisionBlocksList;
        this.level = newLevel;

        this.doors = doors;
    }

    // UPDATE PLAYER____________________________________________________________________
    updatePlayer({ background, context, canvas, camera }) {
        this.handleMovement({ canvas, camera, background });
        this.updateCameraBox({ camera });
        this.update({ camera, canvas });

        context.fillStyle = "transparent";
        context.fillRect(
            this.cameraBox.position.x,
            this.cameraBox.position.y,
            this.cameraBox.width,
            this.cameraBox.height
        );
        this.changeLevelByTheBottom();
        this.changeLevelByTheTop();

        if (this.keysTab.includes("z")) {
            this.enterInDoor();
        }
    }

    // HANDLE MOVEMENT___________________________________________________________________
    handleMovement({ canvas, camera, background }) {
        if (this.preventInput) return;
        if (this.keysTab.includes(" ") && !this.collidedTop) {
            if (this.velocity.y === 0) {
                this.velocity.y = -15;
                this.jumping = true;
            }
        }

        if (this.keysTab[0] === "d" && !this.collidedRight) {
            this.velocity.x = 4.5;
            this.shouldPanCameraToTheLeft({ canvas, camera, background });
        } else if (this.keysTab[0] === "q" && !this.collidedLeft && this.position.x > 0) {
            this.velocity.x = -4.5;
            this.shouldPanCameraToTheRight({ camera });
        } else {
            this.velocity.x = 0;
        }
    }

    // CHANGE LEVEL__________________________________________________________________

    changeLevelByTheBottom() {
        if (
            this.position.y + this.height >
                this.collisionBlocks[this.collisionBlocks.length - 1].position.y &&
            newLevel.level < 5
        ) {
            newLevel.level++;
            this.collisionBlocks = this.collisionBlocksList[newLevel.level];
        }
    }

    changeLevelByTheTop() {
        if (this.position.y < this.collisionBlocks[0].position.y && newLevel.level > 0) {
            newLevel.level--;
            this.collisionBlocks = this.collisionBlocksList[newLevel.level];
        }
    }

    //ENTER IN THE DOOR_________________________________________________________________
    enterInDoor() {
        for (let i = 0; i < this.doors.length; i++) {
            const door = this.doors[i];
            if (
                this.position.x + this.width <= door.position.x + door.width &&
                this.position.x - 3 >= door.position.x &&
                this.position.y <= door.position.y + door.height &&
                this.position.y + this.height >= door.position.y
            ) {
                this.preventInput = true;
                door.play();
            }
        }
    }
    // END...
}
