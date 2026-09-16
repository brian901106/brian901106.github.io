import { useEffect } from 'react'
import './App.css'
import posterImg from './assets/poster.png'
import wasedaImg from './assets/waseda.jpg'
import portraitImg from './assets/portrait.jpg'

// 進場動畫預設不啟用，等 observer 掛上才標記 idle，
// 這樣 JS 未執行時內容仍然直接可見。
function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    targets.forEach((el) => {
      el.dataset.revealState = 'idle'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          ;(entry.target as HTMLElement).dataset.revealState = 'done'
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useScrollReveal()

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
        <h1 className="hero-title" data-reveal="fade">沈志謙</h1>
        <hr className="section-divider" />
        <p className="hero-subtitle" data-reveal="fade">
          早稻田大學碩士 · 電腦視覺（Computer Vision）與視覺 SLAM 工程師
        </p>
      </section>

      {/* VISUAL BANNER + PORTRAIT */}
      <section className="banner-section">
        <div className="banner-grid" data-reveal="slide"></div>
        <div className="banner-portrait">
          <img className="portrait-placeholder" src={portraitImg} alt="沈志謙" data-reveal="slide" />
          <p className="banner-bio" data-reveal="fade">
            早稻田大學 IPS 研究院（情報生產系統研究科）碩士畢業，
            專注於電腦視覺與視覺 SLAM，以視障者輔助導航為核心研究方向。
          </p>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="records-section" id="education">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">學歷</h2>
        <div className="records-layout">
          <div className="info-left" data-reveal="fade">
            <hr className="section-divider" />
            <p className="info-description">
              從資訊工程紮根，到影像資訊系統的專門研究。
            </p>
          </div>
          <div className="info-right">
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <img
                className="info-card-image"
                src={wasedaImg}
                alt="早稻田大學情報生產系統研究科"
                data-reveal="slide"
              />
              <h3>早稻田大學 IPS 研究院 · 碩士</h3>
              <p className="info-meta">2023 – 2025 · 情報生產系統研究科 集成系統領域 · 福岡北九州</p>
              <p className="info-desc">
                影像資訊系統實驗室（Image Information System Lab），指導教授：池永 剛。
                實驗室由副院長領導，每週兩次英文 Meeting，
                與中國東南大學、日本 Panasonic 具合作關係。
              </p>
            </div>
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>國立臺北科技大學 · 學士</h3>
              <p className="info-meta">2020 – 2023 · 電資學士班 主修資訊工程</p>
              <p className="info-desc">
                GPA 3.8 / 4.0，系排名前 7%（5 / 71），最後一學期單學期系排名第一。
                曾任程式設計社幹部、系學會副會長、新生迎新隔宿露營總召。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS SECTION */}
      <section className="records-section" id="thesis">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">畢業論文</h2>
        <div className="records-layout">
          <div className="info-left" data-reveal="fade">
            <hr className="section-divider" />
            <p className="info-description">
              視覺 SLAM、3D 感知與視障輔助導航。研究領域涵蓋電腦視覺（Computer Vision）、
              視覺 SLAM（Visual SLAM）與三維點雲處理（3D Point Cloud Processing），
              核心目標為建立適用於視障者的輔助導航系統，以及浮空障礙物
              （Floating Obstacle）的辨識技術。具備以 RGB 影像、點雲與相機姿態資訊
              建構環境理解系統的實務經驗，並曾深入修改 ORB-SLAM3 原始碼，
              支援姿態輸出、點雲投影與語意資訊整合。
            </p>
          </div>
          <div className="info-right">
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>
                碩士論文：3D Boundary Integration-Based Stair Region Reconstruction
                in Floating Object Detection for Visually Impaired People
              </h3>
              <p className="info-meta">
                Master Thesis · ORB-SLAM3 · Point Cloud · Monocular Depth Estimation
              </p>
              <p className="info-desc">
                以單目鏡頭（1920×1080 / 60fps）輸入，輸出懸浮障礙物
                （超出導盲杖偵測高度的物體）高度。在樓梯與斜坡等地面高度不斷變化的情境下，
                以 SLAM 結合點雲處理與 SOTA 單目視覺演算法穩定估計障礙物到地面的距離。
                提出的樓梯區域重建方法將整體偵測率自 0.55 提升至 0.82
                （上行 0.36 → 0.73、下行 0.73 → 0.91）。
              </p>
              <a href={posterImg} target="_blank" rel="noopener noreferrer" className="poster-link">
                <img className="poster-image" src={posterImg} alt="碩士論文研究海報" data-reveal="slide" />
                <span className="explore-link">點擊查看完整海報 &gt;</span>
              </a>
            </div>
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>ORB-SLAM3 修改與擴充</h3>
              <p className="info-meta">
                C++ · ROS · Semantic Mapping · Point Cloud Projection
              </p>
              <p className="info-desc">
                擴充 ORB-SLAM3 以支援一般幀姿態輸出、2D–3D 對應關係紀錄、
                點雲投影至影像平面，以及地面感知語意地圖建構（Ground-aware Semantic Mapping）
                與密集投影生成。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORK EXPERIENCE SECTION */}
      <section className="records-section" id="experience">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">工作經歷</h2>
        <div className="records-layout">
          <div className="info-left" data-reveal="fade">
            <hr className="section-divider" />
            <p className="info-description">
              替代役期間服務於臺中市警察局第二分局，
              日常勤務為巡邏出勤與值班台，並運用課餘時間以程式自動化協助改善派出所行政流程。
            </p>
            <p className="info-description">
              服勤期間積極把握機會，榮譽假拿滿，並考取 EMT1（緊急救護技術員）、
              防災士等證照。
            </p>
          </div>
          <div className="info-right">
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>臺中市警察局第二分局 · 替代役</h3>
              <p className="info-meta">本職勤務外自主改善 · Python 自動化工具 · 已實際導入使用</p>
              <p className="info-desc">
                服替代役期間，於本職勤務外改善單位每月人工排班流程，
                設計並開發自動化工具，已實際導入使用。服勤期間累積敘獎，
                <strong>榮譽假核給達上限</strong>。
              </p>
              <p className="info-desc">
                排班、輪休核假、巡簽統計、民防通知書等流程原需大量人工比對與重複作業，
                單靠 Python 腳本即可解決，技術門檻本身並不高，
                我覺得這件事比較能代表我的一個特質，就是我不太會只把自己限制在職務說明裡面。
                <strong>只要我看到一個明確的問題，而且判斷自己有機會解決，
                我通常會想辦法把它做出來，而不是等別人交辦。</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE AREAS SECTION */}
      <section className="areas-section" id="research">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">核心研究領域</h2>
        <div className="areas-grid">
          <div className="area-card" data-reveal="fade">
            <div className="area-pattern card-dark"></div>
            <h3>視覺 SLAM</h3>
            <span className="area-card-meta">Visual SLAM · ORB-SLAM2 / ORB-SLAM3</span>
          </div>
          <div className="area-card" data-reveal="fade">
            <div className="area-pattern card-green"></div>
            <h3>三維點雲處理</h3>
            <span className="area-card-meta">3D Point Cloud · PCL · RANSAC</span>
          </div>
          <div className="area-card" data-reveal="fade">
            <div className="area-pattern card-purple"></div>
            <h3>視障輔助導航</h3>
            <span className="area-card-meta">Assistive Navigation · Ground Plane Estimation</span>
          </div>
        </div>
      </section>

      {/* SIDE PROJECTS SECTION */}
      <section className="side-projects-section">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">副專案</h2>
        <div className="side-projects-layout">
          <div className="side-left" data-reveal="fade">
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
              data-reveal="fade"
            >
              <div className="side-project-bg card-purple"></div>
              <div className="side-project-info">
                <h3>Manor Hunt</h3>
                <p className="info-meta">卡牌敘事遊戲 · React · Vanilla JS</p>
                <p className="info-desc">
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
        <h2 className="section-title" data-reveal="fade">合作邀請</h2>
        <div className="collaborate-layout">
          <div className="collab-left" data-reveal="fade">
            <hr className="section-divider" />
            <p className="collab-text">
              歡迎電腦視覺與機器人工程相關職缺洽詢。
            </p>
          </div>
          <div className="collab-right" data-reveal="fade">
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
          <span className="footer-name">沈志謙 SHEN CHIH-CHIEN</span>
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>所在地</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>台灣桃園</p>
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
