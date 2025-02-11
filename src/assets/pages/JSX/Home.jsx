import React, { use, useEffect, useState } from "react";
import "../styles/home.scss";

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
    <div className="outer-text-container">
      <div className="text-container">
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
          {[
            {
              title: "Über uns",
              content: [
                "Wir sind ein kreatives Team, das sich auf die Erstellung von beeindruckenden Bildern spezialisiert hat.",
                "Unsere Mission ist es, die Schönheit der Welt durch unsere Linse einzufangen.",
                "Jedes Bild erzählt eine einzigartige Geschichte.",
              ],
            },
            {
              title: "Unsere Vision",
              content: [
                "Wir streben danach, die Kunst der Fotografie auf die nächste Stufe zu heben.",
                "Unsere Vision ist es, durch unsere Arbeit Emotionen zu wecken und Menschen zu inspirieren.",
                "Wir glauben an die Kraft der Bilder, die Welt zu verändern.",
              ],
            },
            {
              title: "Unsere Werte",
              content: [
                "Kreativität, Innovation und Leidenschaft sind die Kernwerte, die uns antreiben.",
                "Wir legen großen Wert auf Qualität und Detailgenauigkeit in jedem unserer Projekte.",
                "Unser Ziel ist es, stets die Erwartungen unserer Kunden zu übertreffen.",
              ],
            },
            {
              title: "Kontakt",
              content: [
                "Haben Sie Fragen oder möchten Sie mit uns zusammenarbeiten?",
                "Kontaktieren Sie uns unter info@unserefirma.com oder 123-456-7890.",
                "Wir freuen uns darauf, von Ihnen zu hören!",
              ],
            },
          ].map((section, index) => (
            <div key={index} className={`text${index + 1}`}>
              <h2>{section.title}</h2>
              {section.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
