import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const WEATHER_API_KEY = "08348b60c39f4fe7a593f787efa8f843";
const NEWS_API_KEY = "UMSE3crsBtDGk45XaX8FRetRM6zmkbNsSUOao332";

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Berlin");
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [savedNotes, setSavedNotes] = useState([]);
  const [importantDates, setImportantDates] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const dummyUser = {
    email: "chris@schubert.com",
    password: "123456",
  };

  // Wetter abrufen
  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Fehler beim Laden der Wetterdaten:", error);
    }
  };

  // News abrufen
  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const response = await fetch(
        `https://api.thenewsapi.com/v1/news/top?api_token=${NEWS_API_KEY}&locale=de&limit=10`
      );
      if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      const data = await response.json();
      setNews(data.data || []);
    } catch (error) {
      console.error("Fehler beim Laden der News:", error);
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };

  // Dummy-Login-Funktion
  const login = (email, password) => {
    if (email === dummyUser.email && password === dummyUser.password) {
      setIsAuthenticated(true);
      navigate("/account-dashboard"); // Nach Login direkt weiterleiten
    } else {
      alert("Falsche Login-Daten");
    }
  };

  // Logout-Funktion
  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login-register");
  };

  useEffect(() => {
    fetchWeather(city);
    fetchNews();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        weather,
        city,
        setCity,
        news,
        savedNotes,
        setSavedNotes,
        importantDates,
        setImportantDates,
        cartItems,
        setCartItems,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
