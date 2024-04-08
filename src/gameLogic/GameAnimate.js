// GameAnimate.js
import { changeLevel } from "./CollisionLevel";

export function gameAnimate({
    player,
    keysTab,
    lastKeysTab,
    camera,
    doors,
    background,
    currentCollisionLevel,
    canvas,
    ctx,
    newLevel,
    i,
}) {
    function animate() {
        requestAnimationFrame(animate);
        changeLevel(currentCollisionLevel, newLevel, i);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(camera.position.x, camera.position.y);

        doors.forEach((door) => {
            door.draw(ctx);
        });
        player.draw(ctx);
        player.updatePlayer({
            background: background,
            context: ctx,
            canvas,
            camera,
        });

        background.draw(ctx);

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

    animate();
}
