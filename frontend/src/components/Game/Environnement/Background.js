export default class Background {
    constructor({ position, imageSrc, canvas, originalWidth, width, aspectRatio }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.originalWidth = originalWidth;
        this.aspectRatio = aspectRatio;
        this.width = width;
        this.height = this.width / this.aspectRatio;
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
