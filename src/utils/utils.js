export function parse2D(array) {
    const rows = [];
    for (let i = 0; i < array.length; i += 70) {
        rows.push(array.slice(i, i + 70));
    }

    return rows;
}

export function createObjectsFrom2D(
    array,
    { CollisionBlock, blockValue, limitValue, precedentHeight, background }
) {
    const objects = [];
    const scale = background.width / background.originalWidth;
    // console.log(scale);
    array.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === blockValue || symbol === limitValue) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 32 * scale - 2, // 128 = 32 * 400% ZOOM
                            y: y * 32 * scale + precedentHeight,
                        },
                        width: 32 * scale,
                        height: 32 * scale,
                    })
                );
            }
        });
    });

    return objects;
}

export function calculateHeight(array, background) {
    const scale = background.width / background.originalWidth;
    let ArrayHeight = 0;
    for (let i = 0; i < array.length; i++) {
        ArrayHeight++;
    }
    return ArrayHeight * 28.8 * scale;
}
