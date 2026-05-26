import './App.css'

export default function App() {
  return (
    <div className="site-wrapper">

      {/* HEADER / NAV */}
      <header className="site-header">
        <div className="logo">
          <div className="logo-icon">SC</div>
        </div>
        <nav className="site-nav">
          <a href="#">Home</a>
          <a href="#research">Research</a>
          <a href="#publications">Publications</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">SHEN CHIH-CHIEN</h1>
        <p className="hero-subtitle">
          Graduate Researcher · Computer Vision &amp; Visual SLAM Engineer
        </p>
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
          <h2 className="section-title">Visual SLAM, 3D Perception &amp; Assistive Navigation</h2>
          <hr className="section-divider" />
          <p className="about-text">
            Specializing in Computer Vision, Visual SLAM, and 3D Point Cloud Processing,
            with a focus on assistive navigation systems for the visually impaired and
            floating obstacle detection. I have hands-on experience building
            environment-understanding systems from RGB imagery, point clouds, and camera
            pose data — including deep modifications to ORB-SLAM3 for pose output, point
            cloud projection, and semantic integration.
          </p>
        </div>
      </section>

      {/* CORE AREAS SECTION */}
      <section className="areas-section" id="research">
        <hr className="section-divider" />
        <h2 className="section-title">Core Areas of Investigation</h2>
        <div className="areas-grid">
          <div className="area-card card-dark area-card-labeled">
            <span className="area-card-label">
              Visual SLAM<br />
              <small>ORB-SLAM2 / ORB-SLAM3</small>
            </span>
          </div>
          <div className="area-card card-green area-card-labeled">
            <span className="area-card-label">
              3D Point Cloud<br />
              <small>PCL · Ground Estimation · RANSAC</small>
            </span>
          </div>
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
      <section className="publications-section" id="publications">
        <hr className="section-divider" />
        <h2 className="section-title">Selected Research Projects</h2>
        <div className="publications-layout">
          <div className="pub-left">
            <hr className="section-divider" />
            <p className="pub-description">
              Research focused on enabling safe, real-world navigation for
              visually impaired users through robust 3D geometry and
              vision-based methods.
            </p>
          </div>
          <div className="pub-right">
            <hr className="section-divider" />
            <div className="pub-card">
              <h3>Floating Object Detection for Visually Impaired Assistance</h3>
              <p className="pub-meta">
                Local Plane Fitting · Vertical Connectivity · Temporal Correction
              </p>
              <p className="pub-desc">
                A novel method using dynamic local ground updating and chessboard
                area segmentation to distinguish floating obstacles from the ground
                plane, improving obstacle detection reliability in real-world environments.
              </p>
            </div>
            <hr className="section-divider" />
            <div className="pub-card">
              <h3>Modification and Extension of ORB-SLAM3</h3>
              <p className="pub-meta">
                C++ · ROS · Semantic Mapping · Point Cloud Projection
              </p>
              <p className="pub-desc">
                Extended ORB-SLAM3 to support normal-frame pose output, 2D–3D
                correspondence logging, image-plane point cloud projection, and
                ground-aware semantic mapping with dense projection generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COLLABORATE SECTION */}
      <section className="collaborate-section" id="contact">
        <hr className="section-divider" />
        <h2 className="section-title">Let's Collaborate</h2>
        <div className="collaborate-layout">
          <div className="collab-left">
            <hr className="section-divider" />
            <p className="collab-text">
              Open to research collaborations, PhD program discussions, and
              Computer Vision / Robotics engineering opportunities.
            </p>
          </div>
          <div className="collab-right">
            <hr className="section-divider" />
            <a href="mailto:" className="explore-link">Get in Touch &gt;</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <hr className="footer-top-divider" />
        <div className="footer-brand">
          <span className="footer-icon">SC</span>
          <span className="footer-name">SHEN CHIH-CHIEN</span>
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>Location</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>Waseda University<br />Tokyo, Japan</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>
              Languages<br />
              Chinese · English · Japanese
            </p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>GitHub<br />LinkedIn</p>
          </div>
        </div>
        <div className="footer-grid footer-nav">
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>Navigation</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>
              <a href="#">Home</a><br />
              <a href="#research">Research</a><br />
              <a href="#publications">Publications</a><br />
              <a href="#contact">Contact</a>
            </p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>
              <a href="/game/index.html" target="_blank" rel="noopener noreferrer">
                Game Demo
              </a>
            </p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>&copy; 2025 Shen Chih-Chien.<br />All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
