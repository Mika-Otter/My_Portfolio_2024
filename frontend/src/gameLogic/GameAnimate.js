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
    water,
    cloud,
}) {
    let lastTime = 0;
    function animate(timeStamp) {
        // const deltaTime = timeStamp - lastTime;
        // lastTime = timeStamp;

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
        player.draw(ctx);
        player.updatePlayer({
            background,
            context: ctx,
            canvas,
            camera,
        });
        water.draw(ctx, canvas);
        cloud.draw(ctx, canvas);

        ctx.restore();
        ctx.save();
        ctx.globalAlpha = overlay.opacity;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        requestAnimationFrame(animate);
    }

    background.onload = animate(0);
}