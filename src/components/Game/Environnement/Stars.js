import { FlyingStar } from "./FlyingStar";

export class Stars {
    constructor(width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.starlist = [];
        this.starTimer = 0;
        this.starInterval = 200;
        this.starAdding = false;
    }

    draw(context) {
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y, this.width, this.height);

        this.starlist.forEach((star) => {
            star.draw(context);
            star.update();
        });
    }

    addStar() {
        // if (!this.starAdding) {
        this.starlist.push(new FlyingStar());
        console.log("Heeeeello", this.starlist);
        //         this.starAdding = true;
        // }
    }

    update() {
        this.starlist.forEach((star, index) => {
            star.update();
            // setTimeout(() => {
            //     this.starlist.splice(index, 1);
            // }, 2000);
        });
        if (this.starTimer > this.starInterval) {
            this.addStar();
            this.starTimer = 0;
        } else {
            this.starTimer += 7;
        }
    }
}
