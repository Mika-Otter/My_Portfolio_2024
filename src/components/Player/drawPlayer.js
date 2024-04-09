export default function drawPlayer(ctx, x, y) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 50, 50);
}
