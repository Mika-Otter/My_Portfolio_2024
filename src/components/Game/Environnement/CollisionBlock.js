export class CollisionBlock {
    constructor({ position, width, height }) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        // context.fillStyle = "rgba(255, 0, 0, 0.3)";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
