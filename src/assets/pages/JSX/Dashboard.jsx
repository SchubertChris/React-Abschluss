import React, { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import { FaChartBar, FaTasks, FaUsers, FaCog, FaCloudSun, FaNewspaper, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import "../styles/Dashboard.scss";

const WEATHER_API_KEY = "08348b60c39f4fe7a593f787efa8f843";
const NEWS_API_KEY = "UMSE3crsBtDGk45XaX8FRetRM6zmkbNsSUOao332";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Übersicht");
  const [city, setCity] = useState("Berlin");
  const [inputCity, setInputCity] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  
  const [noteInput, setNoteInput] = useState({
    name: "",
    date: "",
    time: "",
    content: "",
    id: null,
    isImportant: false
  });

  const [savedNotes, setSavedNotes] = useState(() => {
    const saved = localStorage.getItem('savedNotes');
    return saved ? JSON.parse(saved) : [];
  });

  const [importantDates, setImportantDates] = useState(() => {
    const saved = localStorage.getItem('importantDates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    localStorage.setItem('importantDates', JSON.stringify(importantDates));
  }, [savedNotes, importantDates]);

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

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const response = await fetch(
        `https://api.thenewsapi.com/v1/news/top?api_token=${NEWS_API_KEY}&locale=de&limit=10`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        setNews(data.data);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Fehler beim Laden der News:", error);
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    fetchNews();
  }, [city]);

  const handleSaveNote = () => {
    if (noteInput.name && noteInput.date && noteInput.time && noteInput.content) {
      const newNote = {
        ...noteInput,
        timestamp: new Date(),
        id: noteInput.id || Date.now()
      };

      if (noteInput.id) {
        setSavedNotes(prev => prev.map(note => note.id === noteInput.id ? newNote : note));
        if (newNote.isImportant) {
          setImportantDates(prev => prev.map(note => note.id === noteInput.id ? newNote : note));
        }
      } else {
        setSavedNotes(prev => [...prev, newNote]);
        if (newNote.isImportant) {
          setImportantDates(prev => [...prev, newNote]);
        }
      }

      setNoteInput({
        name: "",
        date: "",
        time: "",
        content: "",
        id: null,
        isImportant: false
      });

      setSuccessMessage("Termin erfolgreich gespeichert!"); // Set success message

      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 3 seconds
      }, 3000);
    }
  };

  const handleDeleteNote = (id) => {
    setSavedNotes(prev => prev.filter(note => note.id !== id));
    setImportantDates(prev => prev.filter(note => note.id !== id));
  };

  const handleCityChange = () => {
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity("");
    }
  };

  const menuItems = [
    { icon: <FaChartBar />, label: "Übersicht" },
    { icon: <FaTasks />, label: "Termine" },
    { icon: <FaShoppingCart />, label: "Warenkorb" },
    { icon: <FaNewspaper />, label: "Nachrichten" }
  ];

  const selectedDateNotes = savedNotes.filter(note => {
    const noteDate = new Date(note.date);
    return (
      noteDate.getDate() === date.getDate() &&
      noteDate.getMonth() === date.getMonth() &&
      noteDate.getFullYear() === date.getFullYear()
    );
  });

  const todayImportantDates = importantDates.filter(note => {
    const noteDate = new Date(note.date);
    const today = new Date();
    return (
      noteDate.getDate() === today.getDate() &&
      noteDate.getMonth() === today.getMonth() &&
      noteDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="dashboard-container">
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
            <h3>Wichtige Termine Heute</h3>
            <table className="important-dates-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Uhrzeit</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {todayImportantDates.map((note) => (
                  <tr key={note.id} onClick={() => setNoteInput(note)}>
                    <td>{note.name}</td>
                    <td>{note.time} Uhr</td>
                    <td>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}>Löschen</button>
                    </td>
                  </tr>
                ))}
                {todayImportantDates.length === 0 && (
                  <tr>
                    <td colSpan="3">Keine wichtigen Termine heute</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-grid">
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

          <div className="card notes-card">
            <h3>Termine für {date.toLocaleDateString('de-DE')}</h3>
            <div className="card-content">
              <div className="notes-form">
                <input
                  type="text"
                  placeholder="Name des Termins"
                  value={noteInput.name}
                  onChange={(e) => setNoteInput(prev => ({...prev, name: e.target.value}))}
                  className="notes-input"
                />
                <input
                  type="date"
                  value={noteInput.date}
                  onChange={(e) => setNoteInput(prev => ({...prev, date: e.target.value}))}
                  className="notes-input"
                />
                <input
                  type="time"
                  value={noteInput.time}
                  onChange={(e) => setNoteInput(prev => ({...prev, time: e.target.value}))}
                  className="notes-input"
                />
                <textarea
                  placeholder="Beschreibung..."
                  value={noteInput.content}
                  onChange={(e) => setNoteInput(prev => ({...prev, content: e.target.value}))}
                  className="notes-textarea"
                />
                <div className="important-checkbox">
                  <input
                    type="checkbox"
                    id="isImportant"
                    checked={noteInput.isImportant}
                    onChange={(e) => setNoteInput(prev => ({...prev, isImportant: e.target.checked}))}
                  />
                  <label htmlFor="isImportant">Wichtiger Termin</label>
                </div>
              </div>
            </div>
            <div className="saveTodo">
              <button onClick={handleSaveNote}>
                {noteInput.id ? 'Aktualisieren' : 'Merken'}
              </button>
              <hr />
            </div>
            {successMessage && (
              <div className="success-message">
                <FaCheckCircle className="success-icon" /> {successMessage}
              </div>
            )}
            <div className="saved-notes">
              {selectedDateNotes.length > 0 ? (
                selectedDateNotes.map((note) => (
                  <div key={note.id} className="note-item">
                    <h5>{note.name} {note.isImportant && '⭐'}</h5>
                    <p>{note.time} Uhr</p>
                    <p>{note.content}</p>
                    <div className="note-actions">
                      <button onClick={() => setNoteInput(note)}>Bearbeiten</button>
                      <br />
                      <button onClick={() => handleDeleteNote(note.id)}>Löschen</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Keine Termine für diesen Tag.</p>
              )}
            </div>
          </div>

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
                      {article.image_url && (
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
