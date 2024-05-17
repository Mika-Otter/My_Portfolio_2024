import React, { useRef, useState, useEffect } from "react";
import s from "./Contact.module.scss";
import cn from "classnames";
import { CrossSVG } from "../SVG/CrossSVG";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Contact({ handleContact, contact }) {
    const selectRef = useRef();
    const tlContact = useRef();
    const contactRef = useRef();
    const [selecting, setSelecting] = useState(false);
    const [choice, setChoice] = useState("SELECT ONE");

    const handleSelect = (choice) => {
        if (choice !== "SELECT ONE") {
            setChoice(choice);
        }
        setSelecting((prev) => !prev);
    };

    useGSAP(() => {
        tlContact.current = gsap.timeline({ paused: true, ease: "power3.out" });
        const { width } = contactRef.current.getBoundingClientRect();
        tlContact.current.to(contactRef.current, {
            x: `-${width}`,
            xPercent: -1,
            duration: 3,
        });
    }, []);

    useEffect(() => {
        const animation = contact
            ? tlContact.current.timeScale(5).play()
            : tlContact.current.timeScale(4).reverse();

        return () => {
            animation.kill();
        };
    }, [contact]);

    useEffect(() => {
        console.log(contact);
    }, [contact]);

    return (
        <>
            <div className={s.wrapper} ref={contactRef}>
                <div className={s.wrapper__fade}></div>
                <div className={s.contact}>
                    <div className={s.contact__close} onClick={() => handleContact()}>
                        <div className={s.contact__close__svg}>
                            <CrossSVG />
                        </div>
                        <span>CLOSE</span>
                    </div>
                    <div className={s.contact__title}>
                        <h2>CONTACT</h2>
                    </div>
                    <form className={s.contact__form}>
                        <div className={s.contact__form__firstLine}>
                            <div className={s.contact__form__firstLine__name}>
                                <label htmlFor="name">Your Name *</label>
                                <input type="text" name="name" placeholder="TYPE HERE" />
                            </div>
                            <div className={s.contact__form__firstLine__email}>
                                <label htmlFor="email">YOUR EMAIL *</label>
                                <input type="email" name="email" placeholder="TYPE HERE" />
                            </div>
                        </div>
                        <div className={s.contact__form__company}>
                            <label htmlFor="company">COMPANY NAME *</label>
                            <input type="text" name="company" placeholder="TYPE HERE" />
                        </div>
                        <div className={s.contact__form__need}>
                            <label htmlFor="need">NEED *</label>
                            <div className={s.contact__form__need__inputs}>
                                <input
                                    type="radio"
                                    name="need"
                                    id="design-develop"
                                    value="design-develop"
                                />
                                <label htmlFor="design-develop">
                                    I DESIGN <br /> & DEVELOP
                                </label>
                                <input
                                    type="radio"
                                    name="need"
                                    id="develop-only"
                                    value="develop-only"
                                />
                                <label htmlFor="develop-only">
                                    YOU DESIGN <br /> I DEVELOP
                                </label>

                                <input
                                    type="radio"
                                    name="need"
                                    id="design-only"
                                    value="design-only"
                                />

                                <label htmlFor="design-only">
                                    I DESIGN <br /> YOU DEVELOP
                                </label>
                            </div>
                        </div>
                        <div className={s.contact__form__description}>
                            <label htmlFor="description">PROJECT DESCRIPTION *</label>
                            <textarea
                                name="description"
                                placeholder="Details about your project..."
                            ></textarea>{" "}
                        </div>
                        <div className={s.contact__form__lastLine}>
                            <div className={s.contact__form__lastLine__budget}>
                                <label htmlFor="budget">BUDGET EXPECTATIONS *</label>
                                <input
                                    type="text"
                                    className={s.contact__form__lastLine__budget__hideInput}
                                    value={choice}
                                />
                                <div className={s.contact__form__lastLine__budget__button}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect("SELECT ONE")}
                                    >
                                        {choice}
                                    </button>
                                    <span
                                        className={
                                            selecting
                                                ? s.contact__form__lastLine__budget__button__span__active
                                                : s.contact__form__lastLine__budget__button__span__disable
                                        }
                                    >
                                        ▴
                                    </span>
                                </div>

                                {selecting && (
                                    <div
                                        ref={selectRef}
                                        className={s.contact__form__lastLine__budget__select}
                                    >
                                        <span onClick={(e) => handleSelect(e.target.innerText)}>
                                            LESS THAN $3K
                                        </span>
                                        <span onClick={(e) => handleSelect(e.target.innerText)}>
                                            MORE THAN $3K
                                        </span>
                                        <span onClick={(e) => handleSelect(e.target.innerText)}>
                                            MORE THAN $5K
                                        </span>
                                        <span onClick={(e) => handleSelect(e.target.innerText)}>
                                            MORE THAN $7K
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className={s.contact__form__lastLine__timeline}>
                                <label htmlFor="timeline">TIMELINE EXPECTATIONS *</label>
                                <div className={s.contact__form__lastLine__timeline__input}>
                                    <input name="timeline" type="text" placeholder="TYPE HERE" />
                                </div>
                            </div>
                        </div>
                        <div className={s.contact__form__bonus}>
                            <div className={s.contact__form__bonus__findMe}>
                                <label htmlFor="findMe">HOW YOU FIND ME ? *</label>
                                <input
                                    name="findMe"
                                    id="findMe"
                                    type="text"
                                    placeholder="TYPE HERE"
                                />
                            </div>
                            <div className={s.contact__form__bonus__favorite}>
                                <label htmlFor="favorite">FAVORITE FOOD OR ARTIST</label>
                                <input
                                    name="favorite"
                                    id="favorite"
                                    type="text"
                                    placeholder="TYPE HERE"
                                />
                            </div>
                        </div>
                        <div className={s.contact__form__button}>
                            <button type="submit">
                                <span>SEND IT</span>
                                <span>SEND IT</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
