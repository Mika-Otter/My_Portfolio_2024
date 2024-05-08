class Wind {
    constructor() {
        this.frameX = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    update(deltaTime) {
        // console.log(this.frameX);
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

export class RegularWind extends Wind {
    constructor() {
        super();
        this.width = 40;
        this.height = 50;
        this.x = 500;
        this.y = 200;
        this.speed = 2;
        this.maxFrame = 18;
        this.image = new Image();
        this.image.src = "/regularwind.png";
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}
export class RotateWindTop extends Wind {
    constructor(game) {
        super();
        this.width = 350;
        this.height = 50;
        this.x = 200;
        this.y = 200;
        this.speed = 2;
        this.maxFrame = 18;
    }
}
export class RotateWindBottom extends Wind {
    constructor(game) {
        super();
        this.width = 350;
        this.height = 50;
        this.x = 200;
        this.y = 200;
        this.speed = 2;
        this.maxFrame = 18;
    }
}
