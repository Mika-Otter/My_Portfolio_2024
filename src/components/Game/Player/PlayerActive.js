import { Player } from "./Player";

export class ActivePlayer extends Player {
    constructor({
        collisionBlocks,
        background,
        doors,
        canvas,
        collisionBlocksList,
        keysTab,
        lastKeysTab,
        mapRow,
        toExp,
    }) {
        super({ collisionBlocks, background });
        this.canvas = canvas;
        this.keysTab = keysTab;
        this.lastKeysTab = lastKeysTab;
        this.canvas = canvas;
        this.moving = false;
        this.collisionBlocksList = collisionBlocksList;
        this.level = mapRow;

        this.doors = doors;
        this.mapRow = mapRow;
        this.toExp = toExp;
        this.isJumping = false;
    }

    setState() {
        if (this.keysTab[0] === "q") {
            this.SPRITE_NAME = "RUN_L"; //RUN_L
        } else if (this.velocity.x === 0 && this.lastKeysTab[0] === "q") {
            this.SPRITE_NAME = "IDLE_L";
        }

        if (this.keysTab[0] === "d") {
            this.SPRITE_NAME = "RUN_R"; //RUN__R
        } else if (this.velocity.x === 0 && this.lastKeysTab[0] === "d") {
            this.SPRITE_NAME = "IDLE_R";
        }
    }

    testActivate() {
        this.SPRITE_NAME = "TELEPORT";

        setTimeout(() => {
            this.SPRITE_NAME = "IDLE_R";
        }, 1500);
    }
    // UPDATE PLAYER____________________________________________________________________
    updatePlayer({ background, context, canvas, camera }) {
        this.handleMovement({ canvas, camera, background });
        this.updateCameraBox({ camera });
        this.update({ camera, canvas, background });
        this.setState();
        this.sprite.update(this.SPRITE_NAME);

        // context.fillStyle = "transparent";
        // context.fillStyle = "rgba(2, 0, 255, 0.3)";
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
        if (this.velocity.y !== 0) {
            this.isJumping = true;
        }
        if (this.toExp && !this.isJumping) {
            this.enterInDoor();
        }
    }

    // HANDLE MOVEMENT___________________________________________________________________
    handleMovement({ canvas, camera, background }) {
        if (this.preventInput) return;
        if (this.keysTab.includes(" ") && !this.collidedTop) {
            if (this.velocity.y === 0) {
                this.velocity.y = -13 * this.scale;
                this.jumping = true;
            }
        }

        if (this.keysTab[0] === "d" && !this.collidedRight) {
            this.velocity.x = 3.7;
            this.shouldPanCameraToTheLeft({ canvas, camera, background });
        } else if (this.keysTab[0] === "q" && !this.collidedLeft && this.position.x > 0) {
            this.velocity.x = -3.7;
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
            this.mapRow.row < 5
        ) {
            // this.setMapRow((prev) => ({ ...prev, row: prev.row + 1, precedentRow: prev.row }));
            this.mapRow.row++;
            this.collisionBlocks = this.collisionBlocksList[this.mapRow.row];
        }
    }

    changeLevelByTheTop() {
        if (this.position.y < this.collisionBlocks[0].position.y && this.mapRow.row > 0) {
            // this.setMapRow((prev) => ({ ...prev, row: prev.row - 1, precedentRow: prev.row }));
            this.mapRow.row--;
            this.collisionBlocks = this.collisionBlocksList[this.mapRow.row];
        }
    }

    //ENTER IN THE DOOR_________________________________________________________________
    enterInDoor() {
        for (let i = 0; i < this.doors.length; i++) {
            const door = this.doors[i];
            if (
                (this.position.x + this.width <= door.position.x + door.width &&
                    this.position.x - 3 >= door.position.x &&
                    this.position.y <= door.position.y + door.height &&
                    this.position.y + this.height >= door.position.y) ||
                this.toExp
            ) {
                this.preventInput = true;
                door.play();
            }
        }
    }
    // END...
}
