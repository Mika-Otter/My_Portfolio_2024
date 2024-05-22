import { useRef } from "react";
import gsap from "gsap";

export default function useAppTransition() {
    const overlayRef = useRef();
    const overlayOneRef = useRef();
    const overlayTwoRef = useRef();
    const overlayThreeRef = useRef();
    const overlayFourRef = useRef();

    const handleTransition = (setTransition) => {
        setTransition((prev) => !prev);
    };

    const startTransition = (transition) => {
        if (transition === true) {
            gsap.set(overlayRef.current, {
                zIndex: 30000,
            });
            const tl = gsap.timeline();
            tl.to(
                overlayOneRef.current,
                {
                    x: "100%",
                    duration: 0.9,
                    ease: "power3.inOut",
                },
                0
            )
                .to(
                    overlayTwoRef.current,
                    {
                        x: "100%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.2,
                    },
                    0
                )
                .to(
                    overlayThreeRef.current,
                    {
                        x: "100%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.4,
                    },
                    0
                )
                .to(
                    overlayFourRef.current,
                    {
                        x: "100%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.6,
                    },
                    0
                )
                .to(
                    overlayOneRef.current,
                    {
                        x: "200%",
                        duration: 0.9,
                        ease: "power3.inOut",
                    },
                    2
                )
                .to(
                    overlayTwoRef.current,
                    {
                        x: "200%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.2,
                    },
                    2
                )
                .to(
                    overlayThreeRef.current,
                    {
                        x: "200%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.4,
                    },
                    2
                )
                .to(
                    overlayFourRef.current,
                    {
                        x: "200%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.6,
                    },
                    2
                );
            setTimeout(() => {
                gsap.set(overlayRef.current, {
                    zIndex: -3,
                });
                gsap.set(overlayOneRef.current, {
                    x: "-100%",
                });
                gsap.set(overlayTwoRef.current, {
                    x: "-100%",
                });
                gsap.set(overlayThreeRef.current, {
                    x: "-100%",
                });
                gsap.set(overlayFourRef.current, {
                    x: "-100%",
                });
            }, 3500);
        }
    };

    return {
        overlayRef,
        overlayOneRef,
        overlayTwoRef,
        overlayThreeRef,
        overlayFourRef,
        handleTransition,
        startTransition,
    };
}
