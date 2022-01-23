import React, { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "theme/GlobalStyle";
import theme from "theme/theme";
import Calendar from "views/Calendar";
import Home from "views/Home";
import MainTemplate from "templates/MainTemplate";
import LanguageContext from "context/LanguageContext";
import { languages } from "assets/languages";

const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

function Root() {
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(window.localStorage.getItem("darkmode")) || false);
  const [language, setLanguage] = useState(window.localStorage.getItem("language") || "en");
  const [events, setEvents] = useState([]);
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    console.log("calendars", calendars);

    if (calendars.length)
      calendars.forEach((calendar) => {
        fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            calendar.id
          )}/events?key=AIzaSyDVv5yH7agxjJT4h0VdjoS8ID7r_4rlQnM&orderBy=startTime&singleEvents=true`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.items) {
              setEvents((prevState) => [...prevState, ...formatEvents(data.items)]);
            }
          });
      });
  }, [calendars]);

  useEffect(() => {
    console.log("events", events);
  }, [events]);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";

    document.body.appendChild(script);

    const listCalendars = () => {
      fetch(`https://www.googleapis.com/calendar/v3/users/me/calendarList?key=AIzaSyDVv5yH7agxjJT4h0VdjoS8ID7r_4rlQnM`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => {
          if (res.status !== 401) {
            return res.json();
          } else {
            localStorage.removeItem("access_token");
            openSignInPopup();
          }
        })
        .then((data) => {
          if (data?.items) {
            setCalendars(formatCalendars(data.items));
          }
        });
    };

    const openSignInPopup = () => {
      window.gapi.auth2.authorize({ client_id: "40576704589-mnsu1921uft19jvgklou02tbah1vbkmt.apps.googleusercontent.com", scope: SCOPES }, (res) => {
        if (res) {
          if (res.access_token) localStorage.setItem("access_token", res.access_token);

          listCalendars();
        }
      });
    };

    const initClient = () => {
      if (!localStorage.getItem("access_token")) {
        openSignInPopup();
      } else {
        listCalendars();
      }
    };

    script.addEventListener("load", () => {
      if (window.gapi) window.gapi.load("client:auth2", initClient);
    });
  }, []);

  const formatCalendars = (list) => {
    return list.map((item) => ({
      id: item.id,
      title: item.summary,
      description: item.description,
      selected: item.selected,
      backgroundColor: item.backgroundColor,
    }));
  };

  const formatEvents = (list) => {
    return list.map((item) => ({
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
      colorId: item.colorId,
    }));
  };

  return (
    <ThemeProvider theme={theme[isDarkMode ? "dark" : "light"]}>
      <LanguageContext.Provider value={languages[language]}>
        <GlobalStyle />
        <BrowserRouter>
          <MainTemplate>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </MainTemplate>
        </BrowserRouter>
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}

export default Root;
