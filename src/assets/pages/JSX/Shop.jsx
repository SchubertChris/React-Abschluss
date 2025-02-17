import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "./ProductList"; 
import "../styles/Shop.scss";

export default function Shop() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";
  const productListRef = useRef(null);


  useEffect(() => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // In die mitte der Seite Scrollen

  return (
    <>
      <div className="shop-container">
        <div className="shop-header">
          <h1>Willkommen im Trading Hub</h1>
          <p>
            Hier findest du wirklich alles, um deine Skills auf das nächste Level
            zu bringen!
          </p>
        </div>
        <hr className="shop-divider" />
        <br />
        {searchTerm && (
          <p className="search-results">
            Suchergebnisse für: <strong>{searchTerm}</strong>
          </p>
        )}
        <div ref={productListRef} className="product-list-container">
          <ProductList searchTerm={searchTerm} />
        </div>
        <hr className="shop-divider" />
        <div className="shop-footer">
          <p>
            Solltest du Individuelle Anfragen haben oder suchst nach einem{" "}
            <strong>Face to Face Coaching</strong> schreibe mir eine Mail:{" "}
          </p>
          <br />
          <strong>
            <a href="mailto:schubert_chris@rocketmail.com" className="contact-email">
              schubert_chris@rocketmail.com
            </a>
          </strong>
        </div>
      </div>
    </>
  );
}
