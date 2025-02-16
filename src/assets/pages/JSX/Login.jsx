import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../layout/ContextAPI";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";
import { FaUser } from "react-icons/fa";

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* ^^^^^^^^^^^^^^^^^^^^^^^^^^Meins^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  /* ---------------------------------------------------BACKGROUND */
  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let target = { x: width / 2, y: height / 2 };
    let canvas = document.getElementById("demo-canvas");
    let ctx;
    let points = [];
    let animateHeader = true;

    const initHeader = () => {
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      for (let x = 0; x < width; x += width / 20) {
        for (let y = 0; y < height; y += height / 20) {
          let px = x + (Math.random() * width) / 20;
          let py = y + (Math.random() * height) / 20;
          points.push({
            x: px,
            originX: px,
            y: py,
            originY: py,
            active: 0.3,
          });
        }
      }

      points.forEach((point) => {
        let closest = [];
        points.forEach((p2) => {
          if (point !== p2) closest.push(p2);
        });
        closest.sort((a, b) => getDistance(point, a) - getDistance(point, b));
        point.closest = closest.slice(0, 5);
      });

      points.forEach((point) => {
        shiftPoint(point);
      });
      animate();
    };

    const animate = () => {
      if (!ctx || !animateHeader) return;
      ctx.clearRect(0, 0, width, height);

      points.forEach((point) => {
        if (getDistance(target, point) < 4000) {
          point.active = 1;
          point.circle = 20;
        } else {
          point.active = 0;
          point.circle = 0;
        }

        drawLines(point);
        drawCircle(point);
      });

      requestAnimationFrame(animate);
    };

    const shiftPoint = (point) => {
      const duration = 1 + Math.random();
      const newX = point.originX - 50 + Math.random() * 100;
      const newY = point.originY - 50 + Math.random() * 100;

      point.x += (newX - point.x) / duration;
      point.y += (newY - point.y) / duration;

      setTimeout(() => shiftPoint(point), duration * 1000);
    };

    const drawLines = (p) => {
      if (!p.active || !ctx) return;
      p.closest.forEach((closest) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
        ctx.stroke();
      });
    };

    const drawCircle = (p) => {
      if (!p.active || !ctx) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgba(156,217,249,${p.active})`;
      ctx.fill();
    };

    const getDistance = (p1, p2) => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    const onMouseMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    initHeader();
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      animateHeader = false;
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  /* ---------------------------------------------------BACKGROUND */
  /* °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°___MEINS°°° */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
    setFeedbackMessage("");
  };

  const validate = () => {
    let errors = {};
    if (isRegistering) {
      if (
        !formData.firstName ||
        formData.firstName.length < 2 ||
        formData.firstName.length > 25
      ) {
        errors.firstName = "Vorname muss zwischen 2 und 25 Zeichen lang sein";
      }
      if (
        !formData.lastName ||
        formData.lastName.length < 2 ||
        formData.lastName.length > 25
      ) {
        errors.lastName = "Nachname muss zwischen 2 und 25 Zeichen lang sein";
      }
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "E-Mail ist ungültig";
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Passwort muss mindestens 6 Zeichen lang sein";
    }
    if (isRegistering && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwörter stimmen nicht überein";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    login(formData.email, formData.password, navigate);
  };

  /* 
  -----------------------------------------------------RETURN----------------------
  -----------------------------------------------------RETURN----------------------
  -----------------------------------------------------RETURN----------------------
  -----------------------------------------------------RETURN----------------------
  */

  return (
    <div className="page-container">
      <canvas id="demo-canvas" className="background-canvas"></canvas>

      <div className="content-container">
        <h1 className="main-title">
          <FaUser /> {isRegistering ? "Registrieren" : "Anmelden"}
        </h1>

        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            {isRegistering && (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Vorname"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  autoFocus
                />
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}

                <input
                  type="text"
                  name="lastName"
                  placeholder="Nachname"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              value={formData.email}
              onChange={handleInputChange}
              autoFocus
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <button type="submit">
              {isRegistering ? "Registrieren" : "Anmelden"}
            </button>
          </form>

          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrors({});
              setFeedbackMessage("");
            }}
            className="toggle-button"
          >
            {isRegistering
              ? "Bereits ein Konto? Anmelden"
              : "Konto benötigt? Registrieren"}
          </button>
        </div>
        <div className="blende"></div>
      </div>
    </div>
  );
};

export default LoginForm;
