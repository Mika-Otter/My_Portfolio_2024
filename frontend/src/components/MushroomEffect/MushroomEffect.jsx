import React, { useEffect, useRef, useState } from "react";
import s from "./MushroomEffect.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function MushroomEffect({ isEatMushroom }) {
    const columnBlockRefs = useRef([]);
    const tlRef = useRef(null);

    useEffect(() => {
        if (isEatMushroom) {
            tlRef.current = gsap.timeline({ paused: true });

            // Récupérer toutes les références de blocs à travers toutes les colonnes
            const allBlocks = [];
            columnBlockRefs.current.forEach((col) => {
                allBlocks.push(...col);
            });

            // Ajouter les animations à la timeline
            if (allBlocks.length > 0) {
                tlRef.current.to(allBlocks, {
                    opacity: 1,
                    duration: 0.5,
                    stagger: { amount: 3, from: "center" },
                });
            }
        }
    }, [isEatMushroom]);

    useEffect(() => {
        // Jouer la timeline lorsque isEatMushroom est true
        if (isEatMushroom && tlRef.current) {
            tlRef.current.play();
            setTimeout(() => {
                tlRef.current.reverse();
            }, 7000);
        }
    }, [isEatMushroom]);

    const getBlocks = (columnIndex) => {
        const { innerWidth, innerHeight } = window;
        const blockSize = innerWidth * 0.05;
        const amountOfBlocks = Math.ceil(innerHeight / blockSize);

        return [...Array(amountOfBlocks)].map((_, i) => {
            const ref = (el) => {
                if (el) {
                    columnBlockRefs.current[columnIndex] =
                        columnBlockRefs.current[columnIndex] || [];
                    columnBlockRefs.current[columnIndex][i] = el;
                }
            };

            return <div key={i} className={s.block} ref={ref}></div>;
        });
    };

    return (
        <div className={s.bigbox}>
            {[...Array(20)].map((_, columnIndex) => (
                <div key={columnIndex} className={s.column}>
                    {getBlocks(columnIndex)}
                </div>
            ))}
        </div>
    );
}
