import React, { useContext, useState } from "react";
import { AppContext } from "../../layout/ContextAPI";
import products from "../../data/produkte.json";
import "../styles/ProductList.scss";
import DiamondSVG from "../../layout/PlaceholderSVG";

const ProductList = ({ searchTerm }) => {
  // Übergabe des Suchbegriffs als Prop für den Suchleiste
  const { cartItems, setCartItems } = useContext(AppContext); // Usestate wird aus dem ContextAPI importiert
  const [message, setMessage] = useState({}); // Message wird als State gesetzt wenn ein Produkt in den Warenkorb gelegt wird (Rot)

  const filteredProducts = searchTerm // Filtern der Produkte nach dem Suchbegriff sicherstellung durch lowercase
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const addToCart = (product) => {
    // Funktion um ein Produkt in den Warenkorb zu legen
    if (cartItems.some((item) => item.id === product.id)) {
      // wenn das Produkt bereits im Warenkorb ist, wird eine Meldung ausgegeben und blockiert
      alert("Dieses digitale Produkt kann nur einmal gekauft werden.");
      return;
    }
    setCartItems([...cartItems, { ...product }]);
    setMessage({ [product.id]: ` wurde zum Warenkorb hinzugefügt.` });
  };

  return (
    // Return durch das Mapping der Produkte und Ausgabe der Produkte
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <h2 className="product-name">{product.name}</h2>
            <DiamondSVG />
            <p className="product-description">{product.description}</p>
            <p className="product-price">€{product.price.toFixed(2)}</p>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
            >
              In den Warenkorb
            </button>
            {message[product.id] && (
              <p className="message">{message[product.id]}</p>
            )}
          </div>
        ))
      ) : (
        <p>Kein Produkt gefunden!</p>
      )}
    </div>
  );
};

export default ProductList;
