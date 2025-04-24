import React, { useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "./ProductList";
import { AppContext } from "../../layout/ContextAPI";
import "../styles/Shop.scss";

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";
  const productListRef = useRef(null);
  const { darkMode } = useContext(AppContext);

  useEffect(() => {
    // Scroll into view only on initial load or when search term changes
    if (productListRef.current) {
      productListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [searchTerm]); // Dependency on searchTerm ensures scrolling occurs when search changes

  return (
    <section className={`shop-container ${darkMode ? 'dark' : ''}`}>
      <header className="shop-header">
        <h1>Willkommen im Trading Hub</h1>
        <p>
          Hier findest du wirklich alles, um deine Skills auf das nächste
          Level zu bringen!
        </p>
      </header>

      <hr className="shop-divider" />

      {searchTerm && (
        <p className="search-results">
          Suchergebnisse für: <strong>{searchTerm}</strong>
        </p>
      )}

      <div ref={productListRef} className="product-list-container">
        <ProductList searchTerm={searchTerm} />
      </div>

      <hr className="shop-divider" />

      <footer className="shop-footer">
        <p>
          Solltest du individuelle Anfragen haben oder suchst nach einem{" "}
          <strong>Face to Face Coaching</strong> schreibe mir eine Mail:
        </p>
        <a
          href="mailto:schubert_chris@rocketmail.com"
          className="contact-email"
          aria-label="Kontakt Email"
        >
          schubert_chris@rocketmail.com
        </a>
      </footer>
    </section>
  );
};

export default Shop;