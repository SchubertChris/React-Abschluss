import React from "react";
import "../styles/AboutUs.scss";

function getRandomImage() {
  const width = 1920; // You can adjust the width and height as needed
  const height = 1080;
  return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
}

export default function AboutUs() {
  return (
    <>
      <div className="parallax-wrapper">
        {/* Titel */}
        <div className="parallax-section parallax-section-title" style={{ backgroundImage: `url(${getRandomImage()})` }}>
          <h1>Pure CSS Parallax</h1>
          <p>Experience the beauty of parallax scrolling with stunning images and smooth transitions.</p>
        </div>

        {/* Slide 1 */}
        <div className="parallax-section" style={{ backgroundImage: `url(${getRandomImage()})` }}>
          <div className="parallax-content">
            <h1>Slide 1</h1>
            <p>
              Lorem ipsum dolor sit amet, in velit iudico mandamus sit, persius
              dolorum in per, postulant mnesarchum cu nam.
            </p>
            <p>
              Discover the elegance of seamless scrolling and captivating visuals that draw you in.
            </p>
          </div>
        </div>

        {/* Slide 2 mit Bildern */}
        <div className="parallax-section" style={{ backgroundImage: `url(${getRandomImage()})` }}>
          <div className="parallax-content">
            <h1>Slide 2</h1>
            <p>
              Lorem ipsum dolor sit amet, in velit iudico mandamus sit, persius
              dolorum in per, postulant mnesarchum cu nam.
            </p>
            <p>
              Each slide tells a story, with images that complement the text and enhance the experience.
            </p>
          </div>
          <img
            className="parallax-image"
            src="https://picsum.photos/980/600"
            alt="Random"
          />
          <img
            className="parallax-image"
            src="https://picsum.photos/960/600"
            alt="Random"
          />
        </div>

        {/* Slide 3 */}
        <div className="parallax-section" style={{ backgroundImage: `url(${getRandomImage()})` }}>
          <div className="parallax-content">
            <h1>Slide 3</h1>
            <p>
              Lorem ipsum dolor sit amet, in velit iudico mandamus sit, persius
              dolorum in per, postulant mnesarchum cu nam.
            </p>
            <p>
              The journey continues with more breathtaking views and engaging content.
            </p>
          </div>
        </div>

        {/* Abschluss */}
        <div className="parallax-section parallax-footer" style={{ backgroundImage: `url(${getRandomImage()})` }}>
          <h1>The End</h1>
          <p>Thank you for scrolling through. We hope you enjoyed the visual experience.</p>
        </div>
      </div>
    </>
  );
}
