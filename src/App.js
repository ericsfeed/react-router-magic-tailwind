import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ProtectedPage from "./components/ProtectedPage";
import PrivateElement from "./components/PrivateElement";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />

      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="about" element={<AboutPage />}></Route>
          <Route
            path="protected"
            element={
              <PrivateElement>
                <ProtectedPage x={1} />
              </PrivateElement>
            }
          ></Route>
          <Route path="login" element={<LoginPage />}></Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}




export const NotFoundPage = () => {
  return <div>This is a 404 page</div>;
};

export default App;
