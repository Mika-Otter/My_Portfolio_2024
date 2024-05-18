import { collisionsLevel1, collisionsLevel2 } from "../data/collisions-test";
import { CollisionBlock } from "../components/Game/Environnement/CollisionBlock";
import { parse2D, createObjectsFrom2D } from "../utils/utils";

export function parseCollisions(background) {
    const parsedCollisionsLevel1 = parse2D(collisionsLevel1, 70);
    const parsedCollisionsLevel2 = parse2D(collisionsLevel2, 100);

    const collisionBlocksLevel1 = createObjectsFrom2D(parsedCollisionsLevel1, {
        CollisionBlock: CollisionBlock,
        blockValue: 49,
        limitValue: 1,
        precedentHeight: 0,
        background: background,
    });

    const collisionBlocksLevel2 = createObjectsFrom2D(parsedCollisionsLevel2, {
        CollisionBlock: CollisionBlock,
        blockValue: 49,
        limitValue: 1,
        precedentHeight: 0,
        background: background,
    });

    const collisionBlocksList = [collisionBlocksLevel1, collisionBlocksLevel2];
    return collisionBlocksList;
}

export function changeLevel(collisionBlocksList, newLevel, i) {
    if (newLevel.level > newLevel.precedentLevel) {
        currentCollisionLevel = collisionBlocksList[i++];
        newLevel.precedentLevel = newLevel.level;
    }
}
