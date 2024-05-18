import React, { useEffect, useRef, useState } from "react";
import s from "./Project.module.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CrossSVG } from "../../SVG/CrossSVG";
import { ArrowSVG } from "../../SVG/ArrowSVG";
import Video from "../../Video/Video";

export default function Project({ item, closeProject, nextProject, index, currentIndex }) {
    const projectWrapperRef = useRef();
    const [closing, setClosing] = useState(false);
    const timelineRef = useRef();
    const projectRef = useRef();

    useGSAP(() => {
        timelineRef.current = gsap
            .timeline({ paused: true })
            .to(projectWrapperRef.current, { height: "2%", width: "100%", duration: 0.2 })
            .to(projectWrapperRef.current, { height: "100%", duration: 0.6 })
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
        console.log(closing);
    }, [closing]);

    return (
        <div className={s.main}>
            <div className={s.project__wrapper} ref={projectWrapperRef}>
                <div className={s.project} ref={projectRef}>
                    <div className={s.project__left}>
                        <div className={s.project__pic}>
                            <div className={s.project__pic__box}>
                                <div className={s.project__pic__box__ctn}>
                                    <Video
                                        src={item.url}
                                        index={index}
                                        currentIndex={currentIndex}
                                    />
                                </div>
                                <div className={s.project__pic__box__ctn__two}>
                                    <div className={s.project__pic__box__ctn__two__small}></div>
                                    <div className={s.project__pic__box__ctn__two__small}></div>
                                </div>
                            </div>
                            <button className={s.project__pic__button} type="button">
                                LIVE SITE ●
                            </button>
                        </div>
                        <div className={s.project__pic__title}>
                            <h2>{item.title}</h2>
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
                                <p className={s.project__content__text}>{item.techno}</p>
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
                        <div className={s.project__pic__title__ask}>
                            <p>Ask for source code</p>
                        </div>
                    </div>
                    <div className={s.project__close} onClick={() => closingGSAP()}>
                        <span>CLOSE</span>
                        <div className={s.project__close__cross}>
                            <CrossSVG />
                        </div>
                    </div>
                    <div className={s.project__button}>
                        <button
                            type="button"
                            className={s.project__button__btn}
                            onClick={() => nextProject()}
                        >
                            <span>NEXT PROJECT</span>
                            <div className={s.project__button__svg}>
                                <ArrowSVG color={"#091429"} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}