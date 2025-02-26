import React, { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import {
  FaChartBar,
  FaTasks,
  FaUsers,
  FaCog,
  FaCloudSun,
  FaNewspaper,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import "../styles/Dashboard.scss";
import { useNavigate } from "react-router-dom";

const WEATHER_API_KEY = "08348b60c39f4fe7a593f787efa8f843";
const NEWS_API_KEY = "UMSE3crsBtDGk45XaX8FRetRM6zmkbNsSUOao332";

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [date, setDate] = useState(new Date());
  const [news, setNews] = useState([]); // News-Array
  const [loadingNews, setLoadingNews] = useState(true); // Lade-Status
  const [inputCity, setInputCity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState("Übersicht");
  const [weather, setWeather] = useState({
    Havana: null,
    Berlin: null,
  });

  const [cityInputs, setCityInputs] = useState({
    Havana: "Havana",
    Berlin: "Berlin",
  });

  const [noteInput, setNoteInput] = useState({
    name: "Neuer Termin",
    date: new Date().toISOString().split("T")[0], // Setzt das aktuelle Datum als Default
    time: "00:00",
    content: "",
    id: null,
    isImportant: false,
  });

  const [savedNotes, setSavedNotes] = useState(() => {
    const saved = localStorage.getItem("savedNotes");
    return saved ? JSON.parse(saved) : []; // Wenn Daten vorhanden, dann laden, sonst leeres Array
  });

  const [importantDates, setImportantDates] = useState(() => {
    const saved = localStorage.getItem("importantDates"); // Wichtige Termine laden
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    localStorage.setItem("importantDates", JSON.stringify(importantDates));
  }, [savedNotes, importantDates]); // Speichert die Termine in den LocalStoraged

  const fetchWeatherForCity = async (cityKey) => {
    const API_KEY = "08348b60c39f4fe7a593f787efa8f843";
    const cityName = cityInputs[cityKey]; // Holt den aktuellen Stadt-Namen aus dem Input

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather((prev) => ({ ...prev, [cityKey]: data }));
      } else {
        alert("Stadt nicht gefunden!");
      }
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
    Object.keys(weather).forEach((cityKey) => fetchWeatherForCity(cityKey));
    fetchNews();
  }, []);

  const resetForm = () => {
    setNoteInput({
      name: "",
      date: new Date().toISOString().split("T")[0], // Wieder aktuelles Datum setzen
      time: "00:00",
      content: "",
      id: null,
      isImportant: false,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEditNote = (note) => {
    setNoteInput({
      ...note,
      date: note.date,
      time: note.time,
    });
    setIsEditing(true);
    setEditingId(note.id);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleSaveNote = () => {
    if (
      noteInput.name &&
      noteInput.date &&
      noteInput.time &&
      noteInput.content
    ) {
      const newNote = {
        ...noteInput,
        timestamp: new Date(),
        id: noteInput.id || Date.now(), // Wenn ID vorhanden, dann behalten, sonst aktuelle Zeit
      };

      if (isEditing) {
        setSavedNotes((prev) =>
          prev.map((note) => (note.id === editingId ? newNote : note))
        );

        if (newNote.isImportant) {
          setImportantDates((prev) => {
            const filtered = prev.filter((note) => note.id !== editingId);
            return [...filtered, newNote];
          });
        } else {
          setImportantDates((prev) =>
            prev.filter((note) => note.id !== editingId)
          );
        }
      } else {
        setSavedNotes((prev) => [...prev, newNote]);
        if (newNote.isImportant) {
          setImportantDates((prev) => [...prev, newNote]);
        }
      }

      setSuccessMessage(
        isEditing ? "Termin aktualisiert!" : "Termin gespeichert!"
      );
      resetForm();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Möchten Sie diesen Termin wirklich löschen?")) {
      setSavedNotes((prev) => prev.filter((note) => note.id !== id));
      setImportantDates((prev) => prev.filter((note) => note.id !== id));

      if (editingId === id) {
        resetForm();
      }

      setSuccessMessage("Termin erfolgreich gelöscht!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
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
    { icon: <FaShoppingCart />, label: "Shop" },
    { icon: <FaNewspaper />, label: "Nachrichten" },
  ];

  const selectedDateNotes = savedNotes.filter((note) => {
    const noteDate = new Date(note.date);
    return (
      noteDate.getDate() === date.getDate() &&
      noteDate.getMonth() === date.getMonth() &&
      noteDate.getFullYear() === date.getFullYear()
    );
  });

  useEffect(() => {
    if (activeMenuItem === "Shop") {
      navigate("/shop");
    }
  }, [activeMenuItem, navigate]);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-content">
          <hr />
          <h2>Dashboard</h2>
          <nav className="sidebar-nav">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`nav-item ${
                  activeMenuItem === item.label ? "active" : ""
                }`}
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
            <h3>Termine Heute </h3>
            <p>Wichtige Termine sind mit ⭐ markiert</p>
            <br />
            <table className="important-dates-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Uhrzeit</th>
                  <th>Beschreibung</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {selectedDateNotes.map((note) => (
                  <tr
                    key={note.id}
                    className={note.isImportant ? "important-note" : ""}
                  >
                    <td>
                      {note.name} {note.isImportant && "⭐"}
                    </td>
                    <td>{note.time}</td>
                    <td>{note.content}</td>
                    <td>
                      <button onClick={() => handleEditNote(note)}>
                        Bearbeiten
                      </button>
                      <button onClick={() => handleDeleteNote(note.id)}>
                        Löschen
                      </button>
                    </td>
                  </tr>
                ))}

                {selectedDateNotes.length === 0 && (
                  <tr>
                    <td colSpan="4">Keine Termine für diesen Tag</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-grid">
          <div
            className={`card weather-card ${
              activeMenuItem === "Termine" || activeMenuItem === "Nachrichten"
                ? "hidden"
                : ""
            }`}
          >
            <h3>
              <FaCloudSun className="card-icon" /> Wetter Übersicht
            </h3>
            <div className="card-content">
              <div className="weather-multi">
                {Object.keys(weather).map((cityKey) => (
                  <div key={cityKey} className="weather-info">
                    {weather[cityKey] ? (
                      <>
                        <h4>{weather[cityKey].name}</h4>
                        <div className="weather-main">
                          <div className="temperature">
                            {Math.round(weather[cityKey].main.temp)}°C
                          </div>
                          <img
                            src={`https://openweathermap.org/img/wn/${weather[cityKey].weather[0].icon}@2x.png`}
                            alt={weather[cityKey].weather[0].description}
                            className="weather-icon"
                          />
                        </div>
                        <div className="description">
                          {weather[cityKey].weather[0].description}
                        </div>
                        <div className="weather-details">
                          <div className="detail-item">
                            <span>Luftfeuchtigkeit</span>
                            <span>{weather[cityKey].main.humidity}%</span>
                          </div>
                          <div className="detail-item">
                            <span>Wind</span>
                            <span>
                              {Math.round(weather[cityKey].wind.speed)} m/s
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="loading">Lade Wetterdaten...</div>
                    )}

                    {/* Stadt ändern */}
                    <div className="city-input">
                      <input
                        type="text"
                        placeholder="Stadt eingeben"
                        value={cityInputs[cityKey]}
                        onChange={(e) =>
                          setCityInputs((prev) => ({
                            ...prev,
                            [cityKey]: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <button
                      className="submit-city"
                      onClick={() => fetchWeatherForCity(cityKey)}
                    >
                      Aktualisieren
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`card notes-card ${
              activeMenuItem === "Termine" ? "notes-expanded" : ""
            } ${activeMenuItem === "Nachrichten" ? "hidden" : ""}`}
          >
            <h3>Termine für {date.toLocaleDateString("de-DE")}</h3>
            <div className="card-content">
              <div className="notes-form">
                <input
                  type="text"
                  placeholder="Name des Termins"
                  value={noteInput.name}
                  onChange={(e) =>
                    setNoteInput((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="notes-input-name"
                />
                <input
                  type="date"
                  value={noteInput.date}
                  onChange={(e) =>
                    setNoteInput((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="notes-input-date"
                />
                <input
                  type="time"
                  value={noteInput.time}
                  onChange={(e) =>
                    setNoteInput((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="notes-input-time"
                />
                <textarea
                  placeholder="Notitzen..."
                  value={noteInput.content}
                  onChange={(e) =>
                    setNoteInput((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="notes-textarea"
                />
                <div className="important-checkbox">
                  <input
                    type="checkbox"
                    id="isImportant"
                    checked={noteInput.isImportant}
                    onChange={(e) =>
                      setNoteInput((prev) => ({
                        ...prev,
                        isImportant: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="isImportant"> Wichtiger Termin ? ⭐</label>
                </div>
              </div>
            </div>
            <div className="saveTodo">
              <div className="button-group">
                <button onClick={handleSaveNote} className="save-button">
                  {isEditing ? "Aktualisieren" : "Speichern"}
                </button>
                <h3>Alle Termine</h3>
                {isEditing && (
                  <button onClick={handleCancelEdit} className="cancel-button">
                    Abbrechen
                  </button>
                )}
              </div>
              <hr />
            </div>
            {successMessage && (
              <div className="success-message">
                <FaCheckCircle className="success-icon" /> {successMessage}
              </div>
            )}

            <div className="saved-notes">
              {savedNotes.length > 0 ? (
                savedNotes
                  .sort((a, b) => {
                    const dateA = new Date(`${a.date}T${a.time}`);
                    const dateB = new Date(`${b.date}T${b.time}`);
                    return dateA - dateB;
                  })
                  .map((note) => (
                    <div
                      key={note.id}
                      className={`note-item ${
                        editingId === note.id ? "editing" : ""
                      }`}
                    >
                      <p>Termin kann bearbeitet oder gelöscht werden</p>
                      <h5>
                        {note.name} {note.isImportant && "⭐"}
                      </h5>
                      <p>{new Date(note.date).toLocaleDateString("de-DE")}</p>
                      <p>{note.time} </p>
                      <p>{note.content}</p>
                      <div className="note-actions">
                        <button
                          onClick={() => handleEditNote(note)}
                          className="edit-button"
                          disabled={isEditing && editingId !== note.id}
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="delete-button"
                          disabled={isEditing && editingId !== note.id}
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p>Keine Termine für diesen Tag.</p>
              )}
            </div>
          </div>

          <div
            className={`card news-card ${
              activeMenuItem === "Nachrichten" ? "news-expanded" : ""
            }`}
          >
            <h3>
              <FaNewspaper className="card-icon" /> Aktuelle News
            </h3>
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
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="news-image"
                        />
                      )}
                      <h4>{article.title}</h4>
                      {article.description && <p>{article.description}</p>}
                      <span className="news-source">
                        {article.source || "Unbekannte Quelle"}
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="no-content">
                    Keine aktuellen News verfügbar.
                  </div>
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
