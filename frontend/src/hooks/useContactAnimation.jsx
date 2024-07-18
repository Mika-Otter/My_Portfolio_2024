import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function useContactAnimation(contactRef, contact) {
  const tlContact = useRef();

  useEffect(() => {
    tlContact.current = gsap.timeline({ paused: true, ease: "power3.out" });
    const { width } = contactRef.current.getBoundingClientRect();
    tlContact.current.to(contactRef.current, {
      x: `-${width + width / 175}`,
      duration: 1,
    });
  }, []);

  useEffect(() => {
    const animation = contact
      ? tlContact.current.play()
      : tlContact.current.reverse();

    return () => {
      animation.kill();
    };
  }, [contact]);
}
