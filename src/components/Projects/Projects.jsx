import React, { useState, useEffect, useRef } from "react";
import s from "./Projects.module.scss";
import { ProjectsBoxSVG } from "../SVG/ProjectsBoxSVG";
import { GoToExpSVG } from "../SVG/GoToExpSVG";
import { CrossSVG } from "../SVG/CrossSVG";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/all";
import Project from "./Project/Project";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const [isProjectOpen, setIsProjectOpen] = useState(false);
    const intervalRef = useRef();

    const items = [
        {
            title: "Antoine Lichtenberg ",
            smalltext: "  Decorator",
            year: "2024",
            url: "./fake-project-archi.png",
            alt: "Antoine Lichtenberg",
            text:
                "I created a portfolio for Antoine Lichtenberg, a former architect who is now moving" +
                " into film decoration. I enjoyed continuing to explore GSAP and responding to a first concrete project," +
                " for a client who had a wish and desires that I had to follow. I'm very excited to be working for inspiring people. ",
            techno: "React, GSAP",
            client: "Antoine Lichtenberg Decorator",
        },
        {
            title: "Booball ",
            smalltext: "  Small Game with a boo",
            year: "2024",
            url: "./fake-project-booball.png",
            alt: "Booball",
            text:
                "When I learnt about canvas elements in html, I made this little animation." +
                " Basically just a decorative element. Later, I had the idea of turning it into a simple, fun game.",
            techno: "Javascript POO, canvas html element",
            client: "Personnal",
        },
        {
            title: "DNSEP2021 ",
            smalltext: "  Art diploma exhibition",
            year: "2024",
            url: "./fake-project-dnsep2021.png",
            alt: "DNSEP2021",
            text:
                " DNSEP 2021 is a website who summarize my practice in art school. " +
                "More precisely my exibition-diploma in June 2021." +
                " I had fun to use GSAP and have again a lot of idea for improve that. Currently stopped" +
                "for progress with other sites.",
            techno: "React, GSAP",
            client: "Personnal",
        },
        {
            title: "Typpov ",
            smalltext: "  Ri7 Final Exam Project, typographie tool",
            year: "2024",
            url: "./fake-project-typpov.png",
            alt: "Typpov",
            text:
                " I had to do a project for my degree at Ri7. I was engulfed in a multitude of folders where I stored" +
                " all my typefaces. But it was a bloody mess. So I had the idea of developing a tool to classify fonts. And" +
                " also to test them from different angles. You can create an account, log in and upload your favourite" +
                " fonts. I still have many ideas for features to develop, but for the moment I'm concentrating on my projects in Three.js. ",
            techno: "React, GSAP, Node.js, MySQL, Prisma, JWT",
            client: "School Project",
        },

        {
            title: "Platform Game ",
            smalltext: "  Personal Game",
            year: "2023",
            url: "./fake-project-platform.png",
            alt: "Platform Game",
            text: "While learning OOP in JS, I created a little platform game. I learned a lot thanks to Frank Laboratory on youtube. ",
            techno: "Javascript POO, canvas html element",
            client: "Personnal",
        },
        {
            title: "UNEXPECTED Studio ",
            smalltext: "  Design",
            year: "2023",
            url: "./fake-project-unexpected.png",
            alt: "UNEXPECTEDStudio",
            text:
                "I produced a proposal for the redesign of the Unexpected Studio website. I followed their graphic guidelines" +
                " to come up with something that suited their world and the market. I loved working on a real project.  ",
            techno: "Figma, Adobe Illustrator, Adobe Photoshop",
            client: "Personnal project to be sent to UNEXPECTEDStudio ",
        },
        {
            title: "Various Game ",
            smalltext: "  Morpion, Puissance4, Pendu, Labyrinth",
            year: "2023",
            url: "./fake-project-variousgame.png",
            alt: "Various Games",
            text:
                "A series of little games that helped me learn the basics of Javascript at the Ri7 school." +
                " The maze is coded in PHP, I couldn't stand the constant refreshes so I used SQL queries. Without realising it, I had just" +
                " created my first API. Although it was pointless, it was a great learning experience. ",
            techno: "Javascript, PHP",
            client: "School Project",
        },
    ];
    const viewRefs = useRef(items.map(() => React.createRef()));

    const openProject = () => {
        setIsProjectOpen(true);
    };

    const closeProject = () => {
        setIsProjectOpen(false);
    };

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
        console.log(isProjectOpen);
    }, [isProjectOpen]);

    useGSAP(() => {
        const currentElement = viewRefs.current[currentIndex].current;
        const parentElement = currentElement.parentElement;
        const lastChild = parentElement.lastChild;

        // console.log(currentElement);

        if (currentElement !== undefined) {
            parentElement.appendChild(currentElement);
            gsap.set(currentElement, { height: "0%" });
            gsap.to(currentElement, {
                height: "80%",
                duration: 2,
                ease: "power2.inOut",
            });
        }
    }, [currentIndex]);

    useEffect(() => {
        if (!isHover && !isProjectOpen) {
            intervalRef.current = setInterval(moveHover, 9000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isHover, isProjectOpen]);

    useEffect(() => {
        console.log(currentIndex);
    }, [currentIndex]);

    return (
        <>
            <section className={s.projects}>
                <div className={s.projects__box}>
                    <h2>VIEW PROJECTS</h2>
                    <div className={s.projects__box__content}>
                        <div className={s.projects__box__content__view}>
                            <div className={s.projects__box__content__view__ctn}>
                                {items.map((item, index) => (
                                    <div
                                        className={s.projects__box__content__view__ctn__img}
                                        ref={viewRefs.current[index]}
                                        key={index}
                                    >
                                        <img
                                            src={item.url}
                                            alt={item.alt}

                                            // style={{ zIndex: items.length - index }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={s.projects__box__content__text}>
                            <div className={s.projects__box__content__text__banner}>
                                <span className={s.projects__box__content__text__banner__project}>
                                    PROJECT
                                </span>
                                <span className={s.projects__box__content__text__banner__year}>
                                    YEAR
                                </span>
                            </div>
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
                                                <span
                                                    className={
                                                        s.projects__box__content__text__projects__project__text
                                                    }
                                                >
                                                    {item.smalltext}
                                                </span>
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
                    <div className={s.projects__box__svgProjectBox}>
                        <ProjectsBoxSVG width="100%" />
                    </div>
                    <div className={s.projects__box__svgGoToExp}>
                        <GoToExpSVG width="100%" />
                    </div>
                    <div className={s.projects__box__svgCross__one}>
                        <CrossSVG />
                    </div>
                    <div className={s.projects__box__svgCross__two}>
                        <CrossSVG />
                    </div>
                </div>
                {isProjectOpen && (
                    <Project
                        item={items[currentIndex]}
                        closeProject={closeProject}
                        nextProject={nextProject}
                        isProjectOpen={isProjectOpen}
                    />
                )}
            </section>
        </>
    );
}
