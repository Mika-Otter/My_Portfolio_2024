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
    const projectsRef = useRef();
    const projectsWrapperRef = useRef();

    const intervalRef = useRef();

    const handleClickNextLevel = () => {
        setClickNextLevel((prev) => !prev);
        console.log(clickNextLevel);
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

    useEffect(() => {
        setLastIndex(currentIndex);
    }, [currentIndex]);

    useGSAP(() => {
        const currentElement = viewRefs.current[currentIndex].current;
        const parentElement = currentElement.parentElement;
        const randomLarge = Math.floor(Math.random() * 35) + 1;
        const randomTop = Math.floor(Math.random() * 40) + 4;
        const randomWidth = Math.floor(Math.random() * 5) + 42;
        const height = randomWidth / 0.6;
        // const randomHeight = Math.floor(Math.random() * 15) + 35;

        viewRefs.current.forEach((ref, index) => {
            if (index !== currentIndex)
                gsap.set(ref.current, {
                    height: "0%",
                    opacity: 0,
                });
            if (index === currentIndex) {
                parentElement.appendChild(currentElement);
                gsap.set(currentElement, {
                    left: `${randomLarge}%`,
                    top: `${randomTop}%`,
                    height: "0%",
                    width: `${randomWidth}%`,
                    opacity: 1,
                    zIndex: -1,
                });
                gsap.to(currentElement, {
                    height: `${height}%`,
                    duration: 0.8,
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

    useEffect(() => {
        console.log(currentIndex, "and last index :", lastIndex);
    }, [currentIndex]);

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
                        <div className={cn(s.projects__box__title, s.projects__box__title__latest)}>
                            <h2>Latest</h2>
                        </div>
                        <div className={cn(s.projects__box__title, s.projects__box__title__works)}>
                            <h2>works</h2>
                        </div>

                        {/* <div className={s.projects__box__title}><h2>Projects</h2> </div> */}

                        <div className={s.projects__box__content}>
                            <div className={s.projects__box__content__view}>
                                <div className={s.projects__box__content__view__ctn}>
                                    {items.map((item, index) => (
                                        <div
                                            className={s.projects__box__content__view__ctn__img}
                                            ref={viewRefs.current[index]}
                                            key={index}
                                        >
                                            <Video
                                                src={item.url}
                                                index={index}
                                                currentIndex={currentIndex}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={s.projects__box__content__text}>
                                <div className={s.projects__box__content__text__banner}></div>
                                <div className={s.projects__box__content__text__projects}>
                                    <ul>
                                        {items.map((item, index) => (
                                            <li
                                                key={index}
                                                className={index === currentIndex ? s.liHover : ""}
                                                onMouseEnter={(e) => handleMouseEnter(e, index)}
                                                onMouseLeave={(e) => handleMouseLeave(e, index)}
                                                onClick={() => openProject()}
                                            >
                                                <div
                                                    className={
                                                        s.projects__box__content__text__projects__project
                                                    }
                                                >
                                                    {item.title}
                                                    <div
                                                        className={
                                                            s.projects__box__content__text__projects__project__text
                                                        }
                                                    >
                                                        <span>{item.smalltext}</span>
                                                    </div>
                                                </div>
                                                <span
                                                    className={
                                                        s.projects__box__content__text__projects__project__year
                                                    }
                                                >
                                                    {item.year}
                                                </span>
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
                            <span> NEXT LEVEL </span>
                            <div className={s.projects__box__goToExp__arrow}>
                                <ArrowSVG color={"#091429"} />
                            </div>
                        </div>
                    </div>
                    {isOpenProject && (
                        <Project
                            item={items[currentIndex]}
                            closeProject={closeProject}
                            nextProject={nextProject}
                            index={currentIndex}
                            currentIndex={currentIndex}
                        />
                    )}
                </div>
            </section>
        </>
    );
}
