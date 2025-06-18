import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      setIsDark(true);
    } else {
      document.body.setAttribute("data-theme", "light");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const darkModeEnabled = e.target.checked;
    setIsDark(darkModeEnabled);

    document.body.setAttribute("data-theme", darkModeEnabled ? "dark" : "light");
    localStorage.setItem("theme", darkModeEnabled ? "dark" : "light");
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={isDark}
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
