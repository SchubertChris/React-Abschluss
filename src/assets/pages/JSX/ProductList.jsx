import React from 'react';
import products from '../../data/produkte.json';
import '../styles/ProductList.scss';
import DiamondSVG from '../../layout/PlaceholderSVG';

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
  "2 / 5 / 5 / 7"
];

const ProductList = () => {
  return (
    <div className="product-list">
      {products.slice(0, gridAreas.length).map((product, index) => (
        <div 
          key={product.id} 
          className="product-item"
          style={{ gridArea: gridAreas[index] }}
        >
          <h2 className="product-name">{product.name}</h2>
          <DiamondSVG />
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
