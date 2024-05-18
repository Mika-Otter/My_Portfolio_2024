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
        starShip,
        secrets,
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
        this.starShip = starShip;
        this.secrets = secrets;
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
        if (this.sprite) {
            this.sprite.update(this.SPRITE_NAME);
        }
        if (this.sprite === "") {
            this.position.y = this.starShip.position.y;
            this.cameraBox.y = this.starShip.position.y;
            this.cameraBox.height = 700;
            this.cameraBox.position.y = this.position.y - 300;
            if (camera.position.x > -440) {
                camera.position.x -= 3;
            }

            if (
                this.cameraBox.position.y <= Math.abs(camera.position.y) &&
                this.cameraBox.position.y > 100
            ) {
                camera.position.y += this.starShip.speedStarship;
            }
        }

        context.fillStyle = "transparent";
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
            this.launchStarship();
            this.activeSecrets();
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

    launchStarship() {
        if (this.starShip) {
            const starShip = this.starShip;

            if (
                this.position.x + this.width <= starShip.position.x + starShip.spriteWidth * 1.5 &&
                this.position.x - 3 >= starShip.position.x &&
                this.position.y <= starShip.position.y + starShip.spriteHeight * 1.5 &&
                this.position.y + this.height >= starShip.position.y
            ) {
                console.log("Okeeeey");
                starShip.launching = true;
                this.position.x = starShip.position.x;
                this.position.y = starShip.position.y;
                this.cameraBox.y = starShip.position.y;
                this.gravity = 0;
                this.sprite = "";
            }
        }
    }

    activeSecrets() {
        if (this.secrets) {
            this.secrets.forEach((secret) => {
                if (
                    this.position.x + this.width <= secret.position.x + secret.renderWidth + 50 &&
                    this.position.x >= secret.position.x - 50 &&
                    this.position.y <= secret.position.y + secret.renderHeight &&
                    this.position.y + this.height >= secret.position.y
                ) {
                    console.log("Okeeeey");
                }
            });
        }
    }
    // END...
}
