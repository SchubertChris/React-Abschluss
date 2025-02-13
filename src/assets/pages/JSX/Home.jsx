import React, { use, useEffect, useState } from "react";
import "../styles/Home.scss";

const images = [
  "https://cdn.pixabay.com/photo/2023/01/04/19/40/grass-7697505_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450_960_720.jpg",
  "https://cdn.pixabay.com/photo/2024/01/03/18/02/tree-8485930_960_720.jpg",
  "https://cdn.pixabay.com/photo/2023/03/20/20/35/sunset-7865844_960_720.jpg",
  "https://cdn.pixabay.com/photo/2023/01/08/05/52/sunset-7704594_960_720.jpg",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Home">
      <div className="Carousel-Container">
        <div className="description">
          <h2>Bild {currentIndex + 1}</h2>
          <p>Beschreibung des Bildes {currentIndex + 1}</p>
        </div>
        <div className="images-carousel" onClick={nextImage}>
          <img src={images[currentIndex]} alt={`Bild ${currentIndex + 1}`} />
        </div>
        <div className="state">
          {images.map((_, index) => (
            <li
              key={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => goToImage(index)}
            ></li>
          ))}
        </div>
      </div>
      <div className="Text-Container">
        <div className="Test-Head-Inner">
        <h1>Willkommen</h1>
        <h4>Lust auf Style der dich umhauen wird?</h4>
        <h6>Dann bist du bei mir genau richtig!</h6>
        <p>Hier geht es volle Kanone, um Styling, Performance & das coolste du lernst dabei was!</p>
        <button className="Btn-toCategories">
          Jetzt schnuppern
        </button>
        </div>
        <div className="text1">
          <h2>Über uns</h2>
          <p>Wir sind ein kreatives Team, das sich auf die Erstellung von beeindruckenden Bildern spezialisiert hat.</p>
          <p>Unsere Mission ist es, die Schönheit der Welt durch unsere Linse einzufangen.</p>
          <p>Jedes Bild erzählt eine einzigartige Geschichte.</p>
          <hr />
        </div>
        <div className="text2">
          <h2>Unsere Vision</h2>
          <p>Wir streben danach, die Kunst der Fotografie auf die nächste Stufe zu heben.</p>
          <p>Unsere Vision ist es, durch unsere Arbeit Emotionen zu wecken und Menschen zu inspirieren.</p>
          <p>Wir glauben an die Kraft der Bilder, die Welt zu verändern.</p>
          <hr />
        </div>
        <div className="text3">
          <h2>Unsere Werte</h2>
          <p>Kreativität, Innovation und Leidenschaft sind die Kernwerte, die uns antreiben.</p>
          <p>Wir legen großen Wert auf Qualität und Detailgenauigkeit in jedem unserer Projekte.</p>
          <p>Unser Ziel ist es, stets die Erwartungen unserer Kunden zu übertreffen.</p>
          <hr />
        </div>
        <div className="text4">
          <h2>Kontakt</h2>
          <p>Haben Sie Fragen oder möchten Sie mit uns zusammenarbeiten?</p>
          <p>Kontaktieren Sie uns unter info@unserefirma.com oder 123-456-7890.</p>
          <p>Wir freuen uns darauf, von Ihnen zu hören!</p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Home;
