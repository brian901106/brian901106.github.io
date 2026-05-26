import './App.css'

export default function App() {
  return (
    <div className="site-wrapper">

      {/* HEADER / NAV */}
      <header className="site-header">
        <div className="logo">
          <div className="logo-icon">&#9783;</div>
        </div>
        <nav className="site-nav">
          <a href="#">Home</a>
          <a href="#">Publications</a>
          <a href="/game/index.html" target="_blank" rel="noopener noreferrer">Game Demo</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">DR. KAELEN VALERIUS</h1>
        <p className="hero-subtitle">Decoding the Syntax of Meaning in a Digital World</p>
      </section>

      {/* VISUAL BANNER + PORTRAIT */}
      <section className="banner-section">
        <div className="banner-grid"></div>
        <div className="banner-portrait">
          <div className="portrait-placeholder"></div>
          <a href="/game/index.html" target="_blank" rel="noopener noreferrer" className="explore-link">
            Play My Game Demo &gt;
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-image"></div>
        <div className="about-content">
          <h2 className="section-title">An Inquiry into Computational Semiotics</h2>
          <hr className="section-divider" />
          <p className="about-text">
            I am a researcher dedicated to exploring the intersection of language, logic, and
            artificial intelligence. My work focuses on building models that can comprehend and
            generate meaning, moving beyond mere pattern recognition to achieve a deeper level
            of semantic understanding.
          </p>
        </div>
      </section>

      {/* CORE AREAS SECTION */}
      <section className="areas-section">
        <hr className="section-divider" />
        <h2 className="section-title">Core Areas of Investigation</h2>
        <div className="areas-grid">
          <div className="area-card card-dark"></div>
          <div className="area-card card-green"></div>
          <a
            className="area-card card-purple area-card-link"
            href="/game/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="area-card-label">
              Manor Hunt<br />
              <small>Game Demo ›</small>
            </span>
          </a>
        </div>
      </section>

      {/* PUBLICATIONS SECTION */}
      <section className="publications-section">
        <hr className="section-divider" />
        <h2 className="section-title">Selected Works &amp; Papers</h2>
        <div className="publications-layout">
          <div className="pub-left">
            <hr className="section-divider" />
            <p className="pub-description">
              A curated collection of my most impactful contributions to the field.
              For a comprehensive list, please visit the publications page.
            </p>
          </div>
          <div className="pub-right">
            <hr className="section-divider" />
            <a href="#" className="explore-link">View All Publications &gt;</a>
            <div className="pub-card">
              <h3>Deconstructing Bias in Neural Networks</h3>
            </div>
            <hr className="section-divider" />
            <div className="pub-card"></div>
          </div>
        </div>
      </section>

      {/* COLLABORATE SECTION */}
      <section className="collaborate-section">
        <hr className="section-divider" />
        <h2 className="section-title">Let's Collaborate</h2>
        <div className="collaborate-layout">
          <div className="collab-left">
            <hr className="section-divider" />
            <p className="collab-text">
              I am always open to new ideas, speaking invitations, and collaborative projects.
            </p>
          </div>
          <div className="collab-right">
            <hr className="section-divider" />
            <a href="#" className="explore-link">Get in Touch &gt;</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <hr className="footer-top-divider" />
        <div className="footer-brand">
          <span className="footer-icon">&#9783;</span>
          <span className="footer-name">DR. KAELEN VALERIUS</span>
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>Connect</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>500 Terry Francine St<br />San Francisco, CA 94158</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>123-456-7890<br />info@mysite.com</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>LinkedIn<br />Discord<br />X</p>
          </div>
        </div>
        <div className="footer-grid footer-nav">
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>Navigation &amp; Legal</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>
              <a href="#">Home</a><br />
              Publications<br />
              <a href="/game/index.html" target="_blank" rel="noopener noreferrer">Game Demo</a><br />
              Contact
            </p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>Privacy Policy<br />Accessibility Statement</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>&copy; 2025<br />All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
