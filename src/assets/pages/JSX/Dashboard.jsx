import React, { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import { FaChartBar, FaTasks, FaUsers, FaCog, FaCloudSun, FaNewspaper } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import "../styles/Dashboard.scss";

const WEATHER_API_KEY = "08348b60c39f4fe7a593f787efa8f843"; // The Weather API Key
const NEWS_API_KEY = "UMSE3crsBtDGk45XaX8FRetRM6zmkbNsSUOao332"; // The News API Key

const Dashboard = () => {
  const [date, setDate] = useState(new Date()); // 📅 Kalender-Zustand auf heutiges Datum [(new Date())]
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]); // 📰 News-Zustand - Leeres Array als Start
  const [loadingNews, setLoadingNews] = useState(true); // Ladezustand für News [API]
  const [notes, setNotes] = useState(""); // 📝 Notizblock-Zustand - Start Leer
  const [savedNotes, setSavedNotes] = useState([]); // Zustand für gespeicherte Notizen
  const [activeMenuItem, setActiveMenuItem] = useState("Übersicht");
  const [city, setCity] = useState("Berlin"); // Start-Stadt für WetterAnzeige
  const [inputCity, setInputCity] = useState(""); // Eingabe-Stadt für WetterAnzeige um später zu aktualisieren als User

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
        );
        const data = await response.json();
        console.log("Wetterdaten:", data); // Debugging
        setWeather(data);
      } catch (error) {
        console.error("Fehler beim Laden der Wetterdaten:", error);
      }
    };

    const fetchNews = async () => {
      console.log("Fetching News...");
      setLoadingNews(true);
      try {
        const response = await fetch( // Abrufen der News-API
          `https://api.thenewsapi.com/v1/news/top?api_token=${NEWS_API_KEY}&locale=de&limit=10` 
        );
        
        if (!response.ok) { // Fehlerbehandlung, wenn die API nicht erreichbar ist
          throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }

        const data = await response.json(); // Antwort in JSON umwandeln
        console.log("News API Response:", data);

        if (data.data && Array.isArray(data.data)) {
          setNews(data.data);
        } else {
          console.error("Keine News gefunden.");
          setNews([]);
        }
      } catch (error) { // Fehlerbehandlung, wenn die API nicht erreichbar ist, wird der Fehler in der Konsole ausgegeben und kann weiter untersucht werden
        console.error("Fehler beim Laden der News:", error);
        setNews([]);
      } finally { // Wenn die API-Anfrage abgeschlossen ist, wird der Ladezustand auf "false" gesetzt, damit der Benutzer weiß, dass die News geladen wurden und Sie sehen kann 
        setLoadingNews(false);
      }
    };

    fetchWeather(); // Funktionen aufrufen
    fetchNews();
  }, [city]); // Wenn sich die Stadt ändert, wird die Wetter-API erneut aufgerufen übergeben als parameter


  // Hier wird die Funktion handleSaveNote definiert, die die Notizen speichert, wenn der Benutzer auf die Schaltfläche "Merken" klickt und Sie werden gespeichert
  const handleSaveNote = () => {
    if (notes.trim()) { // Werden Sie hier getrennt? Wenn ja, wird die Notiz gespeichert und der Notizblock wird geleert mit setNotes("")
      setSavedNotes([...savedNotes, notes]);
      setNotes("");
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(newNotes);
  };

  const handleCityChange = () => {
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity("");
    }
  };

  const menuItems = [
    { icon: <FaChartBar />, label: "Übersicht" },
    { icon: <FaTasks />, label: "Aufgaben" },
    { icon: <FaUsers />, label: "Benutzer" },
    { icon: <FaCog />, label: "Einstellungen" }
  ];

  return (
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <h2>Dashboard</h2>
            <nav className="sidebar-nav">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`nav-item ${activeMenuItem === item.label ? "active" : ""}`}
                  onClick={() => setActiveMenuItem(item.label)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="sidebar-calendar">
              <Calendar onChange={setDate} value={date} />
            </div>
            <div className="Wichtige">
              <h3>Wichtige Termine</h3>
              <table className="important-dates-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Datum & Uhrzeit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Meeting mit Team</td>
                    <td>12.10.2023, 10:00 Uhr</td>
                  </tr>
                  <tr>
                    <td>Projekt-Abgabe</td>
                    <td>15.10.2023, 15:00 Uhr</td>
                  </tr>
                  <tr>
                    <td>Wartung</td>
                    <td>20.10.2023, 08:00 Uhr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-grid">
            {/* Weather Card */}
            <div className="card weather-card">
              <h3><FaCloudSun className="card-icon" /> Wetter in {city}</h3>
              <div className="card-content">
                {weather ? (
                  <div className="weather-info">
                    <div className="weather-main">
                      <div className="temperature">
                        {Math.round(weather.main.temp)}°C
                      </div>
                      <img 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        className="weather-icon"
                      />
                    </div>
                    <div className="description">
                      {weather.weather[0].description}
                    </div>
                    <div className="weather-details">
                      <div className="detail-item">
                        <span>Luftfeuchtigkeit</span>
                        <span>{weather.main.humidity}%</span>
                      </div>
                      <div className="detail-item">
                        <span>Wind</span>
                        <span>{Math.round(weather.wind.speed)} m/s</span>
                      </div>
                      <div className="city-input">
                  <input
                    type="text"
                    placeholder="Stadt eingeben"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                  />
                </div>
                  <button className="submit-city" onClick={handleCityChange}>Aktualisieren</button>
                    </div>
                  </div>
                ) : (
                  <div className="loading">Lade Wetterdaten...</div>
                )}
              </div>
            </div>

            {/* Notes Card (Notizblock) */}
            <div className="card notes-card">
              <h3>Notizen</h3>
              <div className="card-content">
                <textarea
                  placeholder="Schreibe deine Notizen hier..."
                  className="notes-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="saveTodo">
                <button onClick={handleSaveNote}>Merken</button>
                <hr />
              </div>
              <div className="saved-notes">
                {savedNotes.map((note, index) => (
                  <div key={index} className="note-item">
                    <p>{note}</p>
                    <button onClick={() => handleDeleteNote(index)}>Löschen</button>
                  </div>
                ))}
              </div>
            </div>

            {/* News Card */}
            <div className="card news-card">
              <h3><FaNewspaper className="card-icon" /> Aktuelle News</h3>
              <div className="card-content">
                <div className="news-list">
                {loadingNews ? (
                  <div className="loading">Lade News...</div>
                ) : news.length > 0 ? (
                  news.map((article, index) => (
                    <a
                      key={index}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="news-item"
                    >
                      {article.image_url && ( // Falls ein Bild existiert, wird es angezeigt
                        <img src={article.image_url} alt={article.title} className="news-image" />
                      )}
                      <h4>{article.title}</h4>
                      {article.description && <p>{article.description}</p>}
                      <span className="news-source">
                        {article.source || 'Unbekannte Quelle'}
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="no-content">Keine aktuellen News verfügbar.</div>
                )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default Dashboard;
