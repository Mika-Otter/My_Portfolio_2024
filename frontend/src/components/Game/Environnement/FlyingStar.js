export class FlyingStar {
    constructor() {
        this.frameX = 0;
        this.width = 7; //40
        this.height = 90;
        this.x = Math.random() * window.innerWidth + 500;
        this.y = Math.random() * 200;
        this.speed = 13;
        this.image = new Image();
        this.image.src = "./src/assets/img/flyingStars.png";
    }

    update() {
        this.y += this.speed;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
