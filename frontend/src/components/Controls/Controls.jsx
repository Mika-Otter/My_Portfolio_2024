import React from "react";
import s from "./Controls.module.scss";

export default function Controls({ handleControls }) {
    return (
        <>
            <section className={s.controls__blur}>
                <div className={s.controls}>
                    <div className={s.controls__keyboard}>
                        <span>KEYBOARD : </span>
                        <span>QWERTY</span>
                        <span>AZERTY</span>
                    </div>

                    <div className={s.controls__content}>
                        <div className={s.controls__content__left}>
                            <div className={s.controls__content__left__runleft}>
                                <span>Run to the left</span>
                                <div className={s.controls__content__keys}>
                                    <div className={s.controls__key}>
                                        <div className={s.controls__key__front}>
                                            <span>A</span>
                                        </div>
                                        <div className={s.controls__key__back}></div>
                                    </div>
                                    <span>OR</span>
                                    <div className={s.controls__key}>
                                        <div className={s.controls__key__front}>
                                            <span>{"<-"}</span>
                                        </div>
                                        <div className={s.controls__key__back}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.controls__content__left__interact}>
                                <span>Try to interact</span>
                                <div className={s.controls__key}>
                                    <div className={s.controls__key__front}>
                                        <span>Z</span>
                                    </div>
                                    <div className={s.controls__key__back}></div>
                                </div>
                            </div>
                        </div>
                        <div className={s.controls__content__center}>
                            <img src="/fake-control.png" alt="fakevideo" />
                        </div>
                        <div className={s.controls__content__right}>
                            <div className={s.controls__content__right__runright}>
                                <span>Run to the right</span>
                                <div className={s.controls__key}>
                                    <div className={s.controls__key__front}>
                                        <span>D</span>
                                    </div>
                                    <div className={s.controls__key__back}></div>
                                </div>
                                <span>OR</span>
                                <div className={s.controls__key}>
                                    <div className={s.controls__key__front}>
                                        <span>{"->"}</span>
                                    </div>
                                    <div className={s.controls__key__back}></div>
                                </div>
                            </div>
                            <div className={s.controls__content__right__space}>
                                <div className={s.controls__space}>
                                    <div className={s.controls__space__front}>
                                        <span>SPACE</span>
                                    </div>
                                    <div className={s.controls__space__back}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.controls__gotoplay}>
                        <button type="button" onClick={() => handleControls()}>
                            GO TO PLAY !
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
