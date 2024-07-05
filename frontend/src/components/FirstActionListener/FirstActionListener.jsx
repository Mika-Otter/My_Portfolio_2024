import React, { useEffect, useState } from "react";

export default function FirstActionListener() {
  const [firstAction, setFirstAction] = useState(false);

  useEffect(() => {
    const handleFirstAction = () => {
      setFirstAction(true);
    };
    window.addEventListener("wheel", handleFirstAction);
    window.addEventListener("keydown", handleFirstAction);
    return () => {
      window.removeEventListener("click", handleFirstAction);
    };
  });
}
