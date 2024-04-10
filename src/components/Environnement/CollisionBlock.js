export class CollisionBlock {
    constructor({ position, width, height }) {
        this.position = position;
        // this.width = 28.8; // 16 * 180% ZOOM
        // this.height = 28.8;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.fillStyle = "rgba(255, 0, 0, 0.3)";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
