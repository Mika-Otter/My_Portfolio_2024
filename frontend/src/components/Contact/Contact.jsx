import React, { useEffect, useRef, useState } from "react";
import s from "./Contact.module.scss";
import cn from "classnames";
import { CrossSVG } from "../SVG/CrossSVG";
import useForm from "../../hooks/useForm";
import useContactAnimation from "../../hooks/useContactAnimation";
import { CrossBlackSVG } from "../SVG/CrossBlackSVG";

const initialState = {
    name: "",
    email: "",
    company: "",
    need: "",
    description: "",
    budget: "SELECT ONE",
    timeline: "",
    findMe: "",
    favorite: "",
};

export default function Contact({ handleContact, contact }) {
    const contactRef = useRef();
    const selectRef = useRef();
    const [selecting, setSelecting] = useState(false);

    const { formData, handleChange, handleSelect, handleSubmit } = useForm(
        initialState,
        "/api/send-email"
    );

    useContactAnimation(contactRef, contact);

    return (
        <>
            <div className={s.wrapper} ref={contactRef}>
                <div className={s.wrapper__fade}></div>
                <div className={s.contact}>
                    <div className={s.contact__close} onClick={handleContact}>
                        <div className={s.contact__close__svg}>
                            <CrossBlackSVG />
                        </div>
                        <span>CLOSE</span>
                    </div>
                    <div className={s.contact__title}>
                        <h2>CONTACT</h2>
                    </div>
                    <p>
                        Hey ! I'd love to hear more about your project. Please fill in this form
                        <br /> and "Send it !" <br />
                        <br />
                        <b>Timing.</b> As a creative independant I love to work with total
                        dedication to my clients. This means that rushed timelines are not always
                        compatible with inquiries.
                        <br />
                        <br />
                        <b>Budget.</b> Budgets vary depending on the deadline, needs, the
                        deliverables and where I live when I start the project. I'm more interested
                        in projects over $2K because we can better explore the creativity and
                        customisation of your project. Please don't be discouraged from sending me a
                        message even if it's not your budget. I can be hipe if I have time and your
                        project catch me out.
                        <br />
                        <br />
                        If you have questions or are unsure if i'm a fit, please don't hesitate to
                        reach out.
                    </p>
                    <form className={s.contact__form} onSubmit={handleSubmit}>
                        <div className={s.contact__form__firstLine}>
                            <div className={s.contact__form__firstLine__name}>
                                <label htmlFor="name">Your Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="TYPE HERE"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={s.contact__form__firstLine__email}>
                                <label htmlFor="email">YOUR EMAIL *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="TYPE HERE"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={s.contact__form__company}>
                            <label htmlFor="company">COMPANY NAME *</label>
                            <input
                                type="text"
                                name="company"
                                placeholder="TYPE HERE"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={s.contact__form__need}>
                            <label htmlFor="need">NEED *</label>
                            <div className={s.contact__form__need__inputs}>
                                <input
                                    type="radio"
                                    name="need"
                                    id="design-develop"
                                    value="design-develop"
                                    onChange={handleChange}
                                />
                                <label htmlFor="design-develop">
                                    I DESIGN <br /> & DEVELOP
                                </label>
                                <input
                                    type="radio"
                                    name="need"
                                    id="develop-only"
                                    value="develop-only"
                                    onChange={handleChange}
                                />
                                <label htmlFor="develop-only">
                                    YOU DESIGN <br /> I DEVELOP
                                </label>

                                <input
                                    type="radio"
                                    name="need"
                                    id="design-only"
                                    value="design-only"
                                    onChange={handleChange}
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
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className={s.contact__form__lastLine}>
                            <div className={s.contact__form__lastLine__budget}>
                                <label htmlFor="budget">BUDGET EXPECTATIONS *</label>
                                <input
                                    type="text"
                                    className={s.contact__form__lastLine__budget__hideInput}
                                    value={formData.budget}
                                    readOnly
                                />
                                <div
                                    className={s.contact__form__lastLine__budget__button}
                                    onClick={() => setSelecting((prev) => !prev)}
                                >
                                    <button type="button">{formData.budget}</button>
                                    <span
                                        className={
                                            selecting
                                                ? s.contact__form__lastLine__budget__button__span__active
                                                : s.contact__form__lastLine__budget__button__span__disable
                                        }
                                    >
                                        ▴
                                    </span>
                                    {selecting && (
                                        <div
                                            ref={selectRef}
                                            className={s.contact__form__lastLine__budget__select}
                                            onClick={() => {
                                                setTimeout(() => {
                                                    setSelecting(false);
                                                }, 100);
                                            }}
                                        >
                                            <span
                                                onClick={() =>
                                                    handleSelect("budget", "LESS THAN $2K")
                                                }
                                            >
                                                LESS THAN $2K
                                            </span>
                                            <span
                                                onClick={() =>
                                                    handleSelect("budget", "MORE THAN $2K")
                                                }
                                            >
                                                MORE THAN $2K
                                            </span>
                                            <span
                                                onClick={() =>
                                                    handleSelect("budget", "MORE THAN $5K")
                                                }
                                            >
                                                MORE THAN $5K
                                            </span>
                                            <span
                                                onClick={() =>
                                                    handleSelect("budget", "MORE THAN $7K")
                                                }
                                            >
                                                MORE THAN $7K
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={s.contact__form__lastLine__timeline}>
                                <label htmlFor="timeline">TIMELINE EXPECTATIONS *</label>
                                <div className={s.contact__form__lastLine__timeline__input}>
                                    <input
                                        name="timeline"
                                        type="text"
                                        placeholder="TYPE HERE"
                                        value={formData.timeline}
                                        onChange={handleChange}
                                    />
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
                                    value={formData.findMe}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={s.contact__form__bonus__favorite}>
                                <label htmlFor="favorite">FAVORITE FOOD OR ARTIST</label>
                                <input
                                    name="favorite"
                                    id="favorite"
                                    type="text"
                                    placeholder="TYPE HERE"
                                    value={formData.favorite}
                                    onChange={handleChange}
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
