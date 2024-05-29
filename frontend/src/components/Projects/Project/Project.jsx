import React, { useEffect, useRef, useState } from "react";
import s from "./Project.module.scss";
import cn from "classnames";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CrossSVG } from "../../SVG/CrossSVG";
import { ArrowSVG } from "../../SVG/ArrowSVG";
import Video from "../../Video/Video";
import ArrowLiveSVG from "../../SVG/ArrowLiveSVG";
import { CrossBlackSVG } from "../../SVG/CrossBlackSVG";

export default function Project({
    item,
    closeProject,
    nextProject,
    prevProject,
    index,
    currentIndex,
}) {
    const projectWrapperRef = useRef();
    const [closing, setClosing] = useState(false);
    const timelineRef = useRef();
    const projectRef = useRef();
    const projectPicRef = useRef(null);
    const projectPicBoxRef = useRef(null);

    // useGSAP(() => {
    //     let smoother = ScrollSmoother.create({
    //         wrapper: projectPicRef.current,
    //         content: projectPicBoxRef.current,
    //     });
    // }, []);

    useGSAP(() => {
        timelineRef.current = gsap
            .timeline({ paused: true })
            .to(projectWrapperRef.current, { height: "2%", width: "100%", duration: 0.5 })
            .to(projectWrapperRef.current, {
                height: "100%",
                duration: 0.6,
                delay: 0.2,
                borderRadius: "5px",
            })
            .to(projectRef.current, { opacity: 1 });

        if (!closing) {
            timelineRef.current.play();
        } else {
            console.log("YOOOOO");
            timelineRef.current.reverse(true);
            timelineRef.current.eventCallback("onReverseComplete", () => {
                closeProject();
            });
        }
    }, [closing]);

    const closingGSAP = () => {
        setClosing(true);
        setTimeout(() => {
            closeProject();
            setClosing(false);
        }, 1000);
    };

    useEffect(() => {
        console.log(window.innerWidth, window.innerHeight);
    }, [closing]);

    return (
        <div className={s.main}>
            <div className={s.project__wrapper} ref={projectWrapperRef}>
                <div className={s.project} ref={projectRef}>
                    <div className={s.project__left}>
                        <div className={s.project__pic} ref={projectPicRef}>
                            {item.img1 ? (
                                <>
                                    <div className={s.project__pic__box} ref={projectPicBoxRef}>
                                        <div className={s.project__pic__box__ctn}>
                                            <Video
                                                src={item.url}
                                                index={index}
                                                currentIndex={currentIndex}
                                            />
                                        </div>
                                        <div className={s.project__pic__box__ctn__two}>
                                            <div className={s.project__pic__box__ctn__two__small}>
                                                <img src={item.img1} alt={item.img1} />
                                            </div>
                                            <div className={s.project__pic__box__ctn__two__small}>
                                                <img src={item.img2} alt={item.img2} />
                                            </div>
                                        </div>
                                        <div className={s.project__pic__box__ctn}>
                                            <img src={item.img3} alt={item.img3} />
                                        </div>
                                        <div className={s.project__pic__box__ctn__two}>
                                            <div className={s.project__pic__box__ctn__two__small}>
                                                <img src={item.img4} alt={item.img4} />
                                            </div>
                                            <div className={s.project__pic__box__ctn__two__small}>
                                                <img src={item.img5} alt={item.img5} />
                                            </div>
                                        </div>
                                        <div className={s.project__pic__box__ctn}>
                                            <img src={item.img6} alt={item.img6} />
                                        </div>
                                        <div className={s.project__pic__box__ctn__two}>
                                            <div className={s.project__pic__box__ctn__two__small}>
                                                <img src={item.img7} alt={item.img7} />
                                            </div>
                                            <div className={s.project__pic__box__ctn__two__small}>
                                                <img src={item.img8} alt={item.img8} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={s.project__pic__wrapper}></div>
                                </>
                            ) : (
                                <div className={s.project__pic__box__ctn__alone}>
                                    <Video
                                        src={item.url}
                                        index={index}
                                        currentIndex={currentIndex}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={s.project__pic__title}>
                            <h2>{item.title}</h2>
                            <span>
                                Live Site{" "}
                                <div className={s.project__pic__title__svg}>
                                    <ArrowLiveSVG />
                                </div>
                            </span>
                        </div>
                    </div>

                    <div className={s.project__content}>
                        <p>{item.text}</p>

                        <div className={s.project__content__client}>
                            <h3>CLIENT</h3>
                            <p className={s.project__content__text}>{item.client}</p>
                        </div>
                        <div className={s.project__content__clientyear}>
                            <div className={s.project__content__techno}>
                                <h3>TECHNOLOGIES</h3>
                                <p className={s.project__content__techno__text}>{item.techno}</p>
                            </div>
                            <div className={s.project__content__year}>
                                <h3>YEAR</h3>
                                <div className={s.project__content__year__text}>
                                    <span className={s.project__content__year__text__ask}>
                                        {item.year}
                                    </span>
                                </div>
                                {/* {item.github} || {item.askforsource} */}
                            </div>
                        </div>
                        {/* <div className={s.project__pic__title__ask}>
                            <p>Ask for source code</p>
                        </div> */}
                    </div>
                    <div className={s.project__close} onClick={() => closingGSAP()}>
                        <span>CLOSE</span>
                        <div className={s.project__close__cross}>
                            <CrossBlackSVG />
                        </div>
                    </div>
                    <div className={s.project__button}>
                        <button
                            type="button"
                            className={cn(s.project__button__btn, s.project__button__prev)}
                            onClick={() => prevProject()}
                        >
                            <span>PREV</span>
                            <div className={s.project__button__svg}>
                                {/* <ArrowSVG color={"#091429"} /> */}
                            </div>
                        </button>
                        <button
                            type="button"
                            className={s.project__button__btn}
                            onClick={() => nextProject()}
                        >
                            <span>NEXT</span>
                            <div className={s.project__button__svg}>
                                {/* <ArrowSVG color={"#091429"} /> */}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
