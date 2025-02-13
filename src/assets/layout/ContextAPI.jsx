import React, { createContext, useState, useEffect } from "react";
<<<<<<< HEAD

// Context erstellen
export const AppContext = createContext();

const WEATHER_API_KEY = "08348b60c39f4fe7a593f787efa8f843"; // The Weather API Key
const NEWS_API_KEY = "UMSE3crsBtDGk45XaX8FRetRM6zmkbNsSUOao332"; // The News API Key

export const AppProvider = ({ children }) => {
  // Dark Mode Zustand
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  // Wetter Zustand
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Berlin");

  // News Zustand
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // Termine Zustand
  const [savedNotes, setSavedNotes] = useState([]);
  const [importantDates, setImportantDates] = useState([]);

  // Warenkorb Zustand
  const [cartItems, setCartItems] = useState([]);

  // Dark Mode beim Laden setzen
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
=======
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
    email: "test@dummy.com",
    password: "123456",
  };
>>>>>>> 8ed6fbb (Erneut Hochladen nach Crash)

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
<<<<<<< HEAD

      if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);

=======
      if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);
>>>>>>> 8ed6fbb (Erneut Hochladen nach Crash)
      const data = await response.json();
      setNews(data.data || []);
    } catch (error) {
      console.error("Fehler beim Laden der News:", error);
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };

<<<<<<< HEAD
  // Stadt ändern und Wetter aktualisieren
  const updateCity = (newCity) => {
    setCity(newCity);
    fetchWeather(newCity);
  };

  // Termin speichern
  const saveNote = (note) => {
    setSavedNotes((prev) => [...prev, note]);
    setImportantDates((prev) => [...prev, note]);
  };

  // Termin löschen
  const deleteNote = (id) => {
    setSavedNotes((prev) => prev.filter((note) => note.id !== id));
    setImportantDates((prev) => prev.filter((note) => note.id !== id));
  };

  // Produkt zum Warenkorb hinzufügen
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Produktmenge im Warenkorb aktualisieren
  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
=======
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
>>>>>>> 8ed6fbb (Erneut Hochladen nach Crash)
  };

  useEffect(() => {
    fetchWeather(city);
    fetchNews();
  }, []);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        weather,
        city,
<<<<<<< HEAD
        updateCity,
        news,
        loadingNews,
        saveNote,
        deleteNote,
=======
        setCity,
        news,
>>>>>>> 8ed6fbb (Erneut Hochladen nach Crash)
        savedNotes,
        importantDates,
        cartItems,
        setCartItems,
<<<<<<< HEAD
        addToCart,
        updateCartQuantity,
=======
        savedNotes,
        importantDates,
        cartItems,
        isAuthenticated,
        login,
        logout,
>>>>>>> 8ed6fbb (Erneut Hochladen nach Crash)
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
