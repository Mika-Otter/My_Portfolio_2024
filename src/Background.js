export default class Background {
    constructor({ position, imageSrc, canvas }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.originalWidth = 50 * 32; // Largeur originale de l'image
        this.aspectRatio = 50 / 180;
        this.width = canvas.width;
        this.height = this.width / this.aspectRatio;
        // Rapport d'aspect de votre image originale (largeur / hauteur)
    }

    draw(context, canvas) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}
