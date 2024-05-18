import React, { useEffect, useRef } from "react";
import s from "./Video.module.scss";

export default function Video({ src, index, currentIndex }) {
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.pause();
        currentIndex === index && videoRef.current.play();
    }, [currentIndex, index]);

    return (
        <>
            <div className={s.video}>
                <video
                    ref={videoRef}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        marginBottom: "0.7rem",
                    }}
                />
            </div>
        </>
    );
}
