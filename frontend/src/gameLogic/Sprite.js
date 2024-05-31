export class Sprite {
    constructor(imageSrc, scale) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;

        this.spriteWidth = 80;
        this.spriteHeight = 80;

        this.playerState = ["IDLE_R", "IDLE_L", "RUN_R", "RUN_L", "TELEPORT"];

        this.frameX = 0;
        this.frameY = 0;

        this.gameFrame = 0;
        this.staggerFrames = 2;

        this.fps = 60;
        this.frameInterval = 250 / this.fps;
        this.frameTimer = 0;

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
        this.spriteX = player.position.x - 66 * this.scale;
        this.spriteY = player.position.y - 49 * this.scale;

        context.drawImage(
            this.image,
            this.frameX,
            this.frameY,
            this.spriteWidth,
            this.spriteHeight,
            this.spriteX,
            this.spriteY,
            160 * this.scale,
            160 * this.scale
        );
    }

    update(SPRITE_NAME, deltaTime) {
        // Update frameTimer with deltaTime
        this.frameTimer += deltaTime;

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;

            if (SPRITE_NAME === "TELEPORT" && !this.teleporting) {
                this.teleporting = true;
                this.teleportFrame = 0;
                this.teleportDelay = 1 * deltaTime;
            }

            if (this.teleporting) {
                const totalFrames = this.spriteAnimations["TELEPORT"].loc.length;

                // if all frames are shown
                if (this.teleportFrame >= totalFrames * this.teleportDelay) {
                    // stop on the last frame
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
}
