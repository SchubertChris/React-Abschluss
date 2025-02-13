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

  // Wetter API abrufen
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

  // News API abrufen
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
    navigate("/login-register"); // Button erstellen
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
        darkMode, // Dark Mode aktiviert oder nicht
        setDarkMode, // Funktion zum Setzen des Dark Mode
        weather, // Wetterdaten
        city, // Stadt für die Wetterdaten
        setCity, // Funktion zum Setzen der Stadt
        news, // News
        savedNotes, // Gespeichert Notizen
        setSavedNotes, // Funktion zum Setzen der gespeicherten Notizen
        importantDates, // Wichtige Termine importieren
        setImportantDates, // Funktion zum Setzen der wichtigen Termine
        cartItems, // Artikel im Warenkorb
        setCartItems, // Funktion zum Setzen der Artikel im Warenkorb
        isAuthenticated, // Ist der Benutzer eingeloggt?
        login, // Funktion zum Einloggen
        logout, // Funktion zum Ausloggen - MUSS NOCH UMGESETZT werden bzw erweitert werden
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
