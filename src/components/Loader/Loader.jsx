import React, { useRef, useState } from "react";
import s from "./Loader.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LogoStartSVG } from "../SVG/LogoStartSVG";

gsap.registerPlugin();

export default function Loader() {
    const bigBoxRef = useRef();
    const smallBoxRef = useRef();
    const rectsRef = useRef([]);
    const [enter, setEnter] = useState(false);
    const [animation, setAnimation] = useState(true);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useGSAP(() => {
        const rects = rectsRef.current;

        rects.forEach((rect, index) => {
            gsap.set(rect, {
                opacity: 0,
            });
        });

        const indexes = Array.from({ length: rects.length }, (_, index) => index);

        const shuffledIndexes = shuffleArray(indexes);

        const tl = gsap.timeline({
            onComplete: () => {
                // Mettre à jour l'état pour montrer le bouton ENTER
                setAnimation(false);
            },
        });

        shuffledIndexes.forEach((index, i) => {
            tl.to(
                rects[index],
                {
                    opacity: 1, // Réglez l'opacité à 0
                    duration: 2, // Durée de l'animation
                    delay: i * 0.2, // Décalage pour chaque rectangle
                    ease: "power4.inOut", // Facilité de l'animation
                },
                0
            );
        });
    }, []);

    useGSAP(() => {
        const { width, height } = bigBoxRef.current.getBoundingClientRect();

        if (enter) {
            gsap.to(bigBoxRef.current, {
                scale: 0.7,
                ease: "power4.inOut",
                duration: 1,
            });
            gsap.to(smallBoxRef.current, {
                opacity: 0,
            });
            gsap.set(bigBoxRef.current, {
                transformOrigin: "center center",
                // Déplacer l'élément vers le haut pour compenser
            });
            gsap.to(bigBoxRef.current, {
                y: `${height / 2}px`,
                height: "0%",
                delay: 0.7,
                duration: 0.9,
                ease: "power3.inOut",
            });
        }
    }, [enter]);

    const handleEnter = () => {
        setEnter(true);
    };

    return (
        <>
            <section className={s.loader} ref={bigBoxRef}>
                <div ref={smallBoxRef} className={s.loader__box}>
                    <div className={s.loader__box__ctn}>
                        <LogoStartSVG rectsRef={rectsRef} />
                    </div>
                    {!animation ? (
                        <button type="button" onClick={() => handleEnter()}>
                            ENTER
                        </button>
                    ) : null}
                </div>
            </section>
        </>
    );
}
