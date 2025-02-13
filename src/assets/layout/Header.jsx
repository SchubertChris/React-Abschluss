import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../layout/ContextAPI";
import DiamondSVG from "../layout/PlaceholderSVG";
import logo from "../../assets/images/Logo/CandleScopeLogo.png";
import "../../assets/layout/styles/header.scss";
import {
  FaBars,
  FaShoppingCart,
  FaMoon,
  FaSun,
  FaArrowDown,
  FaArrowUp,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";

const Header = () => {
  const { darkMode, setDarkMode, cartItems, setCartItems } =
    useContext(AppContext);
  const [footerVisible, setFooterVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const cartRef = useRef(null);
  const cartButtonRef = useRef(null);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      try {
        setCartItems(JSON.parse(savedCartItems));
      } catch (error) {
        console.error("Error loading cart items:", error);
      }
    }
  }, []);

  // Save cart items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Close cart if empty
  useEffect(() => {
    if (cartItems.length === 0) {
      setCartVisible(false);
    }
  }, [cartItems]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      // For navigation menu
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        document.querySelector(".nav-menu").classList.remove("open");
      }

      // For cart
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !cartButtonRef.current.contains(event.target)
      ) {
        setCartVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const OpenMenu = () => {
    setMenuOpen(!menuOpen);
    document.querySelector(".nav-menu").classList.toggle("open");
  };

  const toggleFooter = () => {
    setFooterVisible(!footerVisible);
    document.querySelector(".Footer").classList.toggle("visible2");
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.querySelector(".nav-menu").classList.remove("open");
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/shop?search=${searchTerm}`);
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
          {/* ------------------------------------------------------ */}
          {/* User-Profil - Logout */}
          <button className="user-button icon-button">
            <FaUserCircle />
          </button>
          <div className="User-Status-Profil">
            <p className="User">Benutzername</p>
            <button className="Logout"></button>
          </div>
          {/* ------------------------------------------------------ */}
          {/* Menu Btn */}
          <button
            ref={menuButtonRef}
            onClick={OpenMenu}
            className="icon-button menu-button"
          >
            <FaBars />
          </button>
          {/* ------------------------------------------------------ */}
          <button
            ref={cartButtonRef}
            className={`icon-button cart-button ${
              cartItems.length > 0 ? "has-items" : ""
            }`}
            onClick={() => setCartVisible(!cartVisible)}
          >
            {/* Warenkorb Btn */}
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </button>
          {/* ------------------------------------------------------ */}
          {/* Dark Mode Btn */}
          <button
            className="btn-toggle"
            onClick={() => setDarkMode(!darkMode)}
            style={{ color: darkMode ? "#fff" : "#000" }}
          >
            <span>{darkMode ? "Light" : "Dark"}</span>
            <span>{darkMode ? <FaSun /> : <FaMoon />}</span>
          </button>
          {/* ------------------------------------------------------ */}
        </div>
      </div>

      <nav ref={menuRef} className="nav-menu">
        <ul className={footerVisible ? "visibleFooter" : ""}>
          <li>
            <Link to="/account-dashboard" onClick={closeMenu}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/login-register" onClick={closeMenu}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/about-us" onClick={closeMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={closeMenu}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={closeMenu}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/categories" onClick={closeMenu}>
              Kategorien
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={closeMenu}>
              Warenkorb
            </Link>
          </li>
        </ul>
      </nav>

      <div className="search-container">
        <input
          type="text"
          placeholder="Suche nach Produkten..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>

      <div className="WerbeBanner">
        <h1>Willkommen bei meinem Abschlussprojekt in React</h1>
        <p>
          Öffne einfach die Navigation und fange am besten beim Dashboard an
        </p>
        <Link to="/account-dashboard">
          <button>Dashboard</button>
        </Link>
        <img
          src="https://cdn.pixabay.com/photo/2018/05/20/21/01/sunset-3416768_960_720.jpg"
          alt="Natur"
        />
      </div>

      <div
        ref={cartRef}
        className={`Cart-Sidebar ${cartVisible ? "OpenCart" : ""}`}
      >
        <button className="close-cart" onClick={() => setCartVisible(false)}>
          ✖
        </button>
        <h2>Warenkorb</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <DiamondSVG />
              <span>{item.name}</span>
              <span>Preis: €{item.price.toFixed(2)}</span>
              <button
                onClick={() =>
                  setCartItems(cartItems.filter((p) => p.id !== item.id))
                }
                className="remove-button"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Der Warenkorb ist leer</p>
        )}
      </div>

      <div className="Footer">
        <div className="Social">
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
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
      </div>

      <button className="Footer-btn" onClick={toggleFooter}>
        {footerVisible ? <FaArrowUp /> : <FaArrowDown />} Informationen
      </button>
    </header>
  );
};

export default Header;
