import { useContext } from "react";
import { HiMoon } from "react-icons/hi";
import { MdWbSunny } from "react-icons/md";
import ThemeContext from "../../../context/theme/ThemeContext";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div role="button" className="theme-button switcher" onClick={toggleTheme}>
      {theme === "light" ? <MdWbSunny /> : <HiMoon />}
    </div>
  );
};

export default ThemeSwitcher;
