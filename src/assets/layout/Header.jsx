import React, { useContext, useState, useEffect, useRef, useCallback, memo } from "react";
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
  FaTrash,
  FaUserCircle,
  FaSignInAlt,
  FaPaypal,
  FaCcMastercard,
  FaCcVisa,
  FaFileInvoice,
  FaMoneyCheckAlt,
} from "react-icons/fa";

// Konstante für LocalStorage-Schlüssel
const CART_STORAGE_KEY = "cartItems";

// Extrahierte Komponenten für bessere Lesbarkeit und Performance
const CartItem = memo(({ item, onRemove }) => (
  <div className="cart-item">
    <DiamondSVG />
    <span>{item.name}</span>
    <span>Preis: €{item.price.toFixed(2)}</span>
    <button onClick={() => onRemove(item.id)} className="remove-button">
      <FaTrash />
    </button>
    <hr />
    <p>Dieses Produkt ist vom Umtausch ausgeschlossen</p>
  </div>
));

const PaymentMethods = () => (
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
);

const Header = () => {
  const { darkMode, setDarkMode, cartItems, setCartItems, user, logout } =
    useContext(AppContext);
  const [footerVisible, setFooterVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Refs für Event-Handler
  const menuButtonRef = useRef(null);
  const cartButtonRef = useRef(null);
  const menuRef = useRef(null);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  // Memoized-Werte für Berechnungen
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const totalItems = cartItems.length;

  // Warenkorb aus dem localStorage laden (nur einmal beim Laden)
  useEffect(() => {
    try {
      const savedCartItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
      }
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  }, []);

  // Warenkorb in localStorage speichern (wenn sich cartItems ändert)
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));

    // Schließen des Warenkorbs, wenn er leer ist
    if (cartItems.length === 0) {
      setCartVisible(false);
    }
  }, [cartItems]);

  // Dark Mode-Umschaltung
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Außerhalb-Klick-Handler mit useCallback für bessere Performance
  const handleClickOutside = useCallback((event) => {
    // Für Navigationsmenü
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
      document.querySelector(".nav-menu")?.classList.remove("open");
    }

    // Für Warenkorb
    if (
      cartRef.current &&
      !cartRef.current.contains(event.target) &&
      cartButtonRef.current &&
      !cartButtonRef.current.contains(event.target)
    ) {
      setCartVisible(false);
    }
  }, []);

  // Event-Listener für Klicks außerhalb registrieren
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Handler-Funktionen mit useCallback für bessere Performance
  const toggleMenu = useCallback(() => {
    setMenuOpen(prevState => {
      const newState = !prevState;
      document.querySelector(".nav-menu")?.classList.toggle("open", newState);
      return newState;
    });
  }, []);

  const toggleFooter = useCallback(() => {
    setFooterVisible(prevState => {
      const newState = !prevState;
      document.querySelector(".Footer")?.classList.toggle("visible2", newState);
      return newState;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.querySelector(".nav-menu")?.classList.remove("open");
  }, []);

  const toggleUserMenu = useCallback(() => {
    setUserMenuVisible(prevState => !prevState);
  }, []);

  const toggleCart = useCallback(() => {
    setCartVisible(prevState => !prevState);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, [setDarkMode]);

  const handleSearch = useCallback(() => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;
    navigate(`/shop?search=${encodeURIComponent(trimmedTerm)}`);
  }, [searchTerm, navigate]);

  const handleSearchKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }, [handleSearch]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const removeCartItem = useCallback((itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, [setCartItems]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="CandleScope Logo" className="logo" />
          </Link>
        </div>

        <div className={`User-Status-Profil ${userMenuVisible ? "visible" : ""}`}>
          {user ? (
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
          <button className="User-Icon" onClick={toggleUserMenu}>
            <FaUserCircle />
          </button>
          <button
            ref={menuButtonRef}
            onClick={toggleMenu}
            className="icon-button menu-button"
          >
            <FaBars />
          </button>
          <button
            ref={cartButtonRef}
            className={`icon-button cart-button ${cartItems.length > 0 ? "has-items" : ""}`}
            onClick={toggleCart}
          >
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </button>
          <button
            className="btn-toggle"
            onClick={toggleDarkMode}
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
              Über Uns
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
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>

      <div
        ref={cartRef}
        className={`Cart-Sidebar ${cartVisible ? "OpenCart" : ""}`}
      >
        <button className="close-cart" onClick={toggleCart}>
          ✖
        </button>
        <h2>Warenkorb</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeCartItem} />
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
        <PaymentMethods />
      </div>
    </header>
  );
};

export default memo(Header);