export default class Background {
    constructor({ position, imageSrc, canvas }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.originalWidth = 70 * 32; // Largeur originale de l'image
        this.aspectRatio = 70 / 180;
        this.width = canvas.width;
        this.height = this.width / this.aspectRatio; // ratio
        this.winds = [];
        this.rollingwindstop = [];
        this.rollingwindsbottom = [];
        this.windTimer = 0;
        this.windInterval = 1000;
    }

    draw(context, canvas) {
        context.drawImage(
            this.image,
            this.position.x,
            this.position.y - 4,
            this.width,
            this.height
        );
    }
}
