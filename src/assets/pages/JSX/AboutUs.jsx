import React, { useEffect, useRef } from "react";
import "../styles/AboutUs.scss";
import { FaArrowUp } from "react-icons/fa";

function getRandomImage() {
  const width = 1920;
  const height = 1080;
  return `https://picsum.photos/${width}/${height}?random=${Math.floor(
    Math.random() * 1000 
  )}`;
}

const scrollToTop = () => {
  const topElement = document.getElementById("TOP");
  if (topElement) {
    topElement.scrollIntoView({ behavior: "smooth" });
  }
};

export default function AboutUs() {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // Beobachtet den Viewport
      threshold: 0.2, // 20% des Bildes müssen sichtbar sein, bevor die Animation startet
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { 
          entry.target.classList.add("visible");
        }
      });
    }, options); 

    if (leftImageRef.current) observer.observe(leftImageRef.current);
    if (rightImageRef.current) observer.observe(rightImageRef.current);

    return () => {
      if (leftImageRef.current) observer.unobserve(leftImageRef.current);
      if (rightImageRef.current) observer.unobserve(rightImageRef.current);
    };
  }, []);

  /* 
  ---------------------------------------------------------------RETURN--------------------
  ---------------------------------------------------------------RETURN--------------------
  ---------------------------------------------------------------RETURN--------------------
  */

  return (
    <>
      <div className="parallax-wrapper">
        <p id="TOP"></p>

        {/* Titel */}
        <div
          className="parallax-section parallax-section-title"
          style={{ backgroundImage: `url(${getRandomImage()})` }}
        >
          <div className="parallax-content">
            <h1>Real CSS Parallax</h1>
            <p>
              Erleben Sie die Schönheit des Parallax-Scrollings mit
              atemberaubenden Bildern und sanften Übergängen.
            </p>
          </div>
        </div>

        {/* Slide 1 */}
        <div
          className="parallax-section"
          style={{ backgroundImage: `url(${getRandomImage()})` }}
        >
          <div className="parallax-content">
            <h1>So Funktionierts</h1>
            <p>
              Parallax-Effekte sind ein visuelles Erlebnis, das durch das
              Scrollen von Bildern und Texten erzeugt wird.
            </p>
          </div>
        </div>

        {/* Slide 2 mit animierten Bildern */}
        <div
          className="parallax-section"
          style={{ backgroundImage: `url(${getRandomImage()})` }}
        >
          <div className="parallax-content slide2-content">
            <h1>Das Erlebnis</h1>
            <p>
              User Experience ist das A und O. Wir wollen, dass Sie sich
              wohlfühlen.
            </p>
            <p>
              Jede Folie erzählt eine Geschichte, mit Bildern, die den Text
              ergänzen und das Erlebnis verbessern.
            </p>
          </div>
          <img
            ref={leftImageRef}
            className="parallax-image parallax-image-left"
            src="https://picsum.photos/980/600"
            alt="Zufällig"
          />
          <img
            ref={rightImageRef}
            className="parallax-image parallax-image-right"
            src="https://picsum.photos/960/600"
            alt="Zufällig"
          />
        </div>

        {/* Abschluss */}
        <div
          className="parallax-section parallax-footer"
          style={{ backgroundImage: `url(${getRandomImage()})` }}
        >
          <div className="parallax-content">
            <h1>Das Ende</h1>
            <p>
              Vielen Dank fürs Scrollen. Wir hoffen, Ihnen hat das visuelle
              Erlebnis gefallen.
            </p>
          </div>
          <button className="btn-toTop" onClick={scrollToTop}>
            <FaArrowUp /> Nochmal
          </button>
        </div>
      </div>
    </>
  );
}
