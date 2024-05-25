class Wind {
    constructor() {
        this.frameX = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    update(deltaTime) {
        // console.log(this.frameX);
        this.x += this.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            this.frameX++;
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
        context.globalAlpha = 0.7;
    }
}

export class RegularWind extends Wind {
    constructor(width, height) {
        super();
        this.width = 40; //40
        this.height = 50;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = -2;
        this.maxFrame = 18; //18
        this.image = new Image();
        this.image.src = "./src/assets/img/regularwind.png";
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}
export class RollingWindTop extends Wind {
    constructor(width, height) {
        super();
        this.width = 350;
        this.height = 50;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = -1;
        this.maxFrame = 15;
        this.image = new Image();
        this.image.src = "/rollingwindtop.png";
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}
export class RollingWindBottom extends Wind {
    constructor(width, height) {
        super();
        this.width = 350;
        this.height = 50;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = -1;
        this.maxFrame = 15;
        this.image = new Image();
        this.image.src = "/rollingwindbottom.png";
        this.windTimer = 0;
        this.windInterval = 1000;
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}
