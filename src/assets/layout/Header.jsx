import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/Logo/CandleScopeLogo.png";
import "../../assets/layout/styles/header.scss";
import { FaBars, FaShoppingCart, FaMoon, FaSun, FaArrowDown, FaArrowUp, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

const Header = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const OpenMenu = () => {
    document.querySelector(".nav-menu").classList.toggle("open");
  };

  const toggleFooter = () => {
    setFooterVisible(!footerVisible);
    document.querySelector(".Footer").classList.toggle("visible2");
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="CandleScope Logo" className="logo" />
          </Link>
        </div>

        <div className="button-group">
          <button onClick={OpenMenu} className="icon-button menu-button">
            <FaBars />
          </button>
          <button className="icon-button cart-button">
            <FaShoppingCart />
          </button>
          <button
            className="btn-toggle"
            onClick={() => setDarkMode(!darkMode)}
            style={{ color: darkMode ? "#fff" : "#000" }}
          >
            <span>{darkMode ? "Light" : "Dark"}</span>
            <span>{darkMode ? <FaSun /> : <FaMoon />}</span>
          </button>
        </div>
      </div>

      <nav className="nav-menu">
        <ul className={footerVisible ? "visibleFooter" : ""}>
          <li><Link to="/account-dashboard">Dashboard</Link></li>
          <li><Link to="/login-register">Login</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/categories">Kategorien</Link></li>
          <li><Link to="/new">Neu</Link></li>
          <li><Link to="/offers">Angebote</Link></li>
          <li><Link to="/popular">Beliebt</Link></li>
          <li><Link to="/cart">Warenkorb</Link></li>
          <li><Link to="/shipping-returns">Rückgabe</Link></li>
        </ul>
        <div className="Footer">
          <div className="Social">
            <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/your-profile" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </div>
          <div className="Datenschutz">
            <span>Datenschutz</span>
          </div>
          <div className="Cockies-Impressum">
            <span className="Cockies">Cockies </span>
            <span className="Impressum">| Impressum</span>
          </div>
          <div className="FeedBack">
            <span className="FeedbackSpan">Gebe dein Feddback</span>
            <input type="text" id="feedback" />
          </div>
        </div>

        <button className="Footer-btn" onClick={toggleFooter}>
          {footerVisible ? <FaArrowUp /> : <FaArrowDown />} Informationen
        </button>
      </nav>

      <div className="search-container">
        <input type="text" placeholder="Suche..." className="search-input" />
        <button className="search-button">🔍</button>
      </div>

      <div className="WerbeBanner">
        <h1>Willkommen bei meinem Abschlussprojekt in React</h1>
        <p>Öffne einfach die Navigation und fange am besten beim Dashboard an</p>
        <Link to="/account-dashboard">
          <button>Dashboard</button>
        </Link>
        <img
          src="https://cdn.pixabay.com/photo/2018/05/20/21/01/sunset-3416768_960_720.jpg"
          alt="Natur"
        />
      </div>
    </header>
  );
};

export default Header;
