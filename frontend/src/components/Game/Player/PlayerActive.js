import { Player } from "./Player";
import gsap from "gsap";

export class ActivePlayer extends Player {
  constructor({
    collisionBlocks,
    background,
    canvas,
    collisionBlocksList,
    keysTab,
    lastKeysTab,
    mapRow,
    toExp,
    starShip,
    secrets,
    handleIsDialog,
    activeCatSecret,
    activeRobotSecret,
    testRef,
    eatingMushroomEffect,
    handleContact,
    deltaTime,
    scale,
  }) {
    super({ collisionBlocks, background });
    this.canvas = canvas;
    this.keysTab = keysTab;
    this.lastKeysTab = lastKeysTab;
    this.moving = false;
    this.collisionBlocksList = collisionBlocksList;
    this.level = mapRow;
    this.mapRow = mapRow;
    this.toExp = toExp;
    this.isJumping = false;
    this.starShip = starShip;
    this.secrets = secrets;
    this.lastUpdateTime = performance.now();
    this.handleIsDialog = () => handleIsDialog();
    this.activeCatSecret = () => activeCatSecret();
    this.activeRobotSecret = () => activeRobotSecret();
    this.eatingMushroomEffect = () => eatingMushroomEffect();
    this.isDialoging = false;
    this.testRef = testRef;
    this.handleContact = () => handleContact();
    this.firstJump = false;
    this.canDoubleJump = false;
    this.hasDoubleJumped = false;
    this.deltaTime = deltaTime;
    this.speedX = 10;
    this.speedY = 22;
    this.scale = scale;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setState() {
    const { keysTab, lastKeysTab, velocity } = this;
    if (keysTab[0] === "q") {
      this.SPRITE_NAME = "RUN_L";
    } else if (velocity.x === 0 && lastKeysTab[0] === "q") {
      this.SPRITE_NAME = "IDLE_L";
    }

    if (keysTab[0] === "d") {
      this.SPRITE_NAME = "RUN_R";
    } else if (velocity.x === 0 && lastKeysTab[0] === "d") {
      this.SPRITE_NAME = "IDLE_R";
    }
    return this;
  }

  testActivate() {
    this.SPRITE_NAME = "TELEPORT";
    setTimeout(() => {
      this.SPRITE_NAME = "IDLE_R";
    }, 1500);
    return this;
  }

  updatePlayer({ background, context, canvas, camera, firstJump, deltaTime }) {

    this.handleMovement({ canvas, camera, background, firstJump, deltaTime })
      .updateCameraBox({ camera })
      .update({ camera, canvas, background, deltaTime })
      .setState();

    if (this.sprite) {
      this.sprite.update(this.SPRITE_NAME, deltaTime);
    } else {
      this.position.y = this.starShip.position.y;
      this.cameraBox.y = this.starShip.position.y;
      this.cameraBox.height = 700;
      this.cameraBox.position.y = this.position.y - 300;
      if (camera.position.x > -440) {
        camera.position.x -= 3;
      }

      if (
        this.cameraBox.position.y <= Math.abs(camera.position.y) &&
        this.cameraBox.position.y > 100
      ) {
        camera.position.y += this.starShip.speedStarship;
      }
    }

    context.fillStyle = "transparent";
    context.fillRect(
      this.cameraBox.position.x,
      this.cameraBox.position.y,
      this.cameraBox.width,
      this.cameraBox.height
    );
    this.changeLevelByTheBottom().changeLevelByTheTop();

    if (this.keysTab.includes("z")) {
      this.launchStarship().activeSecrets();
    }

    // Mise à jour des flags de saut
    if (this.velocity.y === 0) {
      this.isJumping = false;
      this.hasDoubleJumped = false;
    }

    return this;
  }

  handleMovement({ canvas, camera, background, deltaTime}) {
    if (this.preventInput) return this;

    if (this.keysTab.includes(" ") && !this.collidedTop) {
      if (this.velocity.y === 0) {
        this.velocity.y = -this.speedY * this.scale * deltaTime;
        this.jumping = true;
      }
    }

    if (this.keysTab[0] === "d" && !this.collidedRight) {
      this.velocity.x = this.speedX  * this.scale * deltaTime
      this.shouldPanCameraToTheLeft({ canvas, camera, background });
    } else if (
      this.keysTab[0] === "q" &&
      !this.collidedLeft &&
      this.position.x > 0
    ) {
      this.velocity.x = -this.speedX * this.scale * deltaTime;
      this.shouldPanCameraToTheRight({ camera });
    } else {
      this.velocity.x = 0;
    }
    return this;
  }

  changeLevelByTheBottom() {
    if (
      this.position.y + this.height >
        this.collisionBlocks[this.collisionBlocks.length - 1].position.y &&
      this.mapRow.row < 5
    ) {
      this.mapRow.row++;
      this.collisionBlocks = this.collisionBlocksList[this.mapRow.row];
    }
    return this;
  }

  changeLevelByTheTop() {
    if (
      this.position.y < this.collisionBlocks[0].position.y &&
      this.mapRow.row > 0
    ) {
      this.mapRow.row--;
      this.collisionBlocks = this.collisionBlocksList[this.mapRow.row];
    }
    return this;
  }

  launchStarship() {
    if (this.starShip) {
      const starShip = this.starShip;
      if (
        this.position.x + this.width <=
          starShip.position.x + starShip.spriteWidth * 1.5 &&
        this.position.x - 3 >= starShip.position.x &&
        this.position.y <= starShip.position.y + starShip.spriteHeight * 1.5 &&
        this.position.y + this.height >= starShip.position.y
      ) {
        starShip.launching = true;
        this.position.x = starShip.position.x;
        this.position.y = starShip.position.y;
        this.cameraBox.y = starShip.position.y;
        this.gravity = 0;
        this.sprite = "";
        setTimeout(() => {
          this.handleContact();
        }, 3200);
      }
    }
    return this;
  }

  pausingStarship() {
    if (this.starShip) {
      this.starShip.pause = true;
    }
    return this;
  }

  isDialogingActive() {
    this.isDialoging = true;
    setTimeout(() => {
      this.isDialoging = false;
    }, 10000);
  }

  activeSecrets() {
    if (this.secrets) {
      this.secrets.forEach((secret, index) => {
        if (
          this.position.x + this.width <=
            secret.position.x + secret.renderWidth + 50 &&
          this.position.x >= secret.position.x - 50 &&
          this.position.y <= secret.position.y + secret.renderHeight &&
          this.position.y + this.height >= secret.position.y
        ) {
          if (index === 0) {
            gsap.to(this.testRef.current, { opacity: 1, duration: 2 });
            this.secrets[0].eatMushroom();
            this.eatingMushroomEffect();
            setTimeout(() => {
              gsap.to(this.testRef.current, { opacity: 0, duration: 2 });
            }, 11000);
            return;
          }
          if (this.isDialoging) return;
          this.handleIsDialog();
          this.isDialogingActive();

          if (index === 1) {
            this.activeCatSecret();
          } else if (index === 2) {
            this.activeRobotSecret();
          }
        }
      });
    }
    return this;
  }
}
