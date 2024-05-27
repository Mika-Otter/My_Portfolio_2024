import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function useContactAnimation(contactRef, contact) {
    const tlContact = useRef();

    useEffect(() => {
        tlContact.current = gsap.timeline({ paused: true, ease: "power3.out" });
        const { width } = contactRef.current.getBoundingClientRect();
        const widthAdjust = width + 15;
        tlContact.current.to(contactRef.current, {
            x: `-${widthAdjust}`,
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
}
