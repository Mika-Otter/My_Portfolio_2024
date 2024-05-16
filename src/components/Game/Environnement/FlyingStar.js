export class FlyingStar {
    constructor() {
        this.frameX = 0;
        this.width = 7; //40
        this.height = 90;
        this.x = Math.random() * 600;
        this.y = Math.random() * 1000;
        this.speed = 2;
        this.image = new Image();
        this.image.src = "/flyingStars.png";
    }

    update() {
        this.y += 10;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, 20, 800);
    }
}
