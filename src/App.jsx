import { useEffect, useState } from "react";
import Canvas from "./components/Canvas";

export default function App() {
    const [mapRow, setMapRow] = useState({ row: 0, precedentRow: 0 });

    // useEffect(() => {
    //     console.log("YOOOOO", mapRow);
    // }, [mapRow]);
    return (
        <>
            <Canvas mapRow={mapRow} setMapRow={setMapRow} />
        </>
    );
}
