import React, { useEffect, useRef, useState } from "react";
import "../styles/AboutUs.scss";
import { FaArrowUp, FaUsers, FaLightbulb, FaHandshake, FaRegCompass } from "react-icons/fa";

// Funktion für hochwertige zufällige Bilder
const getRandomImage = (width = 1920, height = 1080, topic = "") => {
  const topics = ["nature", "architecture", "technology", "business"];
  const selectedTopic = topic || topics[Math.floor(Math.random() * topics.length)];
  return `https://source.unsplash.com/random/${width}x${height}/?${selectedTopic}&sig=${Math.floor(Math.random() * 1000)}`;
};

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef([]);

  // Scroll zum Anfang der Seite
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Scrolling-Event für die Sektion-Indikatoren
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Wenn der Benutzer in der Nähe der Mitte der Sektion ist
        if (scrollPosition >= sectionTop - windowHeight / 2 &&
          scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial auslösen

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation basierend auf Sichtbarkeit
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Element muss zu 15% sichtbar sein
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          // Optionaler Code um die Animation zurückzusetzen, wenn Element nicht mehr sichtbar ist
          // entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    // Alle animierbaren Elemente beobachten
    document.querySelectorAll('.animate-item').forEach(element => {
      animationObserver.observe(element);
    });

    return () => {
      document.querySelectorAll('.animate-item').forEach(element => {
        animationObserver.unobserve(element);
      });
    };
  }, []);

  // Parallax-Effekt für Hintergründe
  useEffect(() => {
    const handleParallax = () => {
      const scrollPosition = window.scrollY;

      document.querySelectorAll('.parallax-bg').forEach((bg) => {
        const section = bg.closest('.parallax-section');
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Nur anwenden, wenn sich der Benutzer in der Nähe der Sektion befindet
        if (scrollPosition >= sectionTop - window.innerHeight &&
          scrollPosition <= sectionTop + sectionHeight) {

          // Parallax-Intensität berechnen (mehr Bewegung je näher zur Mitte)
          const distance = scrollPosition - sectionTop;
          const parallaxOffset = distance * 0.4; // Parallax-Geschwindigkeit

          // Bewegung nur auf gerade Sektionen anwenden (indiziert von 0)
          if (Array.from(sectionsRef.current).indexOf(section) % 2 === 0) {
            bg.style.transform = `translateY(${parallaxOffset}px)`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleParallax);

    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  // Team-Mitglieder
  const teamMembers = [
    {
      name: "Anna Schmidt",
      position: "CEO & Gründerin",
      image: getRandomImage(400, 400, "portrait"),
      description: "Anna bringt über 15 Jahre Erfahrung in der Branche mit und leitet das Unternehmen mit Vision und Leidenschaft."
    },
    {
      name: "Michael Weber",
      position: "CTO",
      image: getRandomImage(400, 400, "portrait"),
      description: "Michael ist unser technisches Genie und verantwortlich für alle innovativen Lösungen, die wir entwickeln."
    },
    {
      name: "Sarah König",
      position: "Design Lead",
      image: getRandomImage(400, 400, "portrait"),
      description: "Sarah verwandelt Ideen in beeindruckende visuelle Erlebnisse mit ihrem ausgeprägten Gespür für Design."
    }
  ];

  // Unternehmenswerte
  const companyValues = [
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "Wir denken ständig darüber nach, wie wir Grenzen verschieben und neue Möglichkeiten schaffen können."
    },
    {
      icon: <FaHandshake />,
      title: "Integrität",
      description: "Ehrlichkeit und Transparenz stehen im Mittelpunkt all unserer Geschäftsbeziehungen."
    },
    {
      icon: <FaUsers />,
      title: "Teamarbeit",
      description: "Wir glauben an die Kraft der Zusammenarbeit und daran, dass wir gemeinsam Außergewöhnliches erreichen können."
    },
    {
      icon: <FaRegCompass />,
      title: "Nachhaltigkeit",
      description: "Wir handeln mit Blick auf die Zukunft und übernehmen Verantwortung für unseren ökologischen Fußabdruck."
    }
  ];

  return (
    <div className="about-us-container" id="about-us-top">
      {/* Navigation Indikatoren */}
      <div className="section-indicators">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`indicator ${activeSection === index ? 'active' : ''}`}
            onClick={() => {
              if (sectionsRef.current[index]) {
                sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        ))}
      </div>

      {/* Willkommenssektion */}
      <section
        className="parallax-section hero-section"
        ref={(el) => { sectionsRef.current[0] = el; }}
        data-index={0}
      >
        <div className="parallax-bg" style={{ backgroundImage: `url(${getRandomImage(1920, 1080, "office")})` }} />

        <div className="content-container">
          <h1 className="animate-item delay-1">Wir sind Ihr Partner für digitale Innovation</h1>
          <p className="animate-item delay-2">Entdecken Sie, wer wir sind und was uns antreibt, außergewöhnliche Lösungen zu schaffen.</p>

          <div className="scroll-indicator animate-item delay-3">
            <span>Scrollen Sie, um mehr zu erfahren</span>
            <div className="mouse">
              <div className="wheel"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Mission */}
      <section
        className="parallax-section mission-section"
        ref={(el) => { sectionsRef.current[1] = el; }}
        data-index={1}
      >
        <div className="parallax-bg" style={{ backgroundImage: `url(${getRandomImage(1920, 1080, "business")})` }} />

        <div className="content-container">
          <div className="two-column">
            <div className="left-column">
              <h2 className="animate-item">Unsere Mission</h2>
              <p className="animate-item delay-1">
                Wir glauben daran, dass Technologie das Potenzial hat, Unternehmen zu transformieren und Menschen zu verbinden. Unsere Mission ist es, innovative digitale Lösungen zu entwickeln, die reale Probleme lösen und messbare Ergebnisse liefern.
              </p>
              <p className="animate-item delay-2">
                Seit unserer Gründung im Jahr 2015 haben wir uns von einem kleinen Startup zu einem etablierten Unternehmen entwickelt, das Kunden in über 20 Ländern bedient.
              </p>
            </div>
            <div className="right-column">
              <div className="image-container animate-item delay-3">
                <img src={getRandomImage(800, 600, "meeting")} alt="Unsere Mission" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unser Team */}
      <section
        className="parallax-section team-section"
        ref={(el) => { sectionsRef.current[2] = el; }}
        data-index={2}
      >
        <div className="parallax-bg" style={{ backgroundImage: `url(${getRandomImage(1920, 1080, "team")})` }} />

        <div className="content-container">
          <h2 className="animate-item">Unser Team</h2>
          <p className="animate-item delay-1 team-intro">
            Unser Erfolg basiert auf dem Talent und der Hingabe unseres vielfältigen Teams von Experten.
            Jedes Mitglied bringt einzigartige Fähigkeiten und Perspektiven ein.
          </p>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className={`team-member animate-item delay-${index + 2}`} key={index}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span className="position">{member.position}</span>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unsere Werte */}
      <section
        className="parallax-section values-section"
        ref={(el) => { sectionsRef.current[3] = el; }}
        data-index={3}
      >
        <div className="parallax-bg" style={{ backgroundImage: `url(${getRandomImage(1920, 1080, "abstract")})` }} />

        <div className="content-container">
          <h2 className="animate-item">Unsere Werte</h2>
          <p className="animate-item delay-1 values-intro">
            Diese grundlegenden Prinzipien leiten unsere Entscheidungen und definieren unsere Unternehmenskultur.
          </p>

          <div className="values-grid">
            {companyValues.map((value, index) => (
              <div className={`value-card animate-item delay-${index + 2}`} key={index}>
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section
        className="parallax-section contact-section"
        ref={(el) => { sectionsRef.current[4] = el; }}
        data-index={4}
      >
        <div className="parallax-bg" style={{ backgroundImage: `url(${getRandomImage(1920, 1080, "office")})` }} />

        <div className="content-container">
          <h2 className="animate-item">Werden Sie Teil unserer Geschichte</h2>
          <p className="animate-item delay-1">
            Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten und gemeinsam großartige Projekte zu verwirklichen.
          </p>
          <div className="cta-buttons">
            <button className="primary-btn animate-item delay-2">Kontakt aufnehmen</button>
            <button className="secondary-btn animate-item delay-3">Karriere</button>
          </div>
        </div>
      </section>

      {/* Zurück nach oben Button mit Pulse-Animation */}
      <button className="btn-toTop" onClick={scrollToTop}>
        <FaArrowUp />
        <span className="pulse-ring"></span>
      </button>
    </div>
  );
};

export default AboutUs;