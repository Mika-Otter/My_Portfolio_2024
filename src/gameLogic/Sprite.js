export class Sprite {
    constructor(imageSrc) {
        this.image = new Image();
        this.image.src = imageSrc;

        this.spriteWidth = 80;
        this.spriteHeight = 80;

        this.playerState = ["IDLE_R", "IDLE_L", "RUN_R", "RUN_L"];

        this.frameX = 0;
        this.frameY = 0;

        //slow down the animation
        this.gameFrame = 0;
        this.staggerFrames = 20;

        this.spriteAnimations = [];
        this.animationStates = [
            {
                name: "IDLE_R",
                frames: 28,
            },
            {
                name: "IDLE_L",
                frames: 28,
            },
            {
                name: "RUN_R",
                frames: 27,
            },
            {
                name: "RUN_L",
                frames: 27,
            },
        ];

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
        console.log(this.spriteAnimations);
    }

    draw(context, player) {
        this.spriteX = player.position.x - 32;
        this.spriteY = player.position.y - 40;

        context.drawImage(
            this.image,
            this.frameX,
            this.frameY,
            this.spriteWidth,
            this.spriteHeight,
            this.spriteX,
            this.spriteY,
            120,
            120
        );
    }

    update(SPRITE_NAME) {
        let position =
            Math.floor(this.gameFrame / this.staggerFrames) %
            this.spriteAnimations[this.playerState[this.playerState.indexOf(SPRITE_NAME)]].loc
                .length;
        this.frameX = position * this.spriteWidth;
        this.frameY =
            this.spriteAnimations[this.playerState[this.playerState.indexOf(SPRITE_NAME)]].loc[
                position
            ].y;
        this.gameFrame++;
    }
}
