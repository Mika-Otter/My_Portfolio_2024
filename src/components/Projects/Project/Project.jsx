import React, { useEffect, useRef, useState } from "react";
import s from "./Project.module.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CrossSVG } from "../../SVG/CrossSVG";
import { ArrowSVG } from "../../SVG/ArrowSVG";

export default function Project({ item, closeProject, nextProject, isProjectOpen }) {
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
                    <div className={s.project__pic}>
                        <div className={s.project__pic__title}>
                            <h2>{item.title}</h2>
                        </div>
                        <div className={s.project__pic__box}>
                            <div className={s.project__pic__box__ctn}>
                                <img src={item.url} alt={item.alt} />
                                <button type="button">LIVE SITE ●</button>
                            </div>
                        </div>
                    </div>
                    <div className={s.project__content}>
                        <p>{item.text}</p>
                        <div className={s.project__content__techno}>
                            <h3>TECHNOLOGIES</h3>
                            <p>{item.techno}</p>
                        </div>
                        <div className={s.project__content__client}>
                            <h3>CLIENT</h3>
                            <p>{item.client}</p>
                        </div>
                        <div className={s.project__content__year}>
                            <h3>YEAR</h3>
                            <div className={s.project__content__year__text}>
                                <span className={s.project__content__year__text__ask}>
                                    {item.year}
                                </span>
                                <p>Ask for source code</p>
                            </div>
                            {/* {item.github} || {item.askforsource} */}
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
                            NEXT PROJECT
                            <div className={s.project__button__svg}>
                                <ArrowSVG color={"#ffff"} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
