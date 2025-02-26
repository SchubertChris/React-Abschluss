import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../layout/ContextAPI";
import DiamondSVG from "../layout/PlaceholderSVG";
import logo from "../../assets/images/Logo/CandleScopeLogo.png";
import "../../assets/layout/styles/header.scss";
import { FaArrowRightFromBracket } from "react-icons/fa6";
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
  FaSignInAlt,
  FaPaypal,
  FaCcMastercard,
  FaCcVisa,
  FaFileInvoice,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const Header = () => {
  const { darkMode, setDarkMode, cartItems, setCartItems, user, logout } =
    useContext(AppContext);
  const [footerVisible, setFooterVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [UserSee, setUserSee] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const cartRef = useRef(null);
  const menuButtonRef = useRef(null);
  const cartButtonRef = useRef(null);

  // Laden von cartItems aus localStorage
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

  // Speichern von cartItems in localStorage, wenn sie sich ändern
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Schließen des Warenkorbs, wenn er leer ist
  useEffect(() => {
    if (cartItems.length === 0) {
      setCartVisible(false);
    }
  }, [cartItems]);

  // Behandlung von Klicks außerhalb des Menüs oder Warenkorbs
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Für Navigationsmenü
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        document.querySelector(".nav-menu").classList.remove("open");
      }

      // Für Warenkorb
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

  // Umschalten des Dark Modes
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

  /*  ------------------------------------------------------*/
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const totalItems = cartItems.length;

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="CandleScope Logo" className="logo" />
          </Link>
        </div>
        <div className={`User-Status-Profil ${UserSee ? "visible" : ""}`}>
          {user ? ( // Falls ein Benutzer eingeloggt ist
            <>
              <p className="User">
                {user.name} <span>{user.email}</span>
              </p>
              <button className="Logout" onClick={logout}>
                <FaArrowRightFromBracket />
              </button>
            </>
          ) : (
            <Link to="/login-register" className="login">
              <FaSignInAlt className="Login" /> Login
            </Link>
          )}
        </div>

        <div className="button-group">
          <button className="User-Icon" onClick={() => setUserSee(!UserSee)}>
            <FaUserCircle />
          </button>
          <button
            ref={menuButtonRef}
            onClick={OpenMenu}
            className="icon-button menu-button"
          >
            <FaBars />
          </button>
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
              <hr />
              <p>Dieses Produkt ist vom Umtausch ausgeschlossen</p>
            </div>
          ))
        ) : (
          <p>Der Warenkorb ist leer</p>
        )}
        <hr />
        <h4>Hier geht es zur Kasse </h4>
        <p className="Total-Price">Total: €{totalAmount.toFixed(2)}</p>
        <p className="Total-Prod">Produkte: {totalItems}</p>
        <br />
        <hr />
        <p>Das sind unsere Zahlungsmöglichkeiten</p>
        <div className="Zahlungsmöglichkeiten">
          <p>
            PayPal
            <span className="PayPal">
              <FaPaypal />
            </span>
          </p>
          <p>
            Mastercard
            <span className="Mastercard">
              <FaCcMastercard />
            </span>
          </p>
          <p>
            Visa
            <span className="Visa">
              <FaCcVisa />
            </span>
          </p>
          <p>
            Auf Rechnung
            <span className="Rechnung">
              <FaFileInvoice />
            </span>
          </p>
          <p>
            Per Nachname
            <span className="Nachname">
              <FaMoneyCheckAlt />
            </span>
          </p>
        </div>
      </div>

    </header>
  );
};

export default Header;
