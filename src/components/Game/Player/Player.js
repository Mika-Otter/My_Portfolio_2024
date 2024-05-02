import { Sprite } from "../../../gameLogic/Sprite";

export class Player {
    constructor({ collisionBlocks = [], background }) {
        this.position = {
            x: 100,
            y: 100,
        };

        this.velocity = {
            x: 0,
            y: 0,
        };

        this.scale = background.width / background.originalWidth;
        this.backgroundHeight = background.height; //background aspectRation
        this.width = 40 * this.scale;
        this.height = 80 * this.scale;
        this.bottom = this.position.y + this.height;

        this.gravity = 0.2 * this.scale;

        this.collisionBlocks = collisionBlocks;
        this.jumping = false;

        this.sprite = new Sprite("../../../../sprite/Sprite-Hobit-Full.png");
        this.SPRITE_NAME = "IDLE_R";
        this.scrolledToBottom = false;
    }

    draw(context) {
        context.fillStyle = "transparent";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.sprite.draw(context, this);
        // console.log(this.velocity.y);
    }

    update({ camera, canvas, background }) {
        this.position.x += this.velocity.x * this.scale;
        this.checkForHorizontalCollision();

        //apply gravity
        this.velocity.y += this.gravity;

        this.position.y += this.velocity.y;
        this.bottom = this.position.y + this.height;

        this.checkForVerticalCollision({ camera, canvas });
        if (this.velocity.y > 0) {
            this.shouldPanCameraToTheBottom({ camera, canvas });
        }
        if (this.velocity.y < 0) {
            this.shouldPanCameraToTheTop({ camera });
        }
        if (this.velocity.x > 0) {
            this.shouldPanCameraToTheLeft({ camera, canvas, background });
        }
        if (this.velocity.x < 0) {
            this.shouldPanCameraToTheRight({ camera });
        }
    }

    //CHECK HORIZONTAL COLLISION________________________________________________________
    checkForHorizontalCollision() {
        this.collidedLeft = false;
        this.collidedRight = false;
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.y + this.height >= collisionBlock.position.y
            ) {
                if (this.velocity.x < -0) {
                    this.velocity.x = 0;
                    this.collidedLeft = true;

                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                }
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    this.collidedRight = true;

                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break;
                }
            }
        }
    }

    // CHECK VERTICAL COLLISION_______________________________________________________________
    checkForVerticalCollision({ camera, canvas }) {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.y + this.height >= collisionBlock.position.y
            ) {
                if (this.velocity.y < 0) {
                    this.collidedTop = true;
                    this.shouldPanCameraToTheTop({ camera, canvas });
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.5;
                    break;
                }
                if (this.velocity.y > 0) {
                    this.shouldPanCameraToTheBottom({ camera, canvas });
                    this.collidedBottom = true;
                    this.collidedTop = false;
                    this.grounded = true;
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.5;
                    break;
                }
            } else {
                this.grounded = false;
            }
        }
    }

    //CAMERA MANAGE____________________________________________________________________
    updateCameraBox({ camera }) {
        if (this.position.y + 300 * this.scale > this.backgroundHeight) {
            this.cameraBox = {
                position: {
                    x: this.position.x - 250,
                    y: this.position.y - 200,
                },
                width: 500 * this.scale,
                height: 100 * this.scale,
            };
            camera.position.y = -this.backgroundHeight * 0.797;
        } else {
            this.cameraBox = {
                position: {
                    x: this.position.x - 250 * this.scale,
                    y: this.position.y - 200 * this.scale,
                },
                width: 500 * this.scale,
                height: 400 * this.scale,
            };
        }
    }

    //CAMERA HORIZONTAL MANAGE__________________________________________________________
    shouldPanCameraToTheLeft({ canvas, camera, background }) {
        const cameraboxRightSide = this.cameraBox.position.x + this.cameraBox.width;
        const scaledDownCanvasWidth = canvas.width;

        if (cameraboxRightSide >= background.image.width) return;

        if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    }
    shouldPanCameraToTheRight({ camera }) {
        if (this.cameraBox.position.x <= 0) return;

        if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    }
    //CAMERA VERTICAL MANAGE____________________________________________________________
    shouldPanCameraToTheTop({ camera }) {
        if (this.cameraBox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
        }
    }
    shouldPanCameraToTheBottom({ camera, canvas }) {
        const bottomSideCamera = this.cameraBox.position.y + this.cameraBox.height;
        const canvasSize = canvas.height;

        if (bottomSideCamera >= canvasSize + Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
            if (!this.scrolledToBottom) {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                });
            }
        }
    }
}
