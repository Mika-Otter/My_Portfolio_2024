import React from "react";
import s from "./Contact.module.scss";

export default function Contact() {
    return (
        <>
            <div className={s.contact}>
                <div className={s.contact__title}>
                    <h2>CONTACT</h2>
                </div>
                <form className={s.contact__form}>
                    <div className={s.contact__form__firstLine}>
                        <div className={s.contact__form__firstLine__name}>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" placeholder="TYPE HERE" />
                        </div>
                        <div className={s.contact__form__firstLine__email}>
                            <label htmlFor="email">YOUR EMAIL</label>
                            <input type="email" name="email" placeholder="TYPE HERE" />
                        </div>
                    </div>
                    <div className={s.contact__form__company}>
                        <label htmlFor="company">COMPANY NAME</label>
                        <input type="text" name="company" placeholder="TYPE HERE" />
                    </div>
                    <div className={s.contact__form__need}>
                        <label htmlFor="need">NEED</label>
                        <div className={s.contact__form__need__inputs}>
                            <input type="checkbox" name="need" value="develop-only" />
                            <label htmlFor="need">
                                YOU DESIGN <br /> I DEVELOP
                            </label>
                            <input type="checkbox" name="need" value="design-develop" />
                            <label htmlFor="need">
                                I DESIGN <br /> & DEVELOP
                            </label>
                            <input type="checkbox" name="need" value="design-only" />

                            <label htmlFor="need">
                                I DESIGN <br /> YOU DEVELOP
                            </label>
                        </div>
                    </div>
                    <div className={s.contact__form__description}>
                        <label htmlFor="description">PROJECT DESCRIPTION</label>
                        <textarea
                            name="description"
                            placeholder="Details about your project..."
                        ></textarea>{" "}
                    </div>
                    <div className={s.contact__form__budget}>
                        <label htmlFor="budget">BUDGET EXPECTATIONS*</label>
                        <input name="budget" type="text"></input>
                        <span>$</span>
                    </div>
                    <div className={s.contact__form__timeline}>
                        <label htmlFor="timeline">TIMELINE EXPECTATIONS*</label>
                        <select name="timeline">
                            <option value="">SELECT HERE</option>
                            <option value="week">One week</option>
                            <option value="months">One month</option>
                            <option value="">FREE</option>
                        </select>
                    </div>
                    <div className={s.contact__form__button}>
                        <button type="submit">SHIP IT</button>
                    </div>
                </form>
            </div>
        </>
    );
}
