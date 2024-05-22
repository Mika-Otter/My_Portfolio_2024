export function initializeCanvas(canvas, squares, speed) {
    const ctx = canvas.getContext("2d");
    canvas.width = 40;
    canvas.height = 50;

    function drawSquare(square) {
        ctx.fillStyle = square.color;
        ctx.fillRect(square.x, square.y, square.width, square.height);
    }

    function updateSquare(square) {
        square.height += square.dy * speed;
        if (square.height <= square.max || square.height > -5) {
            square.dy *= -1;
        }
    }

    function animate(playingAudio) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        squares.forEach(drawSquare);
        if (playingAudio) {
            squares.forEach(updateSquare);
        } else {
            squares.forEach((square) => {
                if (square.height <= -5) {
                    square.height += 0.1;
                    square.color = "";
                }
            });
        }
        requestAnimationFrame(() => animate(playingAudio));
    }

    return animate;
}
