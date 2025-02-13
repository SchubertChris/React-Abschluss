import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "./ProductList"; // Produktliste einbinden
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
  }, []);

  return (
    <>
      <div className="Suchergebnis">
        <h1>Willkommen im Trading Hub</h1>
        <p>
          Hier findest du wirklich alles, um deine Skills auf das nächste Level
          zu bringen!
        </p>
        <hr />
        <br />
        {searchTerm && (
          <p>
            Suchergebnisse für: <strong>{searchTerm}</strong>
          </p>
        )}
        <div ref={productListRef}>
          <ProductList searchTerm={searchTerm} />
        </div>
        <hr />
        <p>
          Solltest du Individuelle Anfragen haben oder suchst nach einem{" "}
          <strong>Face to Face Coaching</strong> schreibe mir eine Mail:{" "}
        </p>
        <br />
        <strong>
          <a href="mailto:schubert_chris@rocketmail.com">
            schubert_chris@rocketmail.com
          </a>
        </strong>
      </div>
    </>
  );
}
