export default class Background {
    constructor({ position, imageSrc, canvas }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.originalWidth = 70 * 32; // Largeur originale de l'image
        this.aspectRatio = 70 / 188;
        this.width = canvas.width * 1.5;
        this.height = this.width / this.aspectRatio;
        // Rapport d'aspect de votre image originale (largeur / hauteur)
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
