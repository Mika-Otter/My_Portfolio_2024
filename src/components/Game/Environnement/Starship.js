export default class Starship {
    constructor(frameRate = 1) {
        this.image = new Image();
        this.image.src = "/starship.png";
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        };

        this.frameRate = frameRate;
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

    update(SPRITE_NAME) {
        if (this.position.y >= 125 && SPRITE_NAME === "LAUNCH") {
            this.position.y -= this.speedStarship;
            this.speedStarship += 0.02;
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

    launch() {}
}
