import React, { useState, useEffect, useCallback } from "react";
import "../styles/Home.scss";

const IMAGES = [
  "https://cdn.pixabay.com/photo/2022/08/27/08/04/magma-7413903_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/01/12/08/12/keyboard-4759501_960_720.jpg",
  "https://cdn.pixabay.com/photo/2024/01/03/18/02/tree-8485930_960_720.jpg",
  "https://cdn.pixabay.com/photo/2023/03/20/20/35/sunset-7865844_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/06/21/20/23/lightbulb-3489395_960_720.jpg",
];

// Time in milliseconds between auto-sliding
const AUTO_SLIDE_INTERVAL = 10000;

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1
    );
  }, []);

  const goToImage = useCallback((index) => {
    setCurrentIndex(index);
    // Reset auto-slide timer when manually changing images
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  }, [nextImage, prevImage]);

  useEffect(() => {
    // Add keyboard navigation
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextImage, AUTO_SLIDE_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [nextImage, isAutoPlaying]);

  const navigateToShop = () => {
    window.location.href = "/React-Abschluss/shop";
  };

  return (
    <div className="home">
      <div className="carousel-container">
        <div className="description">
          <h2>Ein Carousel mit React & SCSS</h2>
          <p>Dynamisch, mit Interval von 10 Sekunden und Navigationsmöglichkeiten</p>
        </div>
        <div className="carousel-controls">
          <button className="nav-button prev" onClick={prevImage} aria-label="Previous image">
            &lsaquo;
          </button>
          <div className="images-carousel" role="region" aria-label="Image Carousel">
            <img 
              src={IMAGES[currentIndex]} 
              alt={`Bild ${currentIndex + 1}`}
              loading="lazy"
            />
          </div>
          <button className="nav-button next" onClick={nextImage} aria-label="Next image">
            &rsaquo;
          </button>
        </div>
        <div className="indicators" role="tablist">
          {IMAGES.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to image ${index + 1}`}
              className={index === currentIndex ? "active" : ""}
              onClick={() => goToImage(index)}
            ></button>
          ))}
        </div>
      </div>

      <div className="text-container">
        <div className="hero-section">
          <h1>Willkommen</h1>
          <h4>Lust auf Style der dich umhauen wird?</h4>
          <h6>Dann bist du bei mir genau richtig!</h6>
          <p>
            Hier geht es volle Kanone, um Styling, Performance & das coolste du
            lernst dabei was!
          </p>
          <button onClick={navigateToShop} className="btn-to-categories">
            Jetzt schnuppern
          </button>
        </div>

        <div className="content-sections">
          <section className="about-section">
            <h2>Über mich</h2>
            <div className="section-content">
              <p>
                Willkommen! Schön, dass du hier bist. Ich bin [Dein Name], ein
                kreativer Kopf mit einer Leidenschaft für Design, Ästhetik und
                Innovation. Mein Ziel ist es, einzigartige Erlebnisse zu schaffen –
                sei es durch visuelle Kunst, digitale Medien oder stilvolle
                Konzepte, die inspirieren und begeistern.
              </p>
              <p>
                Seit vielen Jahren beschäftige ich mich intensiv mit den neuesten
                Trends in den Bereichen Mode, Design und Technologie. Ich liebe es,
                bestehende Konzepte weiterzuentwickeln und neue, frische Ideen
                umzusetzen, die sowohl funktional als auch stilvoll sind. Meine
                Arbeit ist geprägt von Präzision, Detailverliebtheit und einem
                Gespür für das Besondere.
              </p>
            </div>
          </section>

          <section className="approach-section">
            <h2>Mein Ansatz</h2>
            <div className="section-content">
              <p>
                Ich glaube fest daran, dass Stil nicht nur eine äußere Erscheinung
                ist – er ist eine Form des Ausdrucks, eine Sprache, die ohne Worte
                spricht. Jeder Mensch hat eine einzigartige Identität, die sich
                durch Mode, Kunst und Kreativität widerspiegeln kann. Deshalb lege
                ich großen Wert darauf, individuelle Konzepte zu entwickeln, die
                perfekt zu den Wünschen und Bedürfnissen meiner Kunden oder meiner
                Community passen.
              </p>
              <p>
                Egal, ob es um Styling, Performance oder innovative Designlösungen
                geht – ich bin immer auf der Suche nach neuen Wegen, um Dinge auf
                das nächste Level zu bringen. Dabei kombiniere ich moderne
                Technologie mit kreativer Freiheit und schaffe so unverwechselbare
                Looks und Erlebnisse.
              </p>
            </div>
          </section>

          <section className="vision-section">
            <h2>Meine Vision</h2>
            <div className="section-content">
              <p>
                Meine Vision ist es, Menschen mit meiner Arbeit zu inspirieren, ihre
                eigene Kreativität zu entfalten und ihren individuellen Stil
                selbstbewusst zu leben. Ich bin davon überzeugt, dass Ästhetik und
                Design nicht nur schön aussehen, sondern Emotionen wecken,
                Erinnerungen schaffen und sogar den Alltag verändern können.
              </p>
              <p>
                Ich strebe danach, Trends nicht nur zu folgen, sondern sie
                mitzugestalten und neue Standards zu setzen. Mein Ziel ist es, eine
                Community von Gleichgesinnten aufzubauen, die sich für Innovation,
                Design und das gewisse Etwas begeistern.
              </p>
            </div>
          </section>

          <section className="why-section">
            <h2>Warum du hier genau richtig bist</h2>
            <div className="section-content">
              <p>
                Wenn du Lust auf etwas Besonderes hast – sei es in Sachen Mode,
                Design oder einfach ein frischer Blick auf kreative Prozesse – dann
                bist du hier genau richtig! Ich möchte mein Wissen, meine
                Erfahrungen und meine Leidenschaft mit dir teilen, damit du das
                Beste aus deinem Stil und deiner Kreativität herausholen kannst.
              </p>
              <p>
                Lass uns gemeinsam neue Wege gehen, Inspiration finden und eine Welt
                voller Stil und Ästhetik entdecken. Ich freue mich darauf, dich auf
                dieser Reise zu begleiten!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;