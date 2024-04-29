// GameAnimate.js
import { changeLevel } from "./CollisionLevel";

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
    function animate() {
        requestAnimationFrame(animate);
        mainChangeLevel();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(camera.position.x, camera.position.y);

        doors.forEach((door) => {
            door.draw(ctx);
        });
        player.draw(ctx);
        player.updatePlayer({
            background,
            context: ctx,
            canvas,
            camera,
        });

        background.draw(ctx, canvas);
        currentCollisionLevel.forEach((collisionBlock) => {
            collisionBlock.draw(ctx);
        });

        ctx.restore();
        ctx.save();
        ctx.globalAlpha = overlay.opacity;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    background.onload = animate(0);
}
