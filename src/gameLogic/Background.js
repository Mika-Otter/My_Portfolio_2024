export default class Background {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 50 * 32 * 1.8;
        this.height = 158 * 32 * 1.8;
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}
