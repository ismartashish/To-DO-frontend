import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default ThemeToggle;
