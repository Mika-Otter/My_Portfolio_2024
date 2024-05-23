export default class Clouds {
    constructor(imageSrc, scale) {
        this.imageSrc = imageSrc;
        this.scale = scale;
        this.cloudList = [
            new Cloud({
                position: { x: 2200 * this.scale, y: -30 * this.scale },
                imageSrc: this.imageSrc,
                scale: this.scale,
                speed: 0.5,
            }),
            new Cloud({
                position: { x: 1300 * this.scale, y: 1500 * this.scale },
                imageSrc: this.imageSrc,
                scale: this.scale,
                speed: 0.2,
            }),
            new Cloud({
                position: { x: 300 * this.scale, y: 2700 * this.scale },
                imageSrc: this.imageSrc,
                scale: this.scale,
                speed: 0.4,
            }),
            new Cloud({
                position: { x: 2000 * this.scale, y: 3670 * this.scale },
                imageSrc: this.imageSrc,
                scale: this.scale,
                speed: 0.3,
            }),
            new Cloud({
                position: { x: 1000 * this.scale, y: 5180 * this.scale },
                imageSrc: this.imageSrc,
                scale: this.scale,
                speed: 0.2,
            }),
        ];
    }

    draw(context) {
        this.cloudList.forEach((cloud) => {
            cloud.draw(context);
            cloud.update();
        });
    }
}

export class Cloud {
    constructor({ position, imageSrc, scale, speed }) {
        this.position = position;
        this.scale = scale;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 1259 * scale; // Largeur originale de l'image
        this.height = 597 * scale;
        this.speed = speed;
    }

    update() {
        this.position.x -= this.speed;
        console.log(this.position.x + this.width);
        // Optionnel: Réinitialiser la position si le nuage sort de l'écran
        if (this.position.x + this.width < 0) {
            this.position.x = window.innerWidth + 100;
        }
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.position.x,
            this.position.y - 4, // Décalage vertical de -4 si nécessaire
            this.width,
            this.height
        );
    }
}
