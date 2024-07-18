import React, { useState, useEffect } from "react";
import s from "./Location.module.scss";

export default function Location() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, "0");

  return (
    <div className={s.location}>
      <p>
        South of France, {hours}:{minutes}
      </p>
    </div>
  );
}
