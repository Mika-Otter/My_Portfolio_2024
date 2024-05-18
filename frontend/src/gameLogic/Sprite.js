export class Sprite {
    constructor(imageSrc) {
        this.image = new Image();
        this.image.src = imageSrc;

        this.spriteWidth = 80;
        this.spriteHeight = 80;

        this.playerState = ["IDLE_R", "IDLE_L", "RUN_R", "RUN_L", "TELEPORT"];

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
            {
                name: "TELEPORT",
                frames: 26,
            },
        ];
        this.teleporting = false;

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

    draw(context, player) {
        this.spriteX = player.position.x - 50;
        this.spriteY = player.position.y - 41.7;

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
        if (SPRITE_NAME === "TELEPORT" && !this.teleporting) {
            this.teleporting = true;
            this.teleportFrame = 0;
            this.teleportDelay = 12;
        }

        if (this.teleporting) {
            const totalFrames = this.spriteAnimations["TELEPORT"].loc.length;

            // if all frames are appear
            if (this.teleportFrame >= totalFrames * this.teleportDelay) {
                // stop on last frame
                this.frameX = (totalFrames - 1) * this.spriteWidth;
                this.frameY = this.spriteAnimations["TELEPORT"].loc[totalFrames - 1].y;
                setTimeout(() => (this.teleporting = false), 2000);
                return;
            }
            let position = Math.floor(this.teleportFrame / this.teleportDelay);
            this.frameX = position * this.spriteWidth;
            this.frameY = this.spriteAnimations["TELEPORT"].loc[position].y;
            this.teleportFrame++;
            return;
        }

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
