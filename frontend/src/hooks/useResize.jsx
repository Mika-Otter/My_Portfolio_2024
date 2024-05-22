import { useEffect } from "react";

export default function useResize(setWindowWidth, setIsLoading) {
    useEffect(() => {
        const handleResize = () => {
            setIsLoading(true);
            setWindowWidth(window.innerWidth);
            window.location.reload();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setWindowWidth, setIsLoading]);
}
