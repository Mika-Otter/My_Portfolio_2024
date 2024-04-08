Array.prototype.parse2D = function () {
    const rows = [];
    for (let i = 0; i < this.length; i += 100) {
        rows.push(this.slice(i, i + 100));
    }

    return rows;
};

Array.prototype.createObjectsFrom2D = function ({
    CollisionBlock,
    blockValue,
    limitValue,
    precedentHeight,
}) {
    const objects = [];
    this.forEach((row, y) => {
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
};

Array.prototype.calculateHeight = function (collisionBlock) {
    let ArrayHeight = 0;
    for (let i = 0; i < this.length; i++) {
        ArrayHeight++;
    }
    return ArrayHeight * 28.8;
};
