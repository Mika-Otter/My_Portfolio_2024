import { Player } from "./Player";

export class PlayerCamera extends Player {
    constructor(props) {
        super(props);
    }

    //CAMERA MANAGE____________________________________________________________________
    updateCameraBox({ camera }) {
        if (this.position.y + 350 > 9000) {
            this.cameraBox = {
                position: {
                    x: this.position.x - 600,
                    y: this.position.y - 400,
                },
                width: 1200,
                height: 400,
            };
            camera.position.y = -7615;
        } else {
            this.cameraBox = {
                position: {
                    x: this.position.x - 600,
                    y: this.position.y - 400,
                },
                width: 1200,
                height: 800,
            };
        }
    }

    //CAMERA HORIZONTAL MANAGE__________________________________________________________
    shouldPanCameraToTheLeft({ canvas, camera, background }) {
        const cameraboxRightSide = this.cameraBox.position.x + this.cameraBox.width;
        const scaledDownCanvasWidth = canvas.width;

        if (cameraboxRightSide >= background.image.width) return;

        if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    }
    shouldPanCameraToTheRight({ camera }) {
        if (this.cameraBox.position.x <= 0) return;

        if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    }
    //CAMERA VERTICAL MANAGE____________________________________________________________
    shouldPanCameraToTheTop({ camera }) {
        if (this.cameraBox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
        }
    }
    shouldPanCameraToTheBottom({ camera, canvas }) {
        const bottomSideCamera = this.cameraBox.position.y + this.cameraBox.height;
        const canvasSize = canvas.height;

        if (bottomSideCamera >= canvasSize + Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
        }
    }
}
