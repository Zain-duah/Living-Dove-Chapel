
import { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.jpg';
import icon from './icons/menu.svg';
import closeIcon from './icons/close.svg';
import whatsappIcon from './icons/whatsapp.svg';
import heroImage from './images/wrapper.jpg';
import galleryOne from './images/img01.jpg';
import galleryTwo from './images/img02.jpg';
import galleryThree from './images/img03.jpg';

const stats = [
  { value: 'Christ', label: 'At the heart of everything we do' },
  { value: 'Worship', label: 'Growing together in faith' },
  { value: 'Prayer', label: 'Seeking God together' },
  { value: 'Community', label: 'Serving one another with love' },
];

const ministries = [
  {
    title: 'Children & Youth',
    text: 'Nurturing spiritual growth, purpose, and leadership among our younger generation.',
  },
  {
    title: 'Prayer & Healing',
    text: 'A place of divine encounter, prayer, and restoration for every life in need.',
  },
  {
    title: 'Worship & Music',
    text: 'Raising heartfelt worship that brings the presence of God into every gathering.',
  },
  {
    title: 'Community Outreach',
    text: 'Serving families and communities with compassion, care, and practical support.',
  },
];

const churchLife = [
  { title: 'Worship together', image: galleryOne, alt: 'Living Dove Chapel gathering in worship' },
  { title: 'Grow in faith', image: galleryTwo, alt: 'Church community growing together in faith' },
  { title: 'Love in action', image: galleryThree, alt: 'Living Dove Chapel community sharing fellowship' },
];

const gatherings = [
  { title: 'Sunday worship', text: 'Gather with us to worship God, hear the Word, and find your church family.' },
  { title: 'Prayer & Bible study', text: 'Make room for prayer, Scripture, and encouragement in the middle of the week.' },
  { title: 'Youth & community', text: 'Get connected with opportunities to grow, serve, and build meaningful relationships.' },
];

function App() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <header className="topbar">
        <NavBar />
      </header>

      <main>
        <HeroSection />
        <AboutSection />
        <MissionsSection />
        <MinistrySection />
        <SermonSection />
        <EventsSection />
        <GiveSection />
      </main>

      <Footer />
    </div>
  );
}

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <a className="nav-logo-wrap" href="#home" onClick={closeMenu}>
        <img src={logo} alt="Living Dove Chapel logo" className="nav-logo" />
        <span>Living Dove Chapel</span>
      </a>

      <div className={`nav-links${isMenuOpen ? ' is-open' : ''}`} id="nav-links">
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#ministries" onClick={closeMenu}>Ministries</a>
        <a href="#events" onClick={closeMenu}>Gatherings</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </div>

      <button
        className="menu-icon"
        type="button"
        aria-controls="nav-links"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setIsMenuOpen((menuOpen) => !menuOpen)}
      >
        <img src={isMenuOpen ? closeIcon : icon} alt="" width="28" height="28" />
      </button>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content reveal reveal-left">
        <p className="eyebrow">A place of worship, prayer, and purpose</p>
        <h1>Welcome to Living Dove Chapel</h1>
        <p className="hero-copy">
          We believe every life can rise, heal, and flourish through the transforming power of Jesus Christ.
        </p>

        <div className="cta-group">
          <a href="#about" className="primary-btn">Learn More</a>
          <a href="#events" className="secondary-btn">Plan Your Visit</a>
        </div>

        <div className="hero-meta">
          <div>
            <span>Worship</span>
            <strong>Encounter God</strong>
          </div>
          <div>
            <span>Grow</span>
            <strong>Build your faith</strong>
          </div>
          <div>
            <span>Serve</span>
            <strong>Love our community</strong>
          </div>
        </div>
      </div>

      <div className="hero-visual reveal reveal-right">
        <div className="image-card main-image">
          <img src={heroImage} alt="Church worship gathering" />
        </div>
        <div className="floating-card card-one">
          <strong>Prayer</strong>
          <span>Daily uplift</span>
        </div>
        <div className="floating-card card-two">
          <strong>Community</strong>
          <span>Love in motion</span>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="section-heading reveal">
        <p className="eyebrow dark">Who we are</p>
        <h2>Impacting lives through Christ-centered worship</h2>
      </div>

      <div className="about-grid">
        <div className="about-story reveal reveal-left">
          <p>
            Living Dove Chapel is a Christ-centered church in Community 2, Tema, Ghana. We are here to help people
            encounter God, grow in faith, and share Christ’s love with the people around them.
          </p>
          <p>
            Whether you are exploring faith or looking for a church family, you are welcome to worship, pray, learn
            from Scripture, and find a place to belong.
          </p>
        </div>

        <div className="stats-panel reveal reveal-right">
          {stats.map((item) => (
            <div className="stat-box" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionsSection() {
  return (
    <section className="mission-section">
      <div className="section-heading reveal">
        <p className="eyebrow">Our mission</p>
        <h2>Raising disciples, restoring hope, and reaching the world</h2>
      </div>

      <div className="mission-grid">
        <div className="mission-card reveal reveal-left">
          <span>01</span>
          <h3>Discipleship</h3>
          <p>Helping believers grow in spiritual maturity through teaching, prayer, and authentic community.</p>
        </div>
        <div className="mission-card reveal">
          <span>02</span>
          <h3>Prayer</h3>
          <p>Creating a culture of consistent intercession, healing, and prophetic encouragement.</p>
        </div>
        <div className="mission-card reveal reveal-right">
          <span>03</span>
          <h3>Service</h3>
          <p>Showing Christ’s love through outreach, compassion projects, and practical care for families.</p>
        </div>
      </div>
    </section>
  );
}

function MinistrySection() {
  return (
    <section id="ministries" className="ministry-section">
      <div className="section-heading reveal">
        <p className="eyebrow dark">Our ministries</p>
        <h2>Spaces where every generation grows in Christ</h2>
      </div>

      <div className="ministry-grid">
        {ministries.map((item) => (
          <article className="ministry-card reveal" key={item.title}>
            <div className="ministry-icon">✦</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SermonSection() {
  return (
    <section className="sermon-section" aria-labelledby="church-life-title">
      <div className="section-heading reveal">
        <p className="eyebrow">Life at Living Dove Chapel</p>
        <h2 id="church-life-title">Worship, grow, and serve together</h2>
      </div>

      <div className="sermon-grid">
        {churchLife.map((moment) => (
          <article className="sermon-card reveal" key={moment.title}>
            <div className="sermon-thumb">
              <img src={moment.image} alt={moment.alt} loading="lazy" />
            </div>
            <div className="sermon-body">
              <h3>{moment.title}</h3>
              <p>Faith grows when we gather and walk together.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section id="events" className="events-section" aria-labelledby="gatherings-title">
      <div className="section-heading reveal">
        <p className="eyebrow dark">Come and connect</p>
        <h2 id="gatherings-title">There is a place for you here</h2>
      </div>

      <div className="events-grid">
        {gatherings.map((gathering) => (
          <article className="event-card reveal" key={gathering.title}>
            <div className="event-date" aria-hidden="true">✦</div>
            <h3>{gathering.title}</h3>
            <p>{gathering.text}</p>
            <a href="tel:+233257121701">Ask about visiting</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function GiveSection() {
  return (
    <section className="give-section reveal">
      <div className="give-content">
        <div>
          <p className="eyebrow">Be part of the mission</p>
          <h2>Let’s share Christ’s love in our community</h2>
        </div>
        <a href="mailto:hello@livingdovechapel.org?subject=Connecting%20with%20Living%20Dove%20Chapel" className="primary-btn">Get in touch</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="Living Dove Chapel logo" className="footer-logo" />
          <h3>Living Dove Chapel</h3>
          <p>A church where worship meets purpose and love becomes action.</p>
        </div>

        <div className="footer-links">
          <h4>Visit</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#ministries">Ministries</a>
          <a href="#events">Events</a>
        </div>

        <div className="footer-links">
          <h4>Contact</h4>
          <a href="mailto:hello@livingdovechapel.org">hello@livingdovechapel.org</a>
          <a href="tel:+233257121701">+233 257 121 701</a>
          <span>Community 2, Tema, Ghana</span>
        </div>

        <div className="footer-social">
          <h4>Connect</h4>
          <div className="social-row">
            <a href="https://wa.me/233257121701" target="_blank" rel="noreferrer" aria-label="Message Living Dove Chapel on WhatsApp">
              <img src={whatsappIcon} alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Living Dove Chapel</span>
        <span>Faith · Family · Community</span>
      </div>
    </footer>
  );
}

export default App;
