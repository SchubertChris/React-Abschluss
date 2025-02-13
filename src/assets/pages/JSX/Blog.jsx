import React from 'react';
import '../styles/Blog.scss';

export default function Blog() {
  return (
<>  
<div className="blog-container">
      <p>
       &mdash; Flashed? Lies dich rein, hier gehts rund &mdash;
        <span className="animated-text">Frontend Development</span>
        &mdash; in Bestleistung &mdash;
      </p>
    </div>

<section className='Grid-Container-Blog'>
    <div className="Grid-Oben">
      <div className="Grid1 aktuell">Aktuell 1</div>
      <div className="Grid1 aktuell">Aktuell 2</div>
      <div className="Grid1 aktuell">Aktuell 3</div>
      <div className="Grid1 aktuell">Aktuell 4</div>
      <div className="Grid1 aktuell">Aktuell 5</div>
      <div className="Grid1 aktuell">Aktuell 6</div>
      <div className="Grid1 aktuell">Aktuell 7</div>
      <div className="Grid1 aktuell">Aktuell 8</div>
      <div className="Grid1 aktuell">Aktuell 9</div>
      <div className="Grid1 aktuell">Aktuell 10</div>
      <div className="Grid1 aktuell">Aktuell 11</div>
    </div>

    <div className="Grid-Unten">
      <div className="Grid-2 alt">Alt 1</div>
      <div className="Grid-2 alt">Alt 2</div>
      <div className="Grid-2 alt">Alt 3</div>
      <div className="Grid-2 alt">Alt 4</div>
      <div className="Grid-2 alt">Alt 5</div>
      <div className="Grid-2 alt">Alt 6</div>
      <div className="Grid-2 alt">Alt 7</div>
      <div className="Grid-2 alt">Alt 8</div>
      <div className="Grid-2 alt">Alt 9</div>
      <div className="Grid-2 alt">Alt 10</div>
      <div className="Grid-2 alt">Alt 11</div>
    </div>
    </section>
</>
  );
}
