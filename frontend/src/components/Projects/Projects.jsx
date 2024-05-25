import React, { useState, useEffect, useRef } from "react";
import s from "./Projects.module.scss";
import { ProjectsBoxSVG } from "../SVG/ProjectsBoxSVG";
import { GoToExpSVG } from "../SVG/GoToExpSVG";
import { CrossSVG } from "../SVG/CrossSVG";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/all";
import Project from "./Project/Project";
import { ArrowSVG } from "../SVG/ArrowSVG";
import Video from "../Video/Video";

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

    const items = [
        // {
        //     title: "Antoine Lichtenberg ",
        //     smalltext: "  Decorator",
        //     year: "2024",
        //     url: "./fake-project-archi.png",
        //     alt: "Antoine Lichtenberg",
        //     text:
        //         "I created a portfolio for Antoine Lichtenberg, a former architect who is now moving" +
        //         " into film decoration. I enjoyed continuing to explore GSAP and responding to a first concrete project," +
        //         " for a client who had a wish and desires that I had to follow. I'm very excited to be working for inspiring people. ",
        //     techno: "React, GSAP",
        //     client: "Antoine Lichtenberg Decorator",
        //     type: "website",
        // },
        // {
        //     title: "Booball ",
        //     smalltext: "  Small Game with a boo",
        //     year: "2024",
        //     url: "./fake-project-booball.png",
        //     alt: "Booball",
        //     text:
        //         "When I learnt about canvas elements in html, I made this little animation." +
        //         " Basically just a decorative element. Later, I had the idea of turning it into a simple, fun game.",
        //     techno: "Javascript POO, canvas html element",
        //     client: "Personnal",
        //     type: "game",
        // },
        {
            title: "DNSEP2021 ",
            smalltext: "  Art diploma exhibition",
            year: "2024",
            url: "./src/assets/video/DNSEP.mp4",
            alt: "DNSEP2021",
            text:
                " DNSEP 2021 is a website who summarize my practice in art school. " +
                "More precisely my exibition-diploma in June 2021." +
                " I had fun to use GSAP and have again a lot of idea for improve that. Currently stopped" +
                "for progress with other sites.",
            techno: "React, GSAP",
            client: "Personnal",
            type: "website",
            img1: "/project-dnsep/dnsep-1.webp",
            img2: "/project-dnsep/dnsep-2.webp",
            img3: "/project-dnsep/dnsep-3.webp",
            img4: "/project-dnsep/dnsep-4.webp",
            img5: "/project-dnsep/dnsep-5.webp",
            img6: "/project-dnsep/dnsep-6.webp",
            img7: "/project-dnsep/dnsep-7.webp",
            img8: "/project-dnsep/dnsep-8.webp",
        },
        {
            title: "Typpov ",
            smalltext: "  Ri7 Final Exam Project, typographie tool",
            year: "2024",
            url: "./src/assets/video/Typpov-Low.mp4",
            alt: "Typpov",
            text:
                " I had to do a project for my degree at Ri7. I was engulfed in a multitude of folders where I stored" +
                " all my typefaces. But it was a bloody mess. So I had the idea of developing a tool to classify fonts. And" +
                " also to test them from different angles. You can create an account, log in and upload your favourite" +
                " fonts. I still have many ideas for features to develop, but for the moment I'm concentrating on my projects in Three.js. ",
            techno: "Figma, React, GSAP, Node.js, MySQL, Prisma, JWT",
            client: "School Project",
            type: "website",
            img1: "/project-typpov/inprogress.png",
            img2: "/project-typpov/inprogress.png",
            img3: "/project-typpov/inprogress.png",
            img4: "/project-typpov/inprogress.png",
            img5: "/project-typpov/inprogress.png",
            img6: "/project-typpov/inprogress.png",
            img7: "/project-typpov/inprogress.png",
            img8: "/project-typpov/inprogress.png",
        },

        {
            title: "Platform Game ",
            smalltext: "  Personal Game",
            year: "2023",
            url: "./src/assets/video/Platform.mp4",
            alt: "Platform Game",
            text: "While learning OOP in JS, I created a little platform game. I learned a lot thanks to Frank Laboratory on youtube. ",
            techno: "Javascript POO, canvas html element",
            client: "Personnal Prototype",
            type: "game",
        },
        {
            title: "UNEXPECTED Studio ",
            smalltext: "  Design",
            year: "2023",
            url: "./src/assets/video/UnexpectedStudio.mp4",
            alt: "UNEXPECTEDStudio",
            text:
                "I produced a proposal for the redesign of the Unexpected Studio website. I followed their graphic guidelines" +
                " to come up with something that suited their world and the market. I loved working on a real project.  ",
            techno: "Figma, Adobe Illustrator, Adobe Photoshop",
            client: "Personnal project to be sent to UNEXPECTEDStudio ",
            type: "website",
            img1: "/project-unexpected/unexpected3.webp",
            img2: "/project-unexpected/unexpected2.webp",
            img3: "/project-unexpected/unexpected7.webp",
            img4: "/project-unexpected/unexpected4.webp",
            img5: "/project-unexpected/unexpected5.webp",
            img6: "/project-unexpected/unexpected8.webp",
            img7: "/project-unexpected/unexpected6.webp",
            img8: "/project-unexpected/unexpected1.webp",
        },
        {
            title: "Various Game ",
            smalltext: "  Morpion, Puissance4, Pendu, Labyrinth",
            year: "2023",
            url: "./src/assets/video/VariousGame.mp4",
            alt: "Various Games",
            text:
                "A series of little games that helped me learn the basics of Javascript at the Ri7 school." +
                " The maze is coded in PHP, I couldn't stand the constant refreshes so I used SQL queries. Without realising it, I had just" +
                " created my first API. Although it was pointless, it was a great learning experience. ",
            techno: "Javascript, PHP",
            client: "School Project",
            type: "game",
        },
    ];
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

    // useEffect(() => {
    //     console.log(isOpenProject);
    // }, [isOpenProject]);

    useEffect(() => {
        setLastIndex(currentIndex);
    }, [currentIndex]);

    useGSAP(() => {
        const currentElement = viewRefs.current[currentIndex].current;
        const lastElement = viewRefs.current[lastIndex].current;
        const parentElement = currentElement.parentElement;
        const randomLarge = Math.floor(Math.random() * 20) + 3;
        const randomTop = Math.floor(Math.random() * 44);
        const randomWidth = Math.floor(Math.random() * 10) + 30;
        const height = randomWidth / 0.6;
        // const randomHeight = Math.floor(Math.random() * 15) + 35;

        // console.log(currentElement);

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
                        <h2>Latest works</h2>
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
