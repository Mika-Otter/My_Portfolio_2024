import React, { createContext, useContext, useState } from "react";

const BackgroundHeightContext = createContext();

export const BackgroundHeightProvider = ({ children }) => {
    const [backgroundHeight, setBackgroundHeight] = useState(0);

    return (
        <BackgroundHeightContext.Provider value={{ backgroundHeight, setBackgroundHeight }}>
            {children}
        </BackgroundHeightContext.Provider>
    );
};

export const useBackgroundHeight = () => useContext(BackgroundHeightContext);
