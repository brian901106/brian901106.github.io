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
import foodKcalImg from './assets/projects/food-kcal.jpg'
import homieImg from './assets/projects/homie-tutor.jpg'
import wikiRecallImg from './assets/projects/llm-wiki-recall.jpg'
import timelineImg from './assets/timeline.jpg'

const keywords = [
  'Visual SLAM',
  '三維點雲處理',
  '平面重建',
  '影像分割與追蹤',
  '2D–3D 語義融合',
  '臉部特徵點偵測',
  'Verilog／FPGA',
]

const llmKeywords = [
  'Structured Outputs',
  'Web Search',
  'Claude／OpenAI',
  'Prompt Caching',
  '模型路由',
  'Human-in-the-Loop',
  'BM25',
]

const llmProjects = [
  {
    img: foodKcalImg,
    alt: '食物熱量 APP 的實機畫面：今日飲食紀錄、單餐確認、本機食物庫',
    title: '食物拍照辨識熱量 APP',
    meta: '開源 · Structured Outputs · Web Search · Claude／OpenAI · 2026',
    desc: 'LLM 只辨識品名與克數並輸出結構化 JSON，熱量來自可核對的營養資料、由程式計算；網路搜尋的引用網址必須出自搜尋結果才採用。',
    link: { href: 'https://github.com/brian901106/FoodKcalNotes', label: 'GitHub 原始碼' },
  },
  {
    img: homieImg,
    alt: 'Homie 日語家教模式的實機畫面：倉鼠角色むぎ的對話、速查與小提醒',
    title: 'Homie 多語言學習 APP（日語家教模式）',
    meta: 'Prompt Caching · 模型路由 · VOICEVOX · 2026',
    desc: '雲端 LLM 對話＋地端神經語音合成 VOICEVOX；三層 guardrail、模型路由與降級；prompt caching 實測 46% 輸入 token 由快取讀取。本機 LLM 介面預留給規劃中的本地台語 LLM。',
  },
  {
    img: wikiRecallImg,
    alt: '散佈圖：各版本知識庫的讀取行數與 recall，V3 讀量約為原始文件的一半且 recall 未下降',
    title: '多角色架空世界觀手遊：LLM wiki',
    meta: '手機遊戲 · LLM wiki vs RAG · Human-in-the-Loop · BM25 · 2026',
    desc: '角色、劇情與世界觀由 LLM 編寫並反覆修改，需交叉檢索角色語氣、關係與設定；比較 LLM wiki 與 RAG 後採用 LLM wiki。Human-in-the-Loop 盲評 6 個版本與 BM25：讀取行數約減半（1,230 → 592）、recall 未下降（小樣本）。',
  },
]

// 進行中專案沒有實機截圖，以網點底代替圖片
const ongoingProjects = [
  {
    tile: 'banner-grid',
    title: '台語 LLM 微調',
    meta: 'QLoRA · Qwen2.5-1.5B · CPT／SFT · Human-in-the-Loop',
    desc: 'QLoRA 微調 Qwen2.5-1.5B，訓練資料只取自教育部台語辭典；比較「先 CPT 再 SFT」與「只做 SFT」，以困惑度、chrF 與交換順序的 LLM 盲測裁判（sign test）評估。結論：CPT 在 SFT 後無可偵測增益；取樣解碼讓迴圈率 8.8% → 2.5%。',
  },
  {
    tile: 'card-green',
    title: 'RAG＋LLM wiki 開放世界遊戲（Mythweaver）',
    meta: 'Hybrid 檢索 · Rerank · RAG · Tool Calling · Agent',
    desc: '可匯入小說、以 D&D 規則遊玩。規則檢索以 hybrid 檢索＋rerank 融合，R@5 0.98；設計世界觀 RAG、世界線 wiki 與以工具呼叫驅動的 DM agent，架構實驗中。',
  },
]

const projects = [
  {
    img: faceLive2dImg,
    alt: '以臉部特徵點驅動 Live2D 角色的網頁畫面',
    title: '臉部特徵點驅動 Live2D',
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
          <a href="#llm">LLM</a>
          <a href="#thesis">研究</a>
          <a href="#projects">專案</a>
          <a href="#skills">技能</a>
          <a href="#experience">經歷</a>
          <a href="#contact">聯絡</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-title" data-reveal="fade">沈志謙</h1>
        <hr className="section-divider" />
        <p className="hero-subtitle" data-reveal="fade">
          AI Agent／電腦視覺／LLM 應用
        </p>
      </section>

      {/* EDUCATION + PORTRAIT */}
      <section className="banner-section" id="education">
        {/* 標題獨立跨兩欄，讓大頭照與早稻田照片的上緣對齊 */}
        <div className="banner-head">
          <h2 className="section-title" data-reveal="fade">學歷</h2>
          <p className="info-description" data-reveal="fade">
            從資訊工程紮根，到影像資訊系統的專門研究。
          </p>
          <hr className="section-divider" />
        </div>
        <div className="banner-edu">
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
        <div className="banner-portrait">
          <img className="portrait-placeholder" src={portraitImg} alt="沈志謙" data-reveal="slide" />
          <h3 className="banner-bio-title" data-reveal="fade">簡述</h3>
          <p className="banner-bio" data-reveal="fade">
            早稻田大學 IPS 碩士。從傳統影像處理與三維重建出發，到微調視覺模型、以 SAM2 分割建構語意點雲並偵測障礙物，
            畢業後延伸到 LLM 應用與 AI agent。具備技術底子，也善用 AI 輔助開發，
            並以研究的方法做決策：定義問題、實驗比較、驗證後再選擇。
          </p>
          <p className="banner-bio" data-reveal="fade">
            已役畢（替代役，2026/08/17）· 可即刻到職
          </p>
          <a href="https://github.com/brian901106" target="_blank" rel="noopener noreferrer" className="explore-link">
            github.com/brian901106 &gt;
          </a>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="areas-section" id="timeline">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">專案時間軸</h2>
        <div className="timeline-block">
          <p className="timeline-hint">← 左右滑動查看 →</p>
          <div className="timeline-scroll">
            <a href={timelineImg} target="_blank" rel="noopener noreferrer">
              <img
                className="timeline-image"
                src={timelineImg}
                alt="2022–2026 專案時間軸：電腦視覺研究、硬體、課程專題、實務工具與 LLM 應用"
                loading="lazy"
              />
            </a>
          </div>
          <a href={timelineImg} target="_blank" rel="noopener noreferrer" className="explore-link">
            點擊查看完整時間軸 &gt;
          </a>
        </div>
      </section>

      {/* LLM APPLICATIONS SECTION */}
      <section className="areas-section" id="llm">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">LLM 應用</h2>
        <ul className="keyword-list" data-reveal="fade" aria-label="涉及技術">
          {llmKeywords.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
        <div className="areas-grid">
          {llmProjects.map((p) => (
            <article className="area-card project-card" data-reveal="fade" key={p.title}>
              <img className="project-image" src={p.img} alt={p.alt} loading="lazy" />
              <h3>{p.title}</h3>
              <p className="info-meta">{p.meta}</p>
              <p className="project-desc">{p.desc}</p>
              {p.link && (
                <a className="explore-link project-link" href={p.link.href} target="_blank" rel="noopener noreferrer">
                  {p.link.label} &gt;
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ONGOING SECTION */}
      <section className="areas-section" id="ongoing">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">進行中</h2>
        <div className="areas-grid areas-grid--two">
          {ongoingProjects.map((p) => (
            <article className="area-card project-card" data-reveal="fade" key={p.title}>
              <div className={`ongoing-tile ${p.tile}`} aria-hidden="true">
                <span className="status-tag">進行中</span>
              </div>
              <h3>{p.title}</h3>
              <p className="info-meta">{p.meta}</p>
              <p className="project-desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PUBLICATIONS SECTION */}
      <section className="records-section" id="thesis">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">畢業論文</h2>
        <p className="info-description section-lead" data-reveal="fade">
          以單目相機影片重建 3D 場景，協助視障者避開頭部高度的懸浮障礙物。
          研究涵蓋電腦視覺、視覺 SLAM、影像分割與三維點雲處理，
          完整走過問題定義、方法設計、資料集拍攝到實驗分析的研究流程。
        </p>
        <ul className="keyword-list" data-reveal="fade" aria-label="研究領域">
          <li>Computer Vision</li>
          <li>Visual SLAM</li>
          <li>單目 3D 重建</li>
          <li>影像分割（SAM2）</li>
          <li>3D 點雲處理</li>
          <li>2D–3D 語義融合</li>
          <li>地面重建</li>
        </ul>
        <div className="records-layout">
          <div className="info-right">
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>語義點雲流程</h3>
              <p className="info-desc">
                以 ORB-SLAM3、SAM2、GoCoPP 等現成開源工具，建立 SLAM 與影像分割結合的語義點雲流程，
                將點雲分為地面、樓梯與物件；並調整特徵擷取讓點雲更集中在樓梯區域，處理單目 SLAM 的尺度問題。
              </p>
            </div>
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
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="areas-section" id="projects">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">CV 與硬體專案</h2>
        <p className="section-note" data-reveal="fade">非提示詞工程：以下專案皆為親自撰寫程式、實作完成。</p>
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

      {/* SKILLS & ACTIVITIES SECTION */}
      <section className="records-section" id="skills">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">技能與活動</h2>
        <p className="info-description section-lead" data-reveal="fade">
          電腦視覺與 3D 打底，延伸到 LLM 應用，輔以硬體設計經驗。
        </p>
        <div className="records-layout skills-layout">
          <div className="info-right">
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>技能</h3>
              <p className="info-desc">
                <strong>電腦視覺與 3D：</strong>OpenCV、Visual SLAM（ORB-SLAM3）、SAM／SAM2、
                YOLOv8-seg、點雲處理、平面重建（GoCoPP）、2D–3D 融合
              </p>
              <p className="info-desc">
                <strong>LLM 應用：</strong>Claude／OpenAI API、Structured Outputs、Prompt Caching、
                模型路由、RAG（BM25、hybrid 檢索＋rerank）、Human-in-the-Loop 評測、QLoRA 微調
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
          </div>
          <div className="info-right">
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

      {/* WORK EXPERIENCE SECTION */}
      <section className="records-section" id="experience">
        <hr className="section-divider" />
        <h2 className="section-title" data-reveal="fade">經歷</h2>
        <div className="records-layout">
          <div className="info-left" data-reveal="fade">
            <hr className="section-divider" />
            <p className="info-description">
              已役畢（替代役，2026/08/17），可即刻到職。
            </p>
          </div>
          <div className="info-right">
            <hr className="section-divider" />
            <div className="info-card" data-reveal="fade">
              <h3>替代役 · 臺中市政府警察局第二分局</h3>
              <p className="info-meta">2026/02 – 2026/08 · Python · Spec 文件 · 提示詞工程</p>
              <p className="info-desc">
                以 spec 文件＋提示詞工程製作 Python 排班與輪休管理工具，
                <strong>通過臺中市政府警察局內部資料安全審核</strong>，供同仁使用。
                因表現優良獲<strong>榮譽假 7 天（上限）</strong>。
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
              歡迎 AI Agent、電腦視覺、LLM 應用相關職缺洽詢。
            </p>
          </div>
          <div className="collab-right" data-reveal="fade">
            <hr className="section-divider" />
            <a href="mailto:brian1030028@gmail.com" className="explore-link">
              brian1030028@gmail.com &gt;
            </a>
            <br />
            <a href="https://github.com/brian901106" target="_blank" rel="noopener noreferrer" className="explore-link">
              github.com/brian901106 &gt;
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
              <a href="#llm">LLM 應用</a><br />
              <a href="#thesis">研究</a><br />
              <a href="#projects">專案</a><br />
              <a href="#skills">技能</a><br />
              <a href="#experience">經歷</a><br />
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
