import React, { useState } from "react";
import "../styles.css";

const Dark = () => {
  const [theme, setTheme] = useState({ background: "light" });
  const setter = () => {
    theme === { background: "light" }
      ? setTheme({ background: "dark" })
      : setTheme({ background: "light" });
  };
  return (
    <>
      <div>
        <button onClick={setter}>Dark Mode</button>
      </div>
    </>
  );
};

export default Dark;
