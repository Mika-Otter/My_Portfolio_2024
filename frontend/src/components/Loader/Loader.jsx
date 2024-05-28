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
    const bigBoxRef = useRef(null);
    const smallBoxRef = useRef(null);
    const logoRef = useRef(null);
    const loaderRef = useRef(null);
    const nameRef = useRef(null);
    const developerRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const loaderbackRef = useRef(null);
    const rectsRef = useRef([]);
    const [enter, setEnter] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [settingUp, setSettingUp] = useState("");
    const settingUpRef = useRef(null);

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

    const settingUpList = [
        { text: "src/assets/background.webp", duration: 100 },
        { text: "src/assets/player.png", duration: 100 },
        { text: "src/assets/slider.webp", duration: 500 },
        { text: "src/assets/douceurideale.mp4", duration: 100 },
        { text: "src/components", duration: 100 },
        { text: "src/styles/global.scss", duration: 600 },
        { text: "src/data", duration: 100 },
        { text: "src/gameLogic/gameInit.js", duration: 100 },
        { text: "src/gameLogic/gameInit.js", duration: 1500 },
        { text: "src/gameLogic/playerInit.js", duration: 200 },
        { text: "src/gameLogic/gameAnimate.js", duration: 200 },
        { text: "src/gameLogic/gameAnimate.js", duration: 1300 },
    ];

    function chargementSettingUp(list) {
        let totalDuration = 0;

        list.forEach((setting, index) => {
            totalDuration += setting.duration;

            setTimeout(() => {
                setSettingUp(setting.text);
            }, totalDuration);
        });

        setTimeout(() => {
            gsap.to(settingUpRef.current, {
                opacity: 0,
                ease: "none",
            });
        }, totalDuration);
    }

    useEffect(() => {
        chargementSettingUp(settingUpList);
    }, []);

    useGSAP(() => {
        // const rects = rectsRef.current;

        // rects.forEach((rect, index) => {
        //     gsap.set(rect, {
        //         opacity: 0,
        //     });
        // });

        // const indexes = Array.from({ length: rects.length }, (_, index) => index);

        // // const shuffledIndexes = shuffleArray(indexes);

        // const tl = gsap.timeline({
        //     onComplete: () => {
        //         tlSecond.play();
        //     },
        // });

        const tlSecond = gsap.timeline({
            paused: true,
            onComplete: () => {
                setAnimation(false);
            },
        });
        // indexes.forEach((index, i) => {
        //     tl.to(
        //         rects[index],
        //         {
        //             opacity: 1,
        //             // duration: 0.3,
        //             delay: i * 0.15,
        //             ease: "power4.inOut",
        //         },
        //         0
        //     );
        // });
        tlSecond
            .to(logoRef.current, { y: -30, ease: "power3.inOut", delay: 0.5 }, 2)
            .to(textRef.current, { opacity: 1, delay: 0 }, 2)
            .to(
                buttonRef.current,
                { opacity: 1, ease: "power3.inOut", duration: 0.3, delay: 0.8 },
                2
            );

        setTimeout(() => {
            tlSecond.play();
        }, 4000);
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
                    <div className={s.loader__box__logo} ref={logoRef}>
                        <LogoStartSVG rectsRef={rectsRef} />
                    </div>
                    <div className={s.loaderbar}>
                        <div className={s.loaderbar__back} ref={loaderbackRef}></div>
                        <div className={s.loaderbar__one} ref={loaderRef}></div>
                    </div>
                    <div className={s.settingUp} ref={settingUpRef}>
                        <span>{settingUp}</span>
                        <span>...</span>
                    </div>

                    {!animation ? (
                        <>
                            <div className={s.buttons} ref={buttonRef}>
                                <button type="button" onClick={() => handleEnter()}>
                                    ENTER
                                </button>
                            </div>
                            <div className={s.texts} ref={textRef}>
                                <h2 ref={nameRef} className={s.texts__remi}>
                                    REMI CROCE{" "}
                                </h2>
                                <h2 ref={developerRef} className={s.texts__creative}>
                                    CREATIVE DEVELOPER
                                </h2>
                            </div>
                        </>
                    ) : null}
                </div>
            </section>
        </>
    );
}
