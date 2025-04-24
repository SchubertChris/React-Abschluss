import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Animation-Bibliothek für moderne UI-Effekte
import "../styles/Login.scss"; // CSS-Styles für die Login-Seite
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from "react-icons/fa";

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Partikel-Hintergrund-Effekt
  useEffect(() => {
    let canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    let ctx = canvas.getContext("2d");
    let particles = [];
    let particleCount = 100;

    // Canvas-Größe an Fenster anpassen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Partikel erstellen
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Grenzen prüfen
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Partikel initialisieren
    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Partikel verbinden
    const connectParticles = () => {
      const maxDistance = 150;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      connectParticles();
      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Fehler zurücksetzen beim Tippen
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Form-Validierung
  const validate = () => {
    let tempErrors = {};

    // Registrierungsfelder prüfen
    if (isRegistering) {
      if (!formData.firstName.trim()) {
        tempErrors.firstName = "Vorname wird benötigt";
      } else if (formData.firstName.length < 2 || formData.firstName.length > 25) {
        tempErrors.firstName = "Vorname muss zwischen 2 und 25 Zeichen lang sein";
      }

      if (!formData.lastName.trim()) {
        tempErrors.lastName = "Nachname wird benötigt";
      } else if (formData.lastName.length < 2 || formData.lastName.length > 25) {
        tempErrors.lastName = "Nachname muss zwischen 2 und 25 Zeichen lang sein";
      }

      if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = "Passwörter stimmen nicht überein";
      }
    }

    // Allgemeine Felder prüfen
    if (!formData.email.trim()) {
      tempErrors.email = "E-Mail wird benötigt";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      tempErrors.email = "E-Mail ist ungültig";
    }

    if (!formData.password) {
      tempErrors.password = "Passwort wird benötigt";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Passwort muss mindestens 6 Zeichen lang sein";
    }

    return tempErrors;
  };

  // API-Anfrage zum Backend senden
  const sendAuthRequest = async (endpoint, data) => {
    try {
      const response = await fetch(`/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ein Fehler ist aufgetreten');
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validierung ausführen
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      if (isRegistering) {
        // Registrierungsanfrage
        const { firstName, lastName, email, password } = formData;
        const registerData = { firstName, lastName, email, password };

        const result = await sendAuthRequest('register', registerData);

        setStatusMessage({
          type: "success",
          text: "Registrierung erfolgreich! Sie können sich jetzt anmelden."
        });

        // Nach erfolgreicher Registrierung zum Login wechseln
        setIsRegistering(false);
      } else {
        // Login-Anfrage
        const { email, password } = formData;
        const loginData = { email, password };

        const result = await sendAuthRequest('login', loginData);

        // Token im localStorage speichern
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userId', result.userId);

        // Zur Hauptseite navigieren
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setStatusMessage({
        type: "error",
        text: error.message || "Ein Fehler ist aufgetreten"
      });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setErrors({});
    setStatusMessage({ type: "", text: "" });
    // Formular zurücksetzen
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="auth-page">
      <canvas id="particles-canvas"></canvas>

      <div className="auth-container">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h1>{isRegistering ? "Konto erstellen" : "Willkommen zurück"}</h1>
            <p>{isRegistering
              ? "Erstellen Sie ein neues Konto, um fortzufahren"
              : "Melden Sie sich mit Ihren Zugangsdaten an"}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Registrierungsfelder */}
            {isRegistering && (
              <motion.div
                className="form-row name-row"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Vorname"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "error-input" : ""}
                    />
                  </div>
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Nachname"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "error-input" : ""}
                    />
                  </div>
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </motion.div>
            )}

            {/* E-Mail */}
            <div className="form-group">
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail-Adresse"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error-input" : ""}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Passwort */}
            <div className="form-group">
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Passwort"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "error-input" : ""}
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Passwort bestätigen (nur bei Registrierung) */}
            {isRegistering && (
              <motion.div
                className="form-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Passwort bestätigen"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? "error-input" : ""}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </motion.div>
            )}

            {/* Statusmeldung anzeigen */}
            {statusMessage.text && (
              <div className={`status-message ${statusMessage.type}`}>
                {statusMessage.text}
              </div>
            )}

            {/* Submit-Button */}
            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : isRegistering ? (
                <>
                  <FaUserPlus /> Registrieren
                </>
              ) : (
                <>
                  <FaUser /> Anmelden
                </>
              )}
            </button>
          </form>

          {/* Modus wechseln (Login/Register) */}
          <div className="auth-switch">
            <p>
              {isRegistering
                ? "Bereits ein Konto?"
                : "Noch kein Konto?"}
            </p>
            <button
              type="button"
              className="switch-button"
              onClick={switchMode}
            >
              {isRegistering ? "Anmelden" : "Registrieren"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;