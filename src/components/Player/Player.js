export class Player {
    constructor({ collisionBlocks = [] }) {
        this.position = {
            x: 100,
            y: 100,
        };

        this.velocity = {
            x: 0,
            y: 0,
        };

        this.width = 30;
        this.height = 70;
        this.bottom = this.position.y + this.height;

        this.gravity = 0.2;

        this.collisionBlocks = collisionBlocks;
        this.jumping = false;
    }

    draw(context) {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update({ camera, canvas }) {
        this.position.x += this.velocity.x;
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
    }
}
