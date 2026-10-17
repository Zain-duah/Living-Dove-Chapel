
import { useEffect, useRef, useState } from 'react';
import './App.css';
import logo from './logo.jpg';
import icon from './icons/menu.svg';
import closeIcon from './icons/close.svg';
import facebookIcon from './icons/facebook.svg';
import whatsappIcon from './icons/whatsapp.svg';
import heroImage from './images/wrapper.jpg';
import galleryOne from './images/img01.jpg';
import galleryTwo from './images/img02.jpg';
import galleryThree from './images/img03.jpg';
import galleryFour from './images/img04.jpg';
import galleryFive from './images/img05.jpg';
import gallerySix from './images/img06.jpg';
import gallerySeven from './images/img07.jpg';
import galleryEight from './images/img08.jpg';
import galleryNine from './images/img09.jpg';

const galleryPhotoContext =
  process.env.NODE_ENV === 'test'
    ? null
    : require.context('./images', false, /^\.\/gallery-[a-z0-9-]+\.(?:jpe?g|png|webp)$/i);

const profilePhotoContext =
  process.env.NODE_ENV === 'test'
    ? null
    : require.context('./images', true, /^\.\/(?:[^/]+\/)?[^/]+\.(?:jpe?g|png|webp)$/i);

const getProfilePhoto = (filePath) => {
  const contextPath = `./${filePath}`;
  return profilePhotoContext?.keys().includes(contextPath) ? profilePhotoContext(contextPath) : null;
};

const stats = [
  { value: 'Christ', label: 'At the heart of everything we do' },
  { value: 'Worship', label: 'Growing together in faith' },
  { value: 'Prayer', label: 'Seeking God together' },
  { value: 'Community', label: 'Serving one another with love' },
];

const ministries = [
  {
    title: 'Choir',
    text: 'Leading the church in worship through music and song.',
  },
  {
    title: 'Media Team',
    text: 'Supporting church services and communication through media and technology.',
  },
  {
    title: 'Ushers',
    text: 'Welcoming and assisting everyone who joins our church gatherings.',
  },
  {
    title: 'Instrumentalists',
    text: 'Serving the church through instrumental music and worship.',
  },
  {
    title: 'Program Organizers',
    text: 'Coordinating church programs, services, and special events.',
  },
  {
    title: 'Polished Corner Stones',
    text: 'A church organization serving and growing together in faith.',
  },
];

const featuredChurchLife = [
  { title: 'Worship together', image: galleryOne, alt: 'A church member leading worship at Living Dove Chapel' },
  { title: 'Grow in faith', image: galleryTwo, alt: 'A church member sharing a moment at a church gathering' },
  { title: 'Love in action', image: galleryThree, alt: 'A member praying during a church service' },
  { title: 'Prayer & praise', image: galleryFour, alt: 'Church members gathered in prayer and praise' },
  { title: 'A joyful choir Ministration', image: galleryFive, alt: 'A worship team singing together' },
  { title: 'Serving with heart', image: gallerySix, alt: 'A church member serving during worship' },
  { title: 'Faith in community', image: gallerySeven, alt: 'Church members gathering outdoors' },
  { title: 'A moment of worship', image: galleryEight, alt: 'A church member worshipping during a service' },
  { title: 'Growing together', image: galleryNine, alt: 'Church members sharing fellowship together' },
];

// Add gallery-{descriptive-name}.{jpg,jpeg,png,webp} files to src/images to include them automatically.
const additionalChurchLife = galleryPhotoContext
  ? galleryPhotoContext
      .keys()
      .sort((firstPath, secondPath) => firstPath.localeCompare(secondPath, undefined, { numeric: true }))
      .map((filePath) => {
        const title = filePath
          .replace(/^\.\/gallery-/, '')
          .replace(/\.(?:jpe?g|png|webp)$/i, '')
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (character) => character.toUpperCase());

        return {
          title,
          image: galleryPhotoContext(filePath),
          alt: `${title} at Living Dove Chapel`,
        };
      })
  : [];

const churchLife = [...featuredChurchLife, ...additionalChurchLife];
const galleryPageSize = 9;

const branches = [
  { name: 'Jesus Temple', location: 'Community 2, Tema', isMain: true },
  { name: 'Rehoboth Temple', location: 'Community 1, Tema' },
  { name: 'Praise Temple', location: 'Community 4, Tema' },
  { name: 'Morning Star Temple', location: 'Ashaiman Appolonia' },
];

const createProfiles = (role, namedProfiles = [], minimumCount = 8) =>
  Array.from({ length: Math.max(minimumCount, namedProfiles.length) }, (_, index) => {
    const suppliedProfile = namedProfiles[index];
    const number = index + 1;

    return {
      id: `${role.toLowerCase().replace(/\s+/g, '-')}-${number}`,
      name: suppliedProfile?.name || `${role} ${number} — add name`,
      role: suppliedProfile?.role || role,
      initials: suppliedProfile?.initials || `${role === 'Pastor' ? 'P' : 'M'}${number}`,
      image: suppliedProfile?.image ? getProfilePhoto(suppliedProfile.image) : null,
    };
  });

const pastors = createProfiles('Pastor', [
  { name: 'Prophet Job Aidoo', role: 'General Overseer', initials: 'JA', image: 'job1.jpg' },
  { name: 'Apostle Jeffery Yankey', role: 'Apostle', initials: 'JY', image: 'instrumentalist/alex.jpg' },
  { name: 'Pastor Wilfred Nii Armah', role: 'Pastor', initials: 'WA', image: 'choir/bene.jpg' },
  { name: 'Pastor Nii Odai Mensah', role: 'Pastor', initials: 'NM', image: 'instrumentalist/joshua.jpg' },
  { name: 'Pastor George Turkson', role: 'Pastor', initials: 'GT', image: 'pastors/turkson.jpg' },
  { name: 'Pastor Annorhomah Quarm', role: 'Pastor', initials: 'AQ', image: 'choir/linda.jpg' },
  { name: 'Elder Maccandles Mark', role: 'Elder', initials: 'MM', image: 'choir/roda.jpg' },
  { name: 'Pastor Maxwell Kwofi Ampiah', role: 'Pastor', initials: 'MA' },
  { name: 'Lady Pastor Serwaa Aidoo', role: 'Lady Pastor', initials: 'SA', image: 'serwaa1.jpg' },
  { name: 'Lady Pastor Patience Nii Armah', role: 'Lady Pastor', initials: 'PA' },
  { name: 'Lady Pastor Dorcas', role: 'Lady Pastor', initials: 'PD' },
], 11);

const departmentProfiles = ministries.map((department) => ({
  ...department,
  id: department.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  profiles: createProfiles('Member'),
}));

const directionsUrl = (branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${branch.name}, ${branch.location}, Ghana`
  )}`;

const gatherings = [
  { day: 'Sunday', time: '8:00 AM–11:30 AM', title: 'Sunday Worship' },
  { day: 'Wednesday–Friday', time: '7:00 PM–8:30 PM', title: 'Midweek Service' },
  { day: 'Tuesday', time: '7:00 PM–8:00 PM', title: "Men’s Fellowship" },
];

const givingOptions = [
  { provider: 'MTN Mobile Money', number: '+233 592 062 298', phone: '+233592062298' },
  { provider: 'Telecel Cash', number: '+233 25 71 21 701', phone: '+233257121701' },
];

function App() {
  useEffect(() => {
    const revealSelector = '.reveal, .reveal-left, .reveal-right';

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(revealSelector).forEach((item) => item.classList.add('is-visible'));
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

    const observeRevealItems = (root) => {
      if (root.matches?.(revealSelector)) observer.observe(root);
      root.querySelectorAll(revealSelector).forEach((item) => observer.observe(item));
    };

    observeRevealItems(document);

    const main = document.querySelector('main');
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) observeRevealItems(node);
        });
      });
    });

    if (main) mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
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
        <ChurchLifeSection />
        <LeadersSection />
        <DepartmentsSection />
        <WatchLiveSection />
        <EventsSection />
        <BranchesSection />
        <DirectionsSection />
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
        <a href="#gallery" onClick={closeMenu}>Gallery</a>
        <a href="#leaders" onClick={closeMenu}>Our leaders</a>
        <a href="#departments" onClick={closeMenu}>Departments</a>
        <a href="#events" onClick={closeMenu}>Gatherings</a>
        <a href="#branches" onClick={closeMenu}>Branches</a>
        <a href="#live" onClick={closeMenu}>Watch live</a>
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
            <span>Sunday Worship</span>
            <strong>8:00 AM–11:30 AM</strong>
          </div>
          <div>
            <span>Midweek Service</span>
            <strong>Wed–Fri, 7:00–8:30 PM</strong>
          </div>
          <div>
            <span>Find us</span>
            <strong>Community 2, Tema</strong>
          </div>
        </div>
      </div>

      <div className="hero-visual reveal reveal-right">
        <div className="image-card main-image">
          <img src={heroImage} alt="Church worship gathering" fetchPriority="high" decoding="async" />
        </div>
        <div className="floating-card card-one">
          
          <span><strong>Best Qoute</strong></span>
          <strong><i>"Your Warfare Determines Your Welfare"</i></strong>
        </div>
        <div className="floating-card card-two">
          <strong>GENERAL OVERSEER</strong>
          <span><strong>Prophet Job Aidoo</strong></span>
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

function ChurchLifeSection() {
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(galleryPageSize);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!selectedMoment) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedMoment(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      triggerRef.current?.focus();
    };
  }, [selectedMoment]);

  return (
    <section id="gallery" className="gallery-section" aria-labelledby="church-life-title">
      <div className="section-heading reveal">
        <p className="eyebrow">Life at Living Dove Chapel</p>
        <h2 id="church-life-title">A little glimpse of life together</h2>
        <p className="section-intro">Gathering in worship, growing in faith, and serving our community.</p>
      </div>

      <div className="gallery-grid" id="church-life-photos">
        {churchLife.slice(0, visiblePhotoCount).map((moment) => (
          <button
            className="gallery-card reveal"
            key={moment.title}
            type="button"
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setSelectedMoment(moment);
            }}
            aria-label={`View photo: ${moment.title}`}
          >
            <img src={moment.image} alt={moment.alt} loading="lazy" decoding="async" />
            <span className="gallery-card-caption">{moment.title}<span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>

      {visiblePhotoCount < churchLife.length && (
        <div className="gallery-load-more">
          <p aria-live="polite">
            Showing {Math.min(visiblePhotoCount, churchLife.length)} of {churchLife.length} photos
          </p>
          <button
            className="gallery-load-more-button"
            type="button"
            aria-controls="church-life-photos"
            onClick={() => setVisiblePhotoCount((count) => Math.min(count + galleryPageSize, churchLife.length))}
          >
            Load more photos
          </button>
        </div>
      )}

      {selectedMoment && (
        <div
          className="gallery-lightbox"
          role="presentation"
          onClick={() => setSelectedMoment(null)}
        >
          <div
            className="lightbox-panel"
            role="dialog"
            aria-modal="true"
            aria-label={selectedMoment.title}
            onKeyDown={(event) => {
              if (event.key === 'Tab') {
                event.preventDefault();
                closeButtonRef.current?.focus();
              }
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="lightbox-close"
              type="button"
              aria-label="Close photo"
              onClick={() => setSelectedMoment(null)}
            >
              ×
            </button>
            <img src={selectedMoment.image} alt={selectedMoment.alt} decoding="async" />
            <p>{selectedMoment.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function LeadersSection() {
  return (
    <section id="leaders" className="leaders-section" aria-labelledby="leaders-title">
      <div className="section-heading reveal">
        <p className="eyebrow dark">People who serve</p>
        <h2 id="leaders-title">Our pastors</h2>
        <p className="section-intro">
          Meet the pastors serving Living Dove Chapel. Names and photos marked for updating are temporary placeholders.
        </p>
      </div>

      <div className="profiles-grid">
        {pastors.map((pastor) => (
          <ProfileCard key={pastor.id} profile={pastor} />
        ))}
      </div>
    </section>
  );
}

function ProfileCard({ profile }) {
  return (
    <article className="profile-card reveal" aria-label={`${profile.name}, ${profile.role}`}>
      <div
        className={`profile-photo${profile.image ? '' : ' profile-photo-placeholder'}`}
        role={profile.image ? undefined : 'img'}
        aria-label={profile.image ? undefined : `Temporary profile photo for ${profile.name}`}
      >
        {profile.image ? (
          <img src={profile.image} alt={`${profile.name}, ${profile.role}`} loading="lazy" decoding="async" />
        ) : (
          <span aria-hidden="true">{profile.initials}</span>
        )}
        {!profile.image && <span className="profile-photo-label">Add profile photo</span>}
      </div>
      <div className="profile-card-copy">
        <h3>{profile.name}</h3>
        <p>{profile.role}</p>
      </div>
    </article>
  );
}

function DepartmentsSection() {
  return (
    <section id="departments" className="departments-section" aria-labelledby="departments-title">
      <div className="section-heading reveal">
        <p className="eyebrow dark">Serving together</p>
        <h2 id="departments-title">Our church departments</h2>
        <p className="section-intro">
          Explore the teams serving across our church. Member names and photos marked for updating are temporary placeholders.
        </p>
      </div>

      {departmentProfiles.map((department) => (
        <section
          className="department-group"
          key={department.id}
          aria-labelledby={`${department.id}-title`}
        >
          <div className="department-heading">
            <div>
              <h3 id={`${department.id}-title`}>{department.title}</h3>
              <p>{department.text}</p>
            </div>
            <span>8 members</span>
          </div>
          <div className="profiles-grid">
            {department.profiles.map((profile) => (
              <ProfileCard key={`${department.id}-${profile.id}`} profile={profile} />
            ))}
          </div>
        </section>
      ))}
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
            <div className="event-date">
              <span>{gathering.day}</span>
              <strong>{gathering.time}</strong>
            </div>
            <h3>{gathering.title}</h3>
            <a href="tel:+233257121701">Call about visiting</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function BranchesSection() {
  return (
    <section id="branches" className="branches-section" aria-labelledby="branches-title">
      <div className="section-heading reveal">
        <p className="eyebrow dark">One church, many homes</p>
        <h2 id="branches-title">Find your Living Dove Chapel branch</h2>
        <p className="section-intro">Join us at the location that is closest to you.</p>
      </div>

      <div className="branches-grid">
        {branches.map((branch) => (
          <article className={`branch-card${branch.isMain ? ' branch-card-main' : ''} reveal`} key={branch.name}>
            <span className="branch-marker" aria-hidden="true">✦</span>
            {branch.isMain && <span className="branch-tag">Main branch</span>}
            <h3>{branch.name}</h3>
            <p>{branch.location}, Ghana</p>
            <a href={directionsUrl(branch)} target="_blank" rel="noreferrer">
              Get directions <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function DirectionsSection() {
  const mainBranch = branches[0];

  return (
    <section id="directions" className="directions-section" aria-labelledby="directions-title">
      <div className="directions-copy reveal">
        <p className="eyebrow">Plan your visit</p>
        <h2 id="directions-title">We can’t wait to welcome you</h2>
        <p>Our main branch is Jesus Temple in Community 2, Tema. Use the map to plan your visit.</p>
        <a className="primary-btn" href={directionsUrl(mainBranch)} target="_blank" rel="noreferrer">
          Get directions to the main branch
        </a>
        
      </div>
      <div className="directions-map reveal reveal-right">
        <iframe
          title="Map showing Jesus Temple, Community 2, Tema"
          src="https://maps.google.com/maps?q=Jesus%20Temple%2C%20Community%202%2C%20Tema%2C%20Ghana&t=&z=14&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}

function WatchLiveSection() {
  return (
    <section id="live" className="live-section reveal" aria-labelledby="live-title">
      <div>
        <p className="eyebrow">Worship with us online</p>
        <h2 id="live-title">Join a Living Dove Chapel service on Facebook</h2>
      </div>
      <a
        className="secondary-btn"
        href="https://www.facebook.com/100069340956142/videos/living-dove-chapel/1543925197231340/"
        target="_blank"
        rel="noreferrer"
      >
        Watch the service
      </a>
    </section>
  );
}

function GiveSection() {
  return (
    <section className="give-section reveal">
      <div className="give-content">
        <div className="give-copy">
          <p className="eyebrow">Support the ministry</p>
          <h2>Partner with the work of Living Dove Chapel</h2>
          <p className="giving-intro">Thank you for helping us share the gospel and serve our community.</p>
          <div className="giving-options">
            {givingOptions.map((option) => (
              <div className="giving-option" key={option.provider}>
                <span>{option.provider}</span>
                <a href={`tel:${option.phone}`}>{option.number}</a>
              </div>
            ))}
          </div>
          <p className="bank-details">
            For bank transfer details, <a href="mailto:hello@livingdovechapel.org?subject=Bank%20transfer%20details">contact the church</a>.
          </p>
        </div>
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
          <a href="#gallery">Gallery</a>
          <a href="#leaders">Our leaders</a>
          <a href="#departments">Departments</a>
          <a href="#events">Events</a>
          <a href="#branches">Branches</a>
          <a href="#live">Watch live</a>
        </div>

        <div className="footer-links">
          <h4>Contact</h4>
          <a href="mailto:hello@livingdovechapel.org">hello@livingdovechapel.org</a>
          <a href="tel:+233257121701">+233 257 121 701</a>
          <span>Community 2, Tema, Ghana</span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Living+Dove+Chapel%2C+Tema%2C+Ghana"
            target="_blank"
            rel="noreferrer"
          >
            Find us on the map
          </a>
        </div>

        <div className="footer-social">
          <h4>Connect</h4>
          <div className="social-row">
            <a
              className="social-facebook"
              href="https://www.facebook.com/100069340956142/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Living Dove Chapel on Facebook"
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>
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
