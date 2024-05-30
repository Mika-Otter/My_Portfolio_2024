import React, { useState, useEffect, useRef } from "react";
import s from "./Projects.module.scss";
import cn from "classnames";
import { ProjectsBoxSVG } from "../SVG/ProjectsBoxSVG";
import { GoToExpSVG } from "../SVG/GoToExpSVG";
import { CrossSVG } from "../SVG/CrossSVG";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/all";
import Project from "./Project/Project";
import { ArrowSVG } from "../SVG/ArrowSVG";
import Video from "../Video/Video";
import projectsData from "./ProjectsData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Projects({
    handleNextLevel,
    nextLevel,
    isOpenProject,
    openProject,
    closeProject,
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(0);
    const [isHover, setIsHover] = useState(false);

    const [clickNextLevel, setClickNextLevel] = useState(false);
    const projectsRef = useRef(null);
    const projectsWrapperRef = useRef(null);
    const projectVideoBackgroundRef = useRef(null);
    const intervalRef = useRef(null);

    const handleClickNextLevel = () => {
        setClickNextLevel((prev) => !prev);
        // console.log(clickNextLevel);
    };

    const items = projectsData;
    const viewRefs = useRef(items.map(() => React.createRef()));

    const handleMouseEnter = (e, index) => {
        setCurrentIndex(index);
        setIsHover(true);
    };

    const moveHover = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };
    const handleMouseLeave = (e, index) => {
        setCurrentIndex(index);
        setIsHover(false);
    };

    const nextProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    useEffect(() => {
        setLastIndex(currentIndex);
    }, [currentIndex]);

    useGSAP(() => {
        const currentElement = viewRefs.current[currentIndex].current;
        const parentElement = currentElement.parentElement;

        viewRefs.current.forEach((ref, index) => {
            switch (currentIndex) {
                case 0:
                    gsap.set(projectVideoBackgroundRef.current, { backgroundColor: "#1c1c1d" });
                    break;
                case 1:
                    gsap.set(projectVideoBackgroundRef.current, { backgroundColor: "#dc86dc" });
                    break;
                case 2:
                    gsap.set(projectVideoBackgroundRef.current, { backgroundColor: "#a0b0a8" });
                    break;
                case 3:
                    gsap.set(projectVideoBackgroundRef.current, { backgroundColor: "#183829" });
                    break;
                case 4:
                    gsap.set(projectVideoBackgroundRef.current, { backgroundColor: "#a0b0a8" });
                    break;
                default:
                    break;
            }
            if (index !== currentIndex)
                gsap.set(ref.current, {
                    height: "0%",
                    opacity: 0,
                });
            if (index === currentIndex) {
                parentElement.appendChild(currentElement);
                gsap.set(currentElement, {
                    height: "100%",
                    width: "100%",
                    opacity: 1,
                    zIndex: 1,
                });
            }
        });
    }, [currentIndex]);

    useEffect(() => {
        if (!isHover && !isOpenProject) {
            intervalRef.current = setInterval(moveHover, 9000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isHover, isOpenProject]);

    // useEffect(() => {
    //     console.log(currentIndex, "and last index :", lastIndex);
    // }, [currentIndex]);

    useGSAP(() => {
        if (clickNextLevel) {
            const { height } = projectsWrapperRef.current.getBoundingClientRect();
            gsap.set(projectsWrapperRef.current, {
                transformOrigin: "center center",
            });
            gsap.to(projectsWrapperRef.current, {
                yPercent: `${height / 2}px`,
                height: "0%",
                duration: 0.5,
                ease: "power3.inOut",
            });
            gsap.to(projectsRef.current, {
                opacity: 0,
                duration: 0.3,
            });
            gsap.set(projectsRef.current, {
                display: "none",
                delay: 0.3,
            });

            handleClickNextLevel();
        }
    }, [clickNextLevel]);
    return (
        <>
            <section className={s.projects}>
                <div className={s.projects__box__wrapper} ref={projectsWrapperRef}>
                    <div className={s.projects__box} ref={projectsRef}>
                        <div className={s.projects__box__view} ref={projectVideoBackgroundRef}>
                            <div className={s.projects__box__view__ctn}>
                                {items.map((item, index) => (
                                    <div
                                        className={s.projects__box__view__ctn__img}
                                        ref={viewRefs.current[index]}
                                        key={index}
                                    >
                                        <Video
                                            src={item.url}
                                            index={index}
                                            currentIndex={currentIndex}
                                            isOpenProject={isOpenProject}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={s.projects__box__content}>
                            <div className={s.projects__box__title}>
                                <h2>Latest works</h2>
                            </div>
                            <div className={s.projects__box__content__text}>
                                <div className={s.projects__box__content__text__banner}></div>
                                <div className={s.projects__box__content__text__projects}>
                                    <ul>
                                        {items.map((item, index) => (
                                            <li
                                                key={index}
                                                className={index === currentIndex ? s.liHover : ""}
                                                onMouseEnter={(e) => {
                                                    isOpenProject
                                                        ? null
                                                        : handleMouseEnter(e, index);
                                                }}
                                                onMouseLeave={(e) => {
                                                    isOpenProject
                                                        ? null
                                                        : handleMouseLeave(e, index);
                                                }}
                                                onClick={() => openProject()}
                                            >
                                                <div
                                                    className={
                                                        s.projects__box__content__text__projects__project
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            s.projects__box__content__text__projects__project__title
                                                        }
                                                    >
                                                        {item.title}
                                                    </div>

                                                    <div
                                                        className={
                                                            s.projects__box__content__text__projects__project__text
                                                        }
                                                    >
                                                        <span>{item.smalltext}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div
                            className={s.projects__box__goToExp}
                            onClick={() => {
                                handleNextLevel();
                                handleClickNextLevel();
                            }}
                        >
                            <div className={s.projects__box__goToExp__wrapper}>
                                <div className={s.projects__box__goToExp__wrapper__ctn}>
                                    <span>NEXT LEVEL</span>
                                </div>
                                <div className={s.projects__box__goToExp__wrapper__ctn}>
                                    <span>NEXT LEVEL</span>
                                </div>
                            </div>

                            <div className={s.projects__box__goToExp__arrow}>
                                {/* <ArrowSVG color={"#091429"} /> */}
                            </div>
                        </div>
                    </div>
                    {isOpenProject && (
                        <Project
                            item={items[currentIndex]}
                            closeProject={closeProject}
                            nextProject={nextProject}
                            prevProject={prevProject}
                            index={currentIndex}
                            currentIndex={currentIndex}
                        />
                    )}
                </div>
            </section>
        </>
    );
}
