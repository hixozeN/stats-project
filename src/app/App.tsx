import { Link } from "react-router-dom";
import "./styles/index";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/Navbar";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <AppRouter />
      <button onClick={toggleTheme}>Change Theme</button>
    </div>
  );
};

export default App;