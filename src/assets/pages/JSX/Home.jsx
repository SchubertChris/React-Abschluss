import React, { use, useEffect, useState } from "react";
import "../styles/Home.scss";

const images = [
  "https://cdn.pixabay.com/photo/2022/08/27/08/04/magma-7413903_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/01/12/08/12/keyboard-4759501_960_720.jpg",
  "https://cdn.pixabay.com/photo/2024/01/03/18/02/tree-8485930_960_720.jpg",
  "https://cdn.pixabay.com/photo/2023/03/20/20/35/sunset-7865844_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/06/21/20/23/lightbulb-3489395_960_720.jpg",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 10000); // 10 Sekunden timer
    return () => clearInterval(interval); // Wenn Komponente unmountet wird, wird der Interval cleared
  }, []);

  const ToShop = () => {
    window.location.href = "/React-Abschluss/shop ";
  };

  /* 
  -----------------------------------------------------RETURN----------------------
  -----------------------------------------------------RETURN----------------------
  -----------------------------------------------------RETURN----------------------
  -----------------------------------------------------RETURN----------------------
  */

  return (
    <div className="Home">
      <div className="Carousel-Container">
        <div className="description">
          <h2>Ein Carrousel mit JS/CSS</h2>
          <p>Dynamisch, mit Interval von 10 Sekunden</p>
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
          <p>
            Hier geht es volle Kanone, um Styling, Performance & das coolste du
            lernst dabei was!
          </p>
          <button onClick={ToShop} className="Btn-toCategories">
            Jetzt schnuppern
          </button>
        </div>
        <div className="text1">
          <h2>Über mich</h2>
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
          <hr />
        </div>

        <div className="text2">
          <h2>Mein Ansatz</h2>
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
          <hr />
        </div>

        <div className="text3">
          <h2>Meine Vision</h2>
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
          <hr />
        </div>

        <div className="text4">
          <h2>Warum du hier genau richtig bist</h2>
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
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Home;
