export class TestOne {
    constructor({ keysTab }) {
        this.width = 30;
        this.height = 30;
        this.position = {
            x: 30,
            y: 30,
        };

        this.color = "red";
        this.keysTab = keysTab;
        this.speedX = 0;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.handleMovement();
        this.position.x += this.speedX;
    }
    handleMovement() {
        if (this.keysTab[0] === "d") {
            this.speedX += 1;
        } else if (this.keysTab[0] === "q") {
            this.speedX -= 1;
        } else {
            this.speedX = 0;
        }
    }

    changeColor(context) {
        this.color = "blue"; // Met à jour la couleur de l'objet
    }
}
