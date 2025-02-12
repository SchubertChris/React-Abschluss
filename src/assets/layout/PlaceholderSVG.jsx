import React, { useState } from 'react';

const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DiamondSVG = () => {
  // useState für die zufällige Farbe
  const [strokeColor, setStrokeColor] = useState(randomColor());

  // Funktion, die die Farbe bei einem Klick ändert
  const handleClick = () => {
    setStrokeColor(randomColor());
  };

  return (
    <svg
      width="275px"
      height="170"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: '#121212', cursor: 'pointer' }} // Schwarzer Hintergrund und Zeiger-Cursor bei Hover
      onClick={handleClick} // Klick-Handler, der die Farbe ändert
    >
      {/* Oben */}
      <polygon
        points="50,10 60,25 40,25"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
      {/* Oberer Bereich */}
      <polygon
        points="60,25 70,40 50,30"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
      {/* Mittlere Flächen */}
      <polygon
        points="50,30 70,40 50,50"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <polygon
        points="50,30 30,40 50,50"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
      {/* Untere Flächen */}
      <polygon
        points="50,50 70,40 60,60"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <polygon
        points="50,50 30,40 40,60"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <polygon
        points="50,50 60,60 50,70"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <polygon
        points="50,50 40,60 50,70"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
      {/* Unterer Bereich */}
      <polygon
        points="50,70 40,60 50,80"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
};

export default DiamondSVG;
