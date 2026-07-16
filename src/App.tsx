import './App.css'
import wasedaImg from './assets/waseda.jpg'

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
          <a href="#education">學歷</a>
          <a href="#experience">經歷</a>
          <a href="#contact">聯絡</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">沈志謙</h1>
        <p className="hero-subtitle">
          早稻田大學碩士 · 電腦視覺（Computer Vision）與視覺 SLAM 工程師
        </p>
      </section>

      {/* VISUAL BANNER + PORTRAIT */}
      <section className="banner-section">
        <div className="banner-grid"></div>
        <div className="banner-portrait">
          <div className="portrait-placeholder"></div>
          <p className="banner-bio">
            早稻田大學情報生產系統研究科碩士，專注於電腦視覺與視覺 SLAM，
            以視障者輔助導航為核心研究方向。
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <img className="about-image" src={wasedaImg} alt="早稻田大學情報生產系統研究科" />
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
              <h3>
                碩士論文：3D Boundary Integration-Based Stair Region Reconstruction
                in Floating Object Detection for Visually Impaired People
              </h3>
              <p className="pub-meta">
                Master Thesis · ORB-SLAM3 · Point Cloud · Monocular Depth Estimation
              </p>
              <p className="pub-desc">
                以單目鏡頭（1920×1080 / 60fps）輸入，輸出懸浮障礙物
                （超出導盲杖偵測高度的物體）高度。在樓梯與斜坡等地面高度不斷變化的情境下，
                以 SLAM 結合點雲處理與 SOTA 單目視覺演算法穩定估計障礙物到地面的距離。
                提出的樓梯區域重建方法將整體偵測率自 0.55 提升至 0.82
                （上行 0.36 → 0.73、下行 0.73 → 0.91）。
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

      {/* EDUCATION SECTION */}
      <section className="publications-section" id="education">
        <hr className="section-divider" />
        <h2 className="section-title">學歷</h2>
        <div className="publications-layout">
          <div className="pub-left">
            <hr className="section-divider" />
            <p className="pub-description">
              從資訊工程紮根，到影像資訊系統的專門研究。
            </p>
          </div>
          <div className="pub-right">
            <hr className="section-divider" />
            <div className="pub-card">
              <h3>早稻田大學 · 碩士</h3>
              <p className="pub-meta">2023 – 2025 · 情報生產系統研究科 集成系統領域</p>
              <p className="pub-desc">
                影像資訊系統實驗室（Image Information System Lab），指導教授：池永 剛。
                實驗室由副院長領導，每週兩次英文 Meeting，
                與中國東南大學、日本 Panasonic 具合作關係。
              </p>
            </div>
            <hr className="section-divider" />
            <div className="pub-card">
              <h3>國立臺北科技大學 · 學士</h3>
              <p className="pub-meta">2020 – 2023 · 電資學士班 主修資訊工程</p>
              <p className="pub-desc">
                GPA 3.8 / 4.0，系排名前 7%（5 / 71），最後一學期單學期系排名第一。
                曾任程式設計社幹部、系學會副會長、新生迎新隔宿露營總召。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORK EXPERIENCE SECTION */}
      <section className="publications-section" id="experience">
        <hr className="section-divider" />
        <h2 className="section-title">工作經歷</h2>
        <div className="publications-layout">
          <div className="pub-left">
            <hr className="section-divider" />
            <p className="pub-description">
              替代役期間服務於警察局派出所，
              以程式自動化改善行政流程，將每日例行作業從數十分鐘縮短至數秒。
            </p>
          </div>
          <div className="pub-right">
            <hr className="section-divider" />
            <div className="pub-card">
              <h3>每日排班程式</h3>
              <p className="pub-meta">替代役 · 警局勤務自動化 · Python</p>
              <p className="pub-desc">
                原人工流程需每日手動輪轉排班順序、確認請假並逐一修改班表，約 30 分鐘。
                程式只需輸入第一班人員與當日請假者，
                即依固定輪班順序自動生成當日班表，數秒完成。
              </p>
            </div>
            <hr className="section-divider" />
            <div className="pub-card">
              <h3>每月輪休管理工具</h3>
              <p className="pub-meta">替代役 · 警局勤務自動化 · Python · Excel / Google 表單整合</p>
              <p className="pub-desc">
                自動由上月大輪番表生成下月輪休表，
                並整合 Google 表單請假通知與人員資料，自動推算每人請假日對應班號以供核假。
                原人工作業約 3 小時，程式數秒完成。
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
              歡迎電腦視覺與機器人工程相關職缺洽詢。
            </p>
          </div>
          <div className="collab-right">
            <hr className="section-divider" />
            <a href="mailto:brian1030028@gmail.com" className="explore-link">
              brian1030028@gmail.com &gt;
            </a>
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
            <p>語言能力<br />中文（母語）· 英文 · 日文</p>
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
              <a href="#education">學歷</a><br />
              <a href="#experience">經歷</a><br />
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
            <p>&copy; 2026 沈志謙<br />版權所有</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
