import React, { useEffect, useState } from 'react';
import '../styles/NotFound404.scss';

const handleBack = () => {
  window.location.href = '/';
}

export default function NotFound404() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 404) {
      const timer = setTimeout(() => setCount(count + 2), 1); // Angabe in ms
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="not-found">
      <h1>{count}</h1>
      <h2>Nope, das war nichts</h2>
      <div className='Mond'></div>
      <img src="https://media.tenor.com/6JptszQgCnkAAAAi/text-work.gif" alt="Bild eines Pinguins, beim warten, dass was passiert." />
      <p>Sag mal, wo willst du denn hin? Komm ja zurück</p>
      <button className='backtoHome' onClick={handleBack}>@Home</button>
    </div>
  )
}
