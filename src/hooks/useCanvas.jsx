import { useRef, useEffect } from "react";

function useCanvas(draw) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let animationID;

        const animate = () => {
            draw(ctx);
            animationID = window.requestAnimationFrame(animate);
        };
        animate();

        return () => window.cancelAnimationFrame(animationID);
    }, [draw]);

    return canvasRef;
}

export default useCanvas;
