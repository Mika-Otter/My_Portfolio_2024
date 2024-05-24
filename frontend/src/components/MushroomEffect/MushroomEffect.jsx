import React, { useEffect, useRef, useState } from "react";
import s from "./MushroomEffect.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function MushroomEffect() {
    const columnBlockRefs = useRef({});

    const [test, setTest] = useState(false);

    useGSAP(() => {
        Object.values(columnBlockRefs.current).forEach((blockRefs) => {
            if (blockRefs.length > 0) {
                const tl = gsap.timeline({});
                tl.to(blockRefs, {
                    opacity: 0,
                    duration: 0.4,
                    stagger: { amount: 5, from: "random", each: 5 },
                });
            }
        });
    }, [test]);

    useEffect(() => {
        console.log(test);
    }, [test]);

    const getBlocks = () => {
        const { innerWidth, innerHeight } = window;
        const blockSize = innerWidth * 0.05;
        const amountOfBlocks = Math.ceil(innerHeight / blockSize);

        return [...Array(amountOfBlocks)].map((_, i) => {
            const ref = (el) => {
                columnBlockRefs.current[i] = columnBlockRefs.current[i] || [];
                columnBlockRefs.current[i].push(el);
            };

            return <div key={i} className={s.block} ref={ref}></div>;
        });
    };

    return (
        <div className={s.bigbox}>
            <button type="button" onClick={() => setTest((prev) => !prev)}>
                Test
            </button>
            {[...Array(20)].map((_, i) => (
                <div key={i} className={s.column}>
                    {getBlocks()}
                </div>
            ))}
        </div>
    );
}
