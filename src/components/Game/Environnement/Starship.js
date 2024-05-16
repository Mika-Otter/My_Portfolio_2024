import { Stars } from "./Stars";

export default class Starship {
    constructor(canvas) {
        this.canvas = canvas;
        this.image = new Image();
        this.image.src = "/starship.png";
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        };

        this.frameRate = 1;
        this.position = {
            x: 800,
            y: 1930,
        };

        this.spriteWidth = 96;
        this.spriteHeight = 224;
        this.starshipState = ["IDLE", "LAUNCH"];

        this.frameX = 0;
        this.frameY = 0;

        this.gameFrame = 0;
        this.staggerFrames = 20;
        this.spriteAnimations = [];
        this.animationStates = [
            {
                name: "IDLE",
                frames: 21,
            },
            {
                name: "LAUNCH",
                frames: 21,
            },
        ];

        this.launching = false;
        this.speedStarship = 0.6;
        this.color = "transparent";
        this.flyingStars = false;
        this.stars = new Stars(700, 2000);

        //make coordinate for spriteAnimations = []
        this.animationStates.forEach((state, index) => {
            let frames = {
                loc: [],
            };
            for (let j = 0; j < state.frames; j++) {
                let positionX = j * this.spriteWidth;
                let positionY = index * this.spriteHeight;
                frames.loc.push({ x: positionX, y: positionY });
            }
            this.spriteAnimations[state.name] = frames;
        });
    }

    draw(context) {
        this.stars.draw(context);

        const windowWidth = window.innerWidth * 1.5;
        const windowHeight = window.innerHeight * 1.5;

        context.fillStyle = this.color;
        context.fillRect(200, 100, windowWidth, windowHeight);

        context.drawImage(
            this.image,
            this.frameX,
            this.frameY,
            this.spriteWidth,
            this.spriteHeight,
            this.position.x,
            this.position.y,
            96,
            224
        );
        if (!this.launching) {
            this.update("IDLE");
        } else {
            this.update("LAUNCH");
        }
    }

    update(SPRITE_NAME, context) {
        this.stars.update();
        if (this.position.y >= 125 && SPRITE_NAME === "LAUNCH") {
            this.position.y -= this.speedStarship;
            this.speedStarship += 0.02;
        } else if (this.position.y <= 125) {
            this.flyingStars = true;
            this.flyingInTheStars();
        }
        let position =
            Math.floor(this.gameFrame / this.staggerFrames) %
            this.spriteAnimations[this.starshipState[this.starshipState.indexOf(SPRITE_NAME)]].loc
                .length;
        this.frameX = position * this.spriteWidth;
        this.frameY =
            this.spriteAnimations[this.starshipState[this.starshipState.indexOf(SPRITE_NAME)]].loc[
                position
            ].y;
        this.gameFrame++;
    }

    flyingInTheStars() {
        this.color = "#020444";
    }
}
