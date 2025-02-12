import React from "react";
import { useLocation } from "react-router-dom";
import ProductList from "./ProductList"; // Produktliste einbinden
import "../styles/Shop.scss";

export default function Shop() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  return (
    <>
    <div className="Suchergebnis">
      <h1>Willkommen im Trading Hub</h1>
      <p>Hier findest du wirklich alles, um deine Skills auf das nächste Level zu bringen!</p>
      <hr />
      <br />
      {searchTerm && <p>Suchergebnisse für: <strong>{searchTerm}</strong></p>}
      <ProductList searchTerm={searchTerm} />
      <hr />
      <p>Hier findest du alles wofür du dich Interessierst</p> <br />
      </div> 
    </>
  );
}
