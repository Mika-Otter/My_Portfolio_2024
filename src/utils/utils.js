export function parse2D(array) {
    const rows = [];
    for (let i = 0; i < array.length; i += 100) {
        rows.push(array.slice(i, i + 100));
    }

    return rows;
}

export function createObjectsFrom2D(
    array,
    { CollisionBlock, blockValue, limitValue, precedentHeight }
) {
    const objects = [];
    array.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === blockValue || symbol === limitValue) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 28.8,
                            y: y * 28.8 + precedentHeight,
                        },
                    })
                );
            }
        });
    });

    return objects;
}

export function calculateHeight(array, collisionBlock) {
    let ArrayHeight = 0;
    for (let i = 0; i < array.length; i++) {
        ArrayHeight++;
    }
    return ArrayHeight * 28.8;
}
