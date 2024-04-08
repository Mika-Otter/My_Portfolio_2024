import { ActivePlayer } from "./ActivePlayer";

export class PlayerMovement {
    constructor(player) {
        this.player = player;
    }

    handleMovement() {
        const { player } = this;

        if (player.preventInput) return;

        const { keysTab, collidedTop, collidedRight, collidedLeft, position, velocity } = player;

        if (keysTab.includes(" ") && !collidedTop) {
            if (velocity.y === 0) {
                velocity.y = -15;
                player.jumping = true;
            }
        }

        if (keysTab[0] === "d" && !collidedRight) {
            velocity.x = 4.5;
            player.shouldPanCameraToTheLeft();
        } else if (keysTab[0] === "q" && !collidedLeft && position.x > 0) {
            velocity.x = -4.5;
            player.shouldPanCameraToTheRight();
        } else {
            velocity.x = 0;
        }
    }
}
