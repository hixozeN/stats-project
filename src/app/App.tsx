import { Suspense } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./styles/index";
import { useTheme } from "app/providers/ThemeProvider";
import { MainPage } from "pages/MainPage";
import { AboutPage } from "pages/AboutPage";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>Change Theme</button>
      <Link to={"/"}>Главная</Link>
      <Link to={"/about"}>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/about"} element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
