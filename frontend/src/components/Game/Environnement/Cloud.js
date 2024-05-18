export default class Cloud {
    constructor({ position, imageSrc, canvas, scale }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 1200 * scale; // Largeur originale de l'image
        this.aspectRatio = 12 / 6;
        this.height = this.width / this.aspectRatio; // ratio
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
