import React from "react";

const DarkMode = ({ setDarkMode, darkMode }) => {
  const styles = {
    justifyContent: darkMode === "dark" ? "flex-end" : "flex-start",
    backgroundColor: darkMode == "dark" ? "#2F2D36" : "#ff7c7c",
    border: darkMode == "dark" ? "2px solid black" : "2px solid white",
  };
  const toggleCircleStyles = {
    backgroundColor: darkMode == "dark" ? "black" : "white",
  };

  const handleDark = () => {
    setDarkMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <div className="toggle">
      <div style={styles} className="toggle-slider" onClick={handleDark}>
        <div style={toggleCircleStyles} className="toggle-circle"></div>
      </div>
    </div>
  );
};

export default DarkMode;
