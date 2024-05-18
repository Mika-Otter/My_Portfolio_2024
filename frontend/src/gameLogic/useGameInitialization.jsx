import { useEffect, useRef } from "react";
import { ActivePlayer } from "../components/Player/ActivePlayer";
import { Background } from "../components/Background";
import {
    collisionsLevel1,
    collisionsLevel2,
    collisionsLevel3,
    collisionsLevel4,
    collisionsLevel5,
} from "../data/collisions";
import { CollisionBlock } from "../components/CollisionBlock";
import { Door } from "../components/SpriteDoor";

export function useGameInitialization(canvasRef) {
    const playerRef = useRef(null);
    const cameraRef = useRef({ position: { x: 0, y: 0 } });
    const overlayRef = useRef({ opacity: 0 });
    const keysTabRef = useRef([]);
    const lastKeysTabRef = useRef([""]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Votre logique d'initialisation ici...
    }, [canvasRef]);

    return { playerRef, cameraRef, overlayRef, keysTabRef, lastKeysTabRef };
}
