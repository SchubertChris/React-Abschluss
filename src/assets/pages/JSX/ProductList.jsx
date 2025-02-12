import React, { useContext } from "react";
import { AppContext } from "../../layout/ContextAPI"; // Warenkorb aus dem Context holen
import products from "../../data/produkte.json";
import "../styles/ProductList.scss";
import DiamondSVG from "../../layout/PlaceholderSVG";

const gridAreas = [
  "7 / 7 / 11 / 9",
  "4 / 7 / 7 / 9",
  "1 / 7 / 4 / 9",
  "8 / 1 / 11 / 3",
  "5 / 1 / 8 / 3",
  "1 / 1 / 5 / 3",
  "1 / 3 / 4 / 5",
  "4 / 3 / 7 / 5",
  "7 / 3 / 10 / 5",
  "6 / 5 / 10 / 7",
  "2 / 5 / 6 / 7",
  "2 / 5 / 5 / 7",
];

const ProductList = ({ searchTerm }) => {
  const { cartItems, setCartItems } = useContext(AppContext);

  // Filtert die Produkte basierend auf der Suchanfrage
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  // Funktion zum Hinzufügen eines Produkts in den Warenkorb (nur einmal pro Produkt)
  const addToCart = (product) => {
    if (cartItems.some((item) => item.id === product.id)) {
      alert("Dieses digitale Produkt kann nur einmal gekauft werden.");
      return;
    }
    setCartItems([...cartItems, { ...product }]);
  };

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="product-item"
            style={{ gridArea: gridAreas[index % gridAreas.length] }}
          >
            <h2 className="product-name">{product.name}</h2>
            <DiamondSVG />
            <p className="product-description">{product.description}</p>
            <p className="product-price">Preis: €{product.price.toFixed(2)}</p>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
            >
              In den Warenkorb
            </button>
          </div>
        ))
      ) : (
        <p>Kein Produkt gefunden!</p>
      )}
    </div>
  );
};

export default ProductList;
