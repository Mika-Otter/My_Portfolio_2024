import React, { useRef, useState, useEffect, forwardRef } from "react";
import s from "./Loader.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LogoStartSVG } from "../SVG/LogoStartSVG";
import cn from "classnames";
import { preloadImages } from "../../gameLogic/PreloadImg";

gsap.registerPlugin();

const imageSources = [
    "./src/assets/img/home-map.png",
    "./src/assets/img/contact-map.png",
    "./src/assets/sprite-door/doorOpen.png",
    "./src/assets/img/water.png",
    "./src/assets/img/cloud.png",
    "./src/assets/img/mushroom-Sheet.png",
    "./src/assets/img/cat-Sheet.png",
    "./src/assets/img/robot-Sheet.png",
    "/flyingStars.png",
    "/starship.png",
];

export default function Loader({ firstEnter }) {
    const bigBoxRef = useRef();
    const smallBoxRef = useRef();
    const logoRef = useRef();
    const loaderRef = useRef();
    const nameRef = useRef();
    const developerRef = useRef();
    const textRef = useRef();
    const buttonRef = useRef();
    const loaderbackRef = useRef();
    const rectsRef = useRef([]);
    const [enter, setEnter] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);

    useEffect(() => {
        preloadImages(imageSources)
            .then(() => {
                setLoadingImg(true);
            })
            .catch((err) => {
                console.error("Failed to preload images", err);
            });
    }, []);
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
                tlSecond.play();
            },
        });

        const tlSecond = gsap.timeline({
            paused: true,
            onComplete: () => {
                setAnimation(false);
            },
        });
        shuffledIndexes.forEach((index, i) => {
            tl.to(
                rects[index],
                {
                    opacity: 1,
                    duration: 2,
                    delay: i * 0.18,
                    ease: "power4.inOut",
                },
                0
            );
        });
        tlSecond
            .to(logoRef.current, { y: -30, ease: "power3.inOut", delay: 0.5 }, 0)
            .to(textRef.current, { opacity: 1, delay: 0 }, 0)
            .to(
                buttonRef.current,
                { opacity: 1, ease: "power3.inOut", duration: 0.3, delay: 0.8 },
                0
            );
    }, []);

    useGSAP(() => {
        const { width, height } = bigBoxRef.current.getBoundingClientRect();

        if (enter) {
            gsap.to(bigBoxRef.current, {
                scale: 0.7,
                ease: "power4.inOut",
                duration: 0.7,
            });
            gsap.to(smallBoxRef.current, {
                opacity: 0,
            });
            gsap.set(bigBoxRef.current, {
                transformOrigin: "center center",
            });
            gsap.to(bigBoxRef.current, {
                y: `${height / 2}px`,
                height: "0%",
                delay: 0.7,
                duration: 0.5,
                ease: "power3.inOut",
            });
        }
    }, [enter]);

    const handleEnter = () => {
        setEnter(true);
        firstEnter();
    };

    useGSAP(() => {
        const tl = gsap.timeline();
        const { width, height } = loaderRef.current.getBoundingClientRect();

        tl.to(loaderRef.current, { width: 330, duration: 1.3 })
            .to(loaderRef.current, {
                width: 380,
                duration: 1,
            })
            .to(loaderRef.current, { width: 450, duration: 0.3 })
            .to(loaderRef.current, { width: 490, duration: 0.2 })
            .to(loaderRef.current, { width: 570, duration: 0.1, delay: 0.3 })
            .to(loaderRef.current, { width: 600, duration: 0.4, delay: 0.7 })
            .set(loaderRef.current, { transformOrigin: "center center" })
            .set(loaderbackRef.current, { opacity: 0 })
            .to(loaderRef.current, {
                x: `300px`,
                width: 0,
                duration: 0.6,
                delay: 1,
            });
    });

    return (
        <>
            <section className={s.loader} ref={bigBoxRef}>
                <div ref={smallBoxRef} className={s.loader__box}>
                    <div className={s.loader__box__ctn} ref={logoRef}>
                        <LogoStartSVG rectsRef={rectsRef} />
                    </div>
                    <div className={s.loaderbar}>
                        <div className={s.loaderbar__back} ref={loaderbackRef}></div>
                        <div className={s.loaderbar__one} ref={loaderRef}></div>
                    </div>

                    {!animation ? (
                        <>
                            <div className={s.buttons} ref={buttonRef}>
                                <button type="button" onClick={() => handleEnter()}>
                                    ENTER
                                </button>
                            </div>
                            <div className={s.texts} ref={textRef}>
                                <h2 ref={nameRef}>REMI CROCE </h2>
                                <h2 ref={developerRef}>CREATIVE DEVELOPER</h2>
                            </div>
                        </>
                    ) : null}
                </div>
            </section>
        </>
    );
}
