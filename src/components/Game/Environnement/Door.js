import gsap from "gsap";

export class Door {
    constructor({ position, imageSrc, frameRate = 1, loop = true, autoplay = true, overlay }) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        };
        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;

        this.gameFrame = 0;
        this.staggerFrames = 30;

        this.loop = loop;
        this.autoplay = autoplay;

        this.overlay = overlay;
        this.onComplete = () => {
            console.log("completed animation");
            gsap.to(this.overlay, {
                opacity: 1,
            });
        };
    }

    draw(context) {
        if (!this.loaded) return;
        const cropBox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0,
            },
            width: this.width,
            height: this.height,
        };
        context.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.updateFrames();
    }

    play() {
        this.autoplay = true;
    }

    updateFrames() {
        if (!this.autoplay) return;
        this.gameFrame++;
        if (this.gameFrame % this.staggerFrames === 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
            else if (this.loop) {
                this.currentFrame = 0;
                this.gameFrame = 0;
            }
        }

        if (this.currentFrame === this.frameRate - 1 && !this.isActive) {
            this.onComplete();
            this.isActive = true;
        }
    }
}
