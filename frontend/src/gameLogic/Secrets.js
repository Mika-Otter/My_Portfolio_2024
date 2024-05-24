export default class Secret {
    constructor({ imageSrc, width, height, frameY, frameMax, position, scale }) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = width;
        this.height = height;
        this.frameY = frameY;
        this.frameX = 0;
        this.frameMax = frameMax;
        this.position = position;
        this.originalPosition = position.x * scale;
        this.position.x = position.x * scale;
        this.position.y = position.y * scale;
        this.scale = scale;
        this.renderWidth = this.width * 2.1 * scale;
        this.renderHeight = this.height * 2.1 * this.scale;

        this.gameFrame = 0;
        this.staggerFrames = 20;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.renderWidth,
            this.renderHeight
        );
    }

    eatMushroom() {
        this.position.x = 5000;

        setTimeout(() => {
            this.position.x = this.originalPosition;
        }, 20000);
    }
    update() {
        // Met à jour la frame actuelle
        this.frameX = Math.floor(this.gameFrame / this.staggerFrames) % this.frameMax;
        this.gameFrame++;
    }
}
