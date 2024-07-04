import { useEffect } from "react";

export default function useResize(setWindowWidth, setIsLoading) {
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth > 900) {
        setWindowWidth(newWidth);
        setIsLoading(true);
        window.location.reload();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth, setIsLoading]);
}
