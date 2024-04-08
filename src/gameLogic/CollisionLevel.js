import {
    collisionsLevel1,
    collisionsLevel2,
    collisionsLevel3,
    collisionsLevel4,
    collisionsLevel5,
} from "../data/collisions";
import { CollisionBlock } from "../components/Environnement/CollisionBlock";
import { parse2D, calculateHeight, createObjectsFrom2D } from "../utils/utils";

export function parseCollisions(background) {
    const parsedCollisionsLevel1 = parse2D(collisionsLevel1); // 56 rows
    const parsedCollisionsLevel2 = parse2D(collisionsLevel2); // 56 rows
    const parsedCollisionsLevel3 = parse2D(collisionsLevel3); // 52 rows
    const parsedCollisionsLevel4 = parse2D(collisionsLevel4); // 74 rows
    const parsedCollisionsLevel5 = parse2D(collisionsLevel5); // 78 rows

    const heightParsedLevel1 = calculateHeight(parsedCollisionsLevel1);
    const heightParsedLevel2 = calculateHeight(parsedCollisionsLevel2);
    const heightParsedLevel3 = calculateHeight(parsedCollisionsLevel3);
    const heightParsedLevel4 = calculateHeight(parsedCollisionsLevel4);

    const collisionBlocksLevel1 = createObjectsFrom2D(parsedCollisionsLevel1, {
        CollisionBlock: CollisionBlock,
        background: background,
        blockValue: 1,
        limitValue: 2,
        precedentHeight: 0,
    });

    const collisionBlocksLevel2 = createObjectsFrom2D(parsedCollisionsLevel2, {
        CollisionBlock: CollisionBlock,
        background: background,
        blockValue: 2,
        limitValue: 3,
        precedentHeight: heightParsedLevel1,
    });
    const collisionBlocksLevel3 = createObjectsFrom2D(parsedCollisionsLevel3, {
        CollisionBlock: CollisionBlock,
        background: background,
        blockValue: 3,
        limitValue: 1,
        precedentHeight: heightParsedLevel1 + heightParsedLevel2,
    });
    const collisionBlocksLevel4 = createObjectsFrom2D(parsedCollisionsLevel4, {
        CollisionBlock: CollisionBlock,
        background: background,
        blockValue: 4,
        limitValue: 2,
        precedentHeight: heightParsedLevel1 + heightParsedLevel2 + heightParsedLevel3,
    });
    const collisionBlocksLevel5 = createObjectsFrom2D(parsedCollisionsLevel5, {
        CollisionBlock: CollisionBlock,
        background: background,
        blockValue: 1,
        limitValue: 4,
        precedentHeight:
            heightParsedLevel1 + heightParsedLevel2 + heightParsedLevel3 + heightParsedLevel4,
    });

    const collisionBlocksList = [
        collisionBlocksLevel1,
        collisionBlocksLevel2,
        collisionBlocksLevel3,
        collisionBlocksLevel4,
        collisionBlocksLevel5,
    ];

    return collisionBlocksList;
}

export function changeLevel(collisionBlocksList, newLevel, i) {
    if (newLevel.level > newLevel.precedentLevel) {
        currentCollisionLevel = collisionBlocksList[i++];
        newLevel.precedentLevel = newLevel.level;
    }
}
