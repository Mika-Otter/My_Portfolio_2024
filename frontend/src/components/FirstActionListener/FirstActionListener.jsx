import React, { useEffect, useState } from "react";

export default function FirstActionListener() {
  const [firstAction, setFirstAction] = useState(false);

  useEffect(() => {
    const handleFirstAction = () => {
      setFirstAction(true);
    };
    window.addEventListener("scroll", handleFirstAction);
    return () => {
      window.removeEventListener("click", handleFirstAction);
    };
  });
}
