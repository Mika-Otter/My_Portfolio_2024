import React, { createContext, useContext, useState } from "react";

const BackgroundHeightContext = createContext();
const setBackgroundHeightContext = createContext();

export function useBackgroundHeight() {
    return useContext(BackgroundHeightContext);
}

export function useSetBackgroundHeight() {
    return useContext(setBackgroundHeightContext);
}

export const BackgroundHeightProvider = ({ children }) => {
    const [backgroundHeight, setBackgroundHeight] = useState(20);

    function handleBackgroundHeight(value) {
        setBackgroundHeight(value);
    }

    return (
        <BackgroundHeightContext.Provider value={backgroundHeight}>
            <setBackgroundHeightContext.Provider value={handleBackgroundHeight}>
                {children}
            </setBackgroundHeightContext.Provider>
        </BackgroundHeightContext.Provider>
    );
};
