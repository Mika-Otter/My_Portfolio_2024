import { useRef, useEffect } from "react";

export default function Canvas(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const keysTab = [];
        const lastKeysTab = [""];
        const camera = { position: { x: 0, y: 0 } };
    }, []);

    return <canvas ref={canvasRef} width={props.width} height={props.height} />;
}
