import { useEffect } from 'react'
import './App.css'
import posterImg from './assets/poster.png'
import wasedaImg from './assets/waseda.jpg'
import portraitImg from './assets/portrait.jpg'
import stairImg from './assets/projects/stair-research.jpg'
import faceLive2dImg from './assets/projects/face-live2d.jpg'
import fpgaCalcImg from './assets/projects/fpga-calculator.jpg'
import catchCoinImg from './assets/projects/catch-the-coin.jpg'
import goldMinerImg from './assets/projects/gold-miner.jpg'
import unityPuzzleImg from './assets/projects/unity-puzzle.jpg'
import pipelineCpuImg from './assets/projects/pipeline-cpu.jpg'
import stairSegImg from './assets/projects/stair-segmentation.jpg'

const keywords = [
  'Visual SLAM',
  '三維點雲處理',
  '平面重建',
  '影像分割與追蹤',
  '2D–3D 語義融合',
  '臉部特徵點偵測',
  'Verilog／FPGA',
]

const projects = [
  {
    img: faceLive2dImg,
    alt: '以臉部特徵點驅動 Live2D 角色的網頁畫面',
    title: '臉部特徵點 × Live2D',
    meta: '北科電腦動畫課 · Face Landmark · 2022 秋',
    desc: '用臉部特徵點即時驅動網頁 Live2D 角色，並實際用於直播。',
  },
  {
    img: goldMinerImg,
    alt: '黃金礦工復刻遊戲畫面',
    title: '黃金礦工復刻',
    meta: 'C++ · OpenCV · 北科 OOP 專題 · 2023/02 – 2023/06',
    desc: '2 人團隊主要開發者，以 C++ 物件導向完成 10 個關卡；以 OpenCV 自製動畫素材工具。',
  },
  {
    img: unityPuzzleImg,
    alt: 'Unity 雙人解謎遊戲場景畫面',
    title: 'Unity 雙人解謎遊戲',
    meta: 'Unity · C# · 北科畢業專題 · 2023',
    desc: '雙人合作解謎遊戲，負責主要 C# 遊戲程式。',
  },
  {
    img: fpgaCalcImg,
    alt: 'FPGA 開發板上的七段顯示器計算機',
    title: 'FPGA 計算機',
    meta: 'Verilog · Quartus · FPGA · 2023/12',
    desc: 'Verilog RTL → Testbench 模擬 → 合成 → 上板驗證，支援小數運算的電子計算機。',
  },
  {
    img: pipelineCpuImg,
    alt: '16-bit 管線處理器的模擬波形：指令依序流過 ID、EX、MEM、WB 各級',
    title: '16-bit 管線處理器',
    meta: 'Verilog · Python · Design Compiler · 2024/02',
    desc: '以 forwarding、stall 與 flush 處理 pipeline hazard，自行擴充 5 道指令並撰寫 Python 組譯器，以 Design Compiler 完成邏輯合成。',
  },
  {
    img: catchCoinImg,
    alt: 'Spartan-3 開發板接上 VGA 執行 Catch The Coin 遊戲',
    title: 'Catch The Coin',
    meta: 'Verilog · Spartan-3 · VGA · 2024/06',
    desc: '自行實作 640×480 VGA 時序即時繪製畫面，按鈕操作接金幣、七段顯示器顯示分數。',
  },
  {
    img: stairSegImg,
    alt: '分割模型微調前後比較：微調後能分割出樓梯與地面',
    title: '樓梯／地面分割模型微調',
    meta: '碩士研究前期 · YOLOv8-seg · 遷移學習 · 2024',
    desc: '以遷移學習微調分割模型，讓原本不認得樓梯的模型能分割樓梯與地面（mAP50 達 0.95），並與 SAM2 比較後選定研究採用的方法。',
  },
  {
    img: stairImg,
    alt: '樓梯區域重建：Baseline 未偵測、提出方法偵測到懸浮障礙物',
    title: '樓梯懸浮障礙物偵測',
    meta: '碩士研究 · Visual SLAM · 點雲 · 2023/09 – 2025/09',
    desc: '以單目影片 3D 重建，提出 3D 邊界整合補回破碎的樓梯邊界；偵測率 0.55 → 0.82，平均高度誤差 48.6 → 16.5 cm。',
  },
]

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
          <a href="#education">學歷</a>
          <a href="#thesis">研究</a>
          <a href="#projects">專案</a>
          <a href="#experience">經歷</a>
          <a href="#skills">技能</a>
          <a href="#contact">聯絡</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-title" data-reveal="fade">沈志謙</h1>
        <hr className="section-divider" />
        <p className="hero-subtitle" data-reveal="fade">
          早稻田大學碩士 · 電腦視覺／影像演算法工程師
        </p>
      </section>

      {/* VISUAL BANNER + PORTRAIT */}
      <section className="banner-section">
        <div className="banner-grid" data-reveal="slide"></div>
        <div className="banner-portrait">
          <img className="portrait-placeholder" src={portraitImg} alt="沈志謙" data-reveal="slide" />
          <p className="banner-bio" data-reveal="fade">
            早稻田大學情報生產系統研究科（IPS）碩士，專長電腦視覺與 3D 重建。
            碩士研究以 3D 重建協助視障者避開懸浮障礙物，在自行實拍的 22 段戶外樓梯影片上，
            偵測率由 0.55 提升至 0.82。另具備 Verilog／FPGA 硬體實作經驗。
          </p>
          <p className="banner-bio" data-reveal="fade">
            已役畢（替代役，2026/08）· 可即刻到職
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
              <p className="info-meta">2023/09 – 2025/09 · 情報生產系統研究科（IPS）· 福岡北九州</p>
              <p className="info-desc">
                影像情報系統研究室（Image Information Systems Lab），指導教授：池永 剛（Takeshi Ikenaga）。
                全英文授課與研究，每週 2–3 次英文進度報告。
              </p>
              <p className="info-desc">
                研究主題：以 3D 重建協助視障者在真實世界中避開懸浮障礙物。
              </p>
            </div>
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>國立臺北科技大學 · 學士</h3>
              <p className="info-meta">2020/09 – 2023/06 · 電資學士班 資訊工程系</p>
              <p className="info-desc">
                3 年修完 144 學分；GPA 3.80 / 4.0，系排名前 7%（5 / 71），最後一學期系排名第一。
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
              以單目相機影片重建 3D 場景，協助視障者避開頭部高度的懸浮障礙物。
              研究涵蓋電腦視覺（Computer Vision）、視覺 SLAM（Visual SLAM）、
              影像分割與三維點雲處理（3D Point Cloud Processing），
              完整走過問題定義、方法設計、資料集拍攝到實驗分析的研究流程。
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
                Master Thesis · Visual SLAM · Segmentation · Point Cloud · 2023/09 – 2025/09
              </p>
              <p className="info-desc">
                白手杖只能掃到地面，樹枝、招牌等頭部高度的懸浮障礙物難以察覺；
                判斷是否危險需要障礙物相對地面的高度，但戶外樓梯在 3D 重建中的邊界往往破碎，導致高度誤判。
                本研究提出 3D 邊界整合方法，結合影像中的樓梯結構與 3D 幾何資訊，補回破碎的樓梯邊界，
                重建完整的樓梯區域。
              </p>
              <p className="info-desc">
                在北九州自行實拍的 22 段戶外樓梯影片上：
                <strong>偵測率 0.55 → 0.82</strong>、
                <strong>上樓梯情境 0.36 → 0.73</strong>、
                <strong>平均高度誤差 48.6 → 16.5 cm</strong>。
              </p>
              <a href={posterImg} target="_blank" rel="noopener noreferrer" className="poster-link">
                <img className="poster-image" src={posterImg} alt="碩士論文研究海報" data-reveal="slide" />
                <span className="explore-link">點擊查看完整海報 &gt;</span>
              </a>
            </div>
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>語義點雲流程</h3>
              <p className="info-meta">
                Visual SLAM · Segmentation · 2D–3D Fusion · Semantic Point Cloud
              </p>
              <p className="info-desc">
                以 ORB-SLAM3、SAM2、GoCoPP 等現成開源工具，建立 SLAM 與影像分割結合的語義點雲流程，
                將點雲分為地面、樓梯與物件；並調整特徵擷取讓點雲更集中在樓梯區域，處理單目 SLAM 的尺度問題。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="areas-section" id="projects">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">專案</h2>
        <ul className="keyword-list" data-reveal="fade" aria-label="涉及領域">
          {keywords.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
        <div className="areas-grid">
          {projects.map((p) => (
            <article className="area-card project-card" data-reveal="fade" key={p.title}>
              <img className="project-image" src={p.img} alt={p.alt} loading="lazy" />
              <h3>{p.title}</h3>
              <p className="info-meta">{p.meta}</p>
              <p className="project-desc">{p.desc}</p>
            </article>
          ))}
          <div className="area-card project-dot-cell" aria-hidden="true">
            <div className="banner-grid project-dot-tile"></div>
          </div>
        </div>
      </section>

      {/* WORK EXPERIENCE SECTION */}
      <section className="records-section" id="experience">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">經歷</h2>
        <div className="records-layout">
          <div className="info-left" data-reveal="fade">
            <hr className="section-divider" />
            <p className="info-description">
              已役畢（替代役，2026/08），可即刻到職。
            </p>
          </div>
          <div className="info-right">
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>替代役 · 臺中市政府警察局第二分局</h3>
              <p className="info-meta">2026/02 – 2026/08 · Python</p>
              <p className="info-desc">
                以 Python 開發排班與輪休管理工具，供同仁使用。
                因表現優良獲<strong>榮譽假 7 天（上限）</strong>。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS & ACTIVITIES SECTION */}
      <section className="records-section" id="skills">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">技能與活動</h2>
        <div className="records-layout">
          <div className="info-left" data-reveal="fade">
            <hr className="section-divider" />
            <p className="info-description">
              以電腦視覺與 3D 為主，輔以硬體設計經驗。
            </p>
          </div>
          <div className="info-right">
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>技能</h3>
              <p className="info-desc">
                <strong>電腦視覺與 3D：</strong>OpenCV、Visual SLAM（ORB-SLAM3）、SAM／SAM2、
                YOLOv8-seg、點雲處理、平面重建（GoCoPP）、2D–3D 融合
              </p>
              <p className="info-desc">
                <strong>程式語言：</strong>Python、C／C++、C#、Verilog
              </p>
              <p className="info-desc">
                <strong>工具與環境：</strong>Linux（Ubuntu）、Git、Unity
              </p>
              <p className="info-desc">
                <strong>硬體：</strong>FPGA（Quartus、Spartan-3）、iverilog Testbench 模擬、Design Compiler 邏輯合成
              </p>
              <p className="info-desc">
                <strong>語言：</strong>中文（母語）、英文（研究所全英文授課與研究）、日文（日本留學兩年）
              </p>
            </div>
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>社團與證照</h3>
              <p className="info-desc">
                <strong>社團與領導：</strong>電資學士班系學會 副會長（2021–2022）；
                程式設計研究社 幹部（2021–2022）；台灣在日福岡留學生會 美宣（2023–2024）
              </p>
              <p className="info-desc">
                <strong>證照：</strong>防災士（2026）；初級救護技術員 EMT-1（2026）
              </p>
            </div>
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
              歡迎電腦視覺、影像演算法相關職缺洽詢。
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
            <p>聯絡</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p><a href="mailto:brian1030028@gmail.com">brian1030028@gmail.com</a></p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>語言能力<br />中文（母語）· 英文 · 日文</p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
            <p>
              <a href="https://github.com/brian901106" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
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
              <a href="#education">學歷</a><br />
              <a href="#thesis">研究</a><br />
              <a href="#projects">專案</a><br />
              <a href="#experience">經歷</a><br />
              <a href="#skills">技能</a><br />
              <a href="#contact">聯絡</a>
            </p>
          </div>
          <div className="footer-col">
            <hr className="footer-divider" />
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
