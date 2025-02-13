import React from 'react'
import '../styles/NotFound404.scss';


const handleBack = () => {
  window.location.href = '/';
}


export default function NotFound404() {



  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sag mal, wo willst du denn hin? Komm ja zurück</p>
      <button className='backtoHome'>@Home</button>
    </div>
  )
}
