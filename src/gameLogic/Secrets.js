export default class Secret {
    constructor({ imageSrc, width, height, frameY, frameMax, position }) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = width;
        this.height = height;
        this.frameY = frameY;
        this.frameX = 1;
        this.frameMax = frameMax;
        this.position = position;

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
            this.width * 2,
            this.height * 2
        );
    }

    update() {
        // Met à jour la frame actuelle
        this.frameX = Math.floor(this.gameFrame / this.staggerFrames) % this.frameMax;
        this.gameFrame++;
    }
}
