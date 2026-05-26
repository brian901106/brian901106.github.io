import './App.css'

export default function App() {
  return (
    <div className="site-wrapper">

      {/* HEADER / NAV */}
      <header className="site-header">
        <div className="logo">
          <div className="logo-icon">沈</div>
        </div>
        <nav className="site-nav">
          <a href="#">首頁</a>
          <a href="#research">研究</a>
          <a href="#publications">發表</a>
          <a href="#contact">聯絡</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">沈志謙</h1>
        <p className="hero-subtitle">
          研究生 · 電腦視覺（Computer Vision）與視覺 SLAM 工程師
        </p>
      </section>

      {/* VISUAL BANNER + PORTRAIT */}
      <section className="banner-section">
        <div className="banner-grid"></div>
        <div className="banner-portrait">
          <div className="portrait-placeholder"></div>
          <a href="/game/index.html" target="_blank" rel="noopener noreferrer" className="explore-link">
            遊玩我的小遊戲 Demo &gt;
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-image"></div>
        <div className="about-content">
          <h2 className="section-title">
            視覺 SLAM、3D 感知與視障輔助導航
          </h2>
          <hr className="section-divider" />
          <p className="about-text">
            研究領域涵蓋電腦視覺（Computer Vision）、視覺 SLAM（Visual SLAM）
            與三維點雲處理（3D Point Cloud Processing），核心目標為
            建立適用於視障者的輔助導航系統，以及浮空障礙物（Floating Obstacle）的辨識技術。
            具備以 RGB 影像、點雲與相機姿態資訊建構環境理解系統的實務經驗，
            並曾深入修改 ORB-SLAM3 原始碼，支援姿態輸出、點雲投影與語意資訊整合。
          </p>
        </div>
      </section>

      {/* CORE AREAS SECTION */}
      <section className="areas-section" id="research">
        <hr className="section-divider" />
        <h2 className="section-title">核心研究領域</h2>
        <div className="areas-grid">
          <div className="area-card card-dark area-card-labeled">
            <span className="area-card-label">
              視覺 SLAM<br />
              <small>Visual SLAM · ORB-SLAM2 / ORB-SLAM3</small>
            </span>
          </div>
          <div className="area-card card-green area-card-labeled">
            <span className="area-card-label">
              三維點雲處理<br />
              <small>3D Point Cloud · PCL · RANSAC</small>
            </span>
          </div>
          <div className="area-card card-purple area-card-labeled">
            <span className="area-card-label">
              視障輔助導航<br />
              <small>Assistive Navigation · Ground Plane Estimation</small>
            </span>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS SECTION */}
      <section className="publications-section" id="publications">
        <hr className="section-divider" />
        <h2 className="section-title">精選研究專案</h2>
        <div className="publications-layout">
          <div className="pub-left">
            <hr className="section-divider" />
            <p className="pub-description">
              以幾何方法與視覺感知為核心，研究如何讓視障者在真實環境中
              安全且可靠地識別周遭障礙物。
            </p>
          </div>
          <div className="pub-right">
            <hr className="section-divider" />
            <div className="pub-card">
              <h3>浮空障礙物偵測與視障輔助導航</h3>
              <p className="pub-meta">
                Floating Object Detection · Local Plane Fitting · Vertical Connectivity · Temporal Correction
              </p>
              <p className="pub-desc">
                提出以局部平面擬合（Local Plane Fitting）與垂直連通性分析
                為核心的方法，透過動態地面更新與棋盤區域分割（Chessboard Area Segmentation），
                解決傳統固定地面估計導致浮空障礙物誤判的問題，
                提升視障者於真實環境中的安全性。
              </p>
            </div>
            <hr className="section-divider" />
            <div className="pub-card">
              <h3>ORB-SLAM3 修改與擴充</h3>
              <p className="pub-meta">
                C++ · ROS · Semantic Mapping · Point Cloud Projection
              </p>
              <p className="pub-desc">
                擴充 ORB-SLAM3 以支援一般幀姿態輸出、2D–3D 對應關係紀錄、
                點雲投影至影像平面，以及地面感知語意地圖建構（Ground-aware Semantic Mapping）
                與密集投影生成。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIDE PROJECTS SECTION */}
      <section className="side-projects-section">
        <hr className="section-divider" />
        <h2 className="section-title">副專案</h2>
        <div className="side-projects-layout">
          <div className="side-left">
            <hr className="section-divider" />
            <p className="side-description">
              研究之外的創作專案，以遊戲設計探索敘事與介面互動。
            </p>
          </div>
          <div className="side-right">
            <hr className="section-divider" />
            <a
              className="side-project-card"
              href="/game/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="side-project-bg card-purple"></div>
              <div className="side-project-info">
                <h3>Manor Hunt</h3>
                <p className="pub-meta">卡牌敘事遊戲 · React · Vanilla JS</p>
                <p className="pub-desc">
                  哥德風格的卡牌敘事遊戲原型，玩家在廢棄莊園中透過抉擇影響角色命運。
                  含完整的數值系統（理智 / 水分 / 恐懼 / 流血）、多結局與三種視角。
                </p>
                <span className="side-project-link">遊玩 Demo ›</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* COLLABORATE SECTION */}
      <section className="collaborate-section" id="contact">
        <hr className="section-divider" />
        <h2 className="section-title">合作邀請</h2>
        <div className="collaborate-layout">
          <div className="collab-left">
            <hr className="section-divider" />
            <p className="collab-text">
              歡迎研究合作、博士課程諮詢，以及電腦視覺與機器人工程相關職缺洽詢。
            </p>
          </div>
          <div className="collab-right">
            <hr className="section-divider" />
            <a href="mailto:" className="explore-link">聯絡我 &gt;</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <hr className="footer-top-divider" />
        <div className="footer-brand">
          <span className="footer-icon">沈</span>
          <span className="footer-name">沈志謙　SHEN CHIH-CHIEN</span>
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>所在地</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>早稻田大學<br />東京，日本</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>語言能力<br />中文（母語）· 英文 · 日文（學習中）</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>GitHub<br />LinkedIn</p>
          </div>
        </div>
        <div className="footer-grid footer-nav">
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>導覽</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>
              <a href="#">首頁</a><br />
              <a href="#research">研究</a><br />
              <a href="#publications">發表</a><br />
              <a href="#contact">聯絡</a>
            </p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>
              <a href="/game/index.html" target="_blank" rel="noopener noreferrer">
                副專案 Demo
              </a>
            </p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>&copy; 2025 沈志謙<br />版權所有</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
