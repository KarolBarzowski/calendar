import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "theme/GlobalStyle";
import theme from "theme/theme";
import Calendar from "views/Calendar";
import Home from "views/Home";
import MainTemplate from "templates/MainTemplate";

function Root() {
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(window.localStorage.getItem("darkmode")) || false);

  return (
    <ThemeProvider theme={theme[isDarkMode ? "dark" : "light"]}>
      <GlobalStyle />
      <BrowserRouter>
        <MainTemplate>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </MainTemplate>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Root;
