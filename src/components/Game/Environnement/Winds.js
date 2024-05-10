import { RegularWind, RollingWindBottom, RollingWindTop } from "./Wind";

export class Winds {
    constructor(canvas) {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.windlist = [];
        this.windTimer = 0;
        this.windInterval = 200;
    }

    draw(context) {
        context.fillStyle = "transparent";
        context.fillRect(this.x, this.y, this.width, this.height);

        this.windlist.forEach((wind) => {
            wind.draw(context);
        });
    }
    addWind() {
        this.windlist.push(new RegularWind(this.width, this.height));
    }
    update(deltaTime) {
        this.windlist.forEach((wind, index) => {
            wind.update(deltaTime);
            if (wind.frameX === wind.maxFrame) {
                this.windlist.splice(index, 1);
            }
        });
        if (this.windTimer > this.windInterval) {
            this.addWind();
            this.windTimer = 0;
        } else {
            this.windTimer += 7;
        }
    }
}
