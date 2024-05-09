// GameAnimate.js
import { changeLevel } from "./CollisionLevel";
import { RegularWind } from "../components/Game/Environnement/Wind";

export function gameAnimate({
    ctx,
    canvas,
    camera,
    doors,
    player,
    background,
    currentCollisionLevel,
    overlay,
    mainChangeLevel,
}) {
    let lastTime = 0;
    function animate(timeStamp) {
        // const deltaTime = timeStamp - lastTime;
        // lastTime = timeStamp;
        requestAnimationFrame(animate);
        mainChangeLevel();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(camera.position.x, camera.position.y);

        doors.forEach((door) => {
            door.draw(ctx);
        });

        background.draw(ctx, canvas);
        currentCollisionLevel.forEach((collisionBlock) => {
            collisionBlock.draw(ctx);
        });
        // background.update(deltaTime);
        player.draw(ctx);
        player.updatePlayer({
            background,
            context: ctx,
            canvas,
            camera,
        });

        ctx.restore();
        ctx.save();
        ctx.globalAlpha = overlay.opacity;
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    background.onload = animate(0);
}
