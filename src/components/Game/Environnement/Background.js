import { RegularWind, RollingWindBottom, RollingWindTop } from "./Wind";

export default class Background {
    constructor({ position, imageSrc, canvas }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.originalWidth = 70 * 32; // Largeur originale de l'image
        this.aspectRatio = 70 / 180;
        this.width = canvas.width;
        this.height = this.width / this.aspectRatio; // ratio
        this.winds = [];
        this.rollingwindstop = [];
        this.rollingwindsbottom = [];
        this.windTimer = 0;
        this.windInterval = 1000;
    }

    draw(context, canvas) {
        context.drawImage(
            this.image,
            this.position.x,
            this.position.y - 4,
            this.width,
            this.height
        );

        this.winds.forEach((wind) => {
            wind.draw(context);
        });
    }

    addWind() {
        // console.log("tiiiimmmer", this.winds);
        // this.winds.push(new RegularWind(this.width, this.height));
        // this.winds.push(new RollingWindBottom(this.width, this.height));
        // this.winds.push(new RollingWindTop(this.width, this.height));
        // this.rollingwindsbottom.push(new RollingWindBottom(this.width, this.height)());
        // this.rollingwindstop.push(new RollingWindTop(this.width, this.height));
    }

    update(delaTime) {
        // this.winds.forEach((wind, index) => {
        //     wind.update(delaTime);
        //     if (wind.frameX === wind.maxFrame) {
        //         this.winds.splice(index, 1);
        //     }
        // });
        // this.rollingwindsbottom.forEach((wind, index) => {
        //     wind.update(delaTime);
        //     if (wind.frameX === wind.maxFrame) {
        //         this.winds.splice(index, 1);
        //     }
        // });
        // this.rollingwindstop.forEach((wind, index) => {
        //     wind.update(delaTime);
        //     if (wind.frameX === wind.maxFrame) {
        //         this.winds.splice(index, 1);
        //     }
        // });
        // if (this.windTimer > this.windInterval) {
        //     this.addWind();
        //     this.windTimer = 0;
        // } else {
        //     this.windTimer += delaTime;
        // }
    }
}
