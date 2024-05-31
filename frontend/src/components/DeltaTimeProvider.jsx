import React, { useEffect, useState } from "react";

// Create a Context
export const DeltaTimeContext = React.createContext();

// Create a Provider Component
export const DeltaTimeProvider = ({ children }) => {
  const [deltaTimeValue, setDeltaTimeValue] = useState(0);
  const [loadingEnd, setLoadingEnd] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let lastTime = 0;
    let animationId = null;

    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      // const deltaTime = 18;
      lastTime = timeStamp;
      animationId = requestAnimationFrame(animate);
   
        setDeltaTimeValue(deltaTime);
   
    }

    animate();

    // Stop the animation after 1 second
    const timeoutId = setTimeout(() => {
      if (animationId) {
        setTimeout(() => {
          if (deltaTimeValue > 17) {
            setReload((prev) => !prev);
            return;
          } else {
            cancelAnimationFrame(animationId);
            setLoadingEnd(true);
          }
        }, 4500);
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [reload]);


  return (
    <DeltaTimeContext.Provider
      value={{ deltaTimeValue: deltaTimeValue, loadingEnd: loadingEnd }}
    >
      {children}
    </DeltaTimeContext.Provider>
  );
};
