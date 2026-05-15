// app.jsx — Manor Hunt v2.0
// 新機制：
//  • 環狀結構：庭院 I → 墓穴 II（吸血鬼·新人）→ 森林 III（狼人·女獵人）→ 大廳 IV（騎士·王牌）→ 密室 V（惡魔·最終）
//  • 指標互動：fear≥60 加速脫水；bleed≥50 加速恐懼；hydration≤20 變化×2
//  • 特效：靈異體質 (rookie supernatural fear ×1.15)、自我控制 (huntress fear ×0.7)
//          王牌 (ace fear locked at 0 before zone 5)、冷靜 (ace |Δ|>20 capped to ±15)
//  • 女獵人重置：1/局，任一指標歸 50
//  • 結局：依倖存組合（rookie/huntress/ace 三選 + ace 死亡 = Bad）

const { useState, useEffect, useRef, useMemo, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "pov": "rookie",
  "region": 1,
  "showFog": true,
  "showHints": true
}/*EDITMODE-END*/;

const POV_ORDER = ['rookie','huntress','ace'];
const STAT_KEYS = ['sanity','hydration','fear','bleed'];
const STAT_META = {
  sanity:    { name:'理智 SANITY',    color:'var(--sanity)',    label:'瘋狂' },
  hydration: { name:'水分 HYDRATION', color:'var(--hydration)', label:'脫水' },
  fear:      { name:'恐懼 FEAR',      color:'var(--fear)',      label:'恐懼' },
  bleed:     { name:'流血 BLEED',     color:'var(--bleed)',     label:'失血' },
};
const STRONG_THRESHOLD = 22;
const DEATH_THRESHOLD  = 100;
const DANGER_THRESHOLD = 75;

// 推進到 inner ring 的起始：所有人都從第一環進入
// 但 demo 中為了快速看到各 POV 的封印任務，預設各自起點略有不同
const POV_INITIAL_REGION = { rookie:1, huntress:2, ace:3 };

const INITIAL_STATS = {
  rookie:   { sanity: 12, hydration: 14, fear:  8, bleed:  6 },
  huntress: { sanity: 28, hydration: 32, fear: 38, bleed: 22 },
  ace:      { sanity: 42, hydration: 48, fear:  0, bleed: 30 },
};

const SUPERNATURAL_KINDS = new Set(['ghost','succubus','witch','vampire','werewolf','knight']);

const clamp = (n, lo=0, hi=DEATH_THRESHOLD) => Math.max(lo, Math.min(hi, n));

// ─── 套用角色特效 + 指標互動 ────────────────────────────────────
function applyEffects(prev, rawDeltas, povKey, region, cardKind){
  const d = {...rawDeltas};

  // 1. 女獵人 自我控制：恐懼 ×0.7
  if(povKey === 'huntress' && d.fear){
    d.fear = Math.round(d.fear * 0.7);
  }
  // 2. 新人 靈異體質：超自然來源恐懼 ×1.15
  if(povKey === 'rookie' && d.fear && SUPERNATURAL_KINDS.has(cardKind)){
    d.fear = Math.round(d.fear * 1.15);
  }
  // 3. 低水分懲罰：≤20 所有變化幅度 ×2
  if(prev.hydration <= 20){
    for(const k of STAT_KEYS) if(d[k]) d[k] = Math.round(d[k] * 2);
  }
  // 4. 王牌 冷靜：單次 |Δ| > 20 → 限制為 ±15
  if(povKey === 'ace'){
    for(const k of STAT_KEYS){
      if(d[k] && Math.abs(d[k]) > 20) d[k] = Math.sign(d[k]) * 15;
    }
  }

  // 套用 deltas
  const next = {...prev};
  for(const k of STAT_KEYS) if(d[k]) next[k] = clamp(next[k] + d[k]);

  // 5. 高恐懼>60 → 出汗（水分上升）
  if(next.fear > 60) next.hydration = clamp(next.hydration + 4);
  // 6. 高流血>50 → 恐懼上升
  if(next.bleed > 50) next.fear = clamp(next.fear + 3);

  // 7. 王牌：第五環前恐懼鎖 0
  if(povKey === 'ace' && region < 5) next.fear = 0;

  return { next, applied: d };
}

// ─── Corner ornament ────────────────────────────────────────────
function CornerOrnament({className}){
  return (
    <svg className={className} viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 2 L2 18 M2 2 L18 2"/><path d="M2 22 L8 22 L8 16"/>
      <path d="M22 2 L22 8 L16 8"/><circle cx="6" cy="6" r="2"/>
      <path d="M11 11 L11 14 M11 11 L14 11"/>
    </svg>
  );
}

function arrowFor(delta){
  if(!delta) return null;
  const strong = Math.abs(delta) >= STRONG_THRESHOLD;
  if(delta > 0) return { glyph: strong ? '⇈' : '↑', tone:'bad' };
  return { glyph: strong ? '⇊' : '↓', tone:'good' };
}

function StatBar({sk, val, locked, delta, showHint, lowWarn}){
  const meta = STAT_META[sk];
  const danger = !locked && val >= DANGER_THRESHOLD;
  const warning = !locked && lowWarn;
  const arrow = (showHint && !locked) ? arrowFor(delta || 0) : null;
  return (
    <div className={`stat ${danger?'danger':''} ${warning?'warn':''} ${locked?'locked':''}`}>
      <div className="row1">
        <span className="nm">{meta.name}</span>
        <span className={`vl ${arrow?'show':''} ${arrow?arrow.tone:''}`}>
          {locked ? '—' : (arrow ? arrow.glyph : '')}
        </span>
      </div>
      <div className="bar">
        <div className="fill" style={{width:`${val}%`, background:meta.color}}/>
      </div>
    </div>
  );
}

function StatsBar({stats, deltas, povKey, region, showHint}){
  const fearLocked = povKey === 'ace' && region < 5;
  // 低水分警示
  const lowHydration = stats.hydration <= 20;
  return (
    <div className="stats">
      {STAT_KEYS.map(sk => (
        <StatBar key={sk} sk={sk} val={stats[sk]}
          locked={sk==='fear' && fearLocked}
          delta={deltas[sk]} showHint={showHint}
          lowWarn={sk==='hydration' && lowHydration}/>
      ))}
    </div>
  );
}

function POVPanel({pov, region, deceased}){
  const r = MH_REGIONS.find(r=>r.id===region);
  return (
    <div className="pov">
      <div className="label">POV · 視角</div>
      <div className="name"><span className="arrow">»</span>{pov.name}</div>
      <div className="zone"><span className="num">{r.meta} ·</span> {r.short}</div>
      <div className="traits">
        {pov.traits.map((t,i)=>(<span key={i} className="trait">{t}</span>))}
      </div>
      {deceased.map((d,i)=>(<div key={i} className="deceased">† {d} 已逝</div>))}
    </div>
  );
}

// 封印狀態順序：吸血鬼 II / 狼人 III / 騎士 IV
function SealsPanel({seals}){
  const rows = [
    { id:'vampire',  name:'吸血伯爵', meta:'RING II'  },
    { id:'werewolf', name:'狼影獸',   meta:'RING III' },
    { id:'knight',   name:'無頭騎士', meta:'RING IV'  },
  ];
  return (
    <div className="seals">
      <div className="head">— Seals · 封印 —</div>
      {rows.map(r => {
        const locked = seals[r.id];
        return (
          <div key={r.id} className={`seal-row ${locked?'locked':'unlocked'}`}>
            <span className="meta">{r.meta}</span>
            <span className="name">{r.name}</span>
            <span className="icn">{locked ? '🔒' : '🔓'}</span>
          </div>
        );
      })}
      {seals.demon && (
        <div className="seal-row locked" style={{marginTop:14}}>
          <span className="meta">RING V</span>
          <span className="name" style={{color:'#f3d29a'}}>惡魔已封印</span>
          <span className="icn" style={{color:'#f3d29a',borderColor:'rgba(243,210,154,.5)'}}>✦</span>
        </div>
      )}
    </div>
  );
}

function Roster({povKey, povStates, onResetHover, onReset, resetUsed}){
  return (
    <div className="roster">
      {POV_ORDER.map(k => {
        const s = povStates[k];
        const cls = `ros ${s==='dead'?'dead':''} ${povKey===k?'active':''}`;
        const lbl = s==='dead' ? '已逝' : (povKey===k ? '操控中' : '存活');
        return (
          <div key={k} className={cls}>
            <div className="nm">{MH_POVS[k].short}</div>
            <div className="st">{lbl}</div>
            {/* 女獵人專屬：重置按鈕 */}
            {k === 'huntress' && povKey === 'huntress' && (
              <button className="reset-btn" disabled={resetUsed}
                title="女獵人特效：將任一指標歸 50（1/局）"
                onClick={onReset}>
                {resetUsed ? '◌ 已使用' : '✦ 重置 (1)'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Artifacts({artifacts}){
  const list = [
    { id:'rookie',   glyph:'🗝',  lb:'新人法器 · 封吸血鬼' },
    { id:'huntress', glyph:'🗡',  lb:'女獵人法器 · 封狼人' },
    { id:'ace',      glyph:'📿',  lb:'王牌法器 · 封騎士' },
  ];
  return (
    <div className="artifacts">
      {list.map(a => {
        const s = artifacts[a.id];
        const cls = `artifact ${s.state}`;
        const text = s.state==='held' ? '持有中'
          : s.state==='consumed' ? '已封印消耗'
          : `遺落於 ${s.region}`;
        return (
          <div key={a.id} className={cls}>
            <div className="glyph">{a.glyph}</div>
            <div className="meta">
              <div className="lb">{a.lb}</div>
              <div className="vl">{text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Quests({quests}){
  return (
    <div className="quests">
      <div className="head">— Tasks · 任務 —</div>
      {quests.map((q,i)=>(
        <div key={i} className={`qrow ${q.done?'done':''} ${q.hidden?'hidden':''}`}>
          <span>{q.text}</span>
          <span className="box">{q.done?'✓':''}</span>
        </div>
      ))}
    </div>
  );
}

function EventCard({card, povKey, onCommit, dragX, setDragX, disabled}){
  const cardRef = useRef(null);
  const drag = useRef({active:false, sx:0, dx:0});

  const onDown = (e)=>{
    if(disabled) return;
    drag.current = { active:true, sx:e.clientX, dx:0 };
    cardRef.current.classList.add('dragging');
    cardRef.current.setPointerCapture(e.pointerId);
  };
  const onMove = (e)=>{
    if(!drag.current.active || disabled) return;
    const dx = e.clientX - drag.current.sx;
    drag.current.dx = dx;
    setDragX(dx);
    cardRef.current.style.transform = `translateX(${dx}px) rotate(${dx/40}deg)`;
  };
  const onUp = (e)=>{
    if(!drag.current.active) return;
    drag.current.active = false;
    cardRef.current.classList.remove('dragging');
    const dx = drag.current.dx;
    if(dx < -140){
      cardRef.current.classList.add('flying-left');
      setTimeout(()=>onCommit('left'), 420);
    } else if (dx > 140){
      cardRef.current.classList.add('flying-right');
      setTimeout(()=>onCommit('right'), 420);
    } else {
      cardRef.current.style.transform = '';
      setDragX(0);
    }
  };

  useEffect(()=>{
    const fn = (e)=>{
      if(disabled) return;
      if(e.key === 'ArrowLeft'){
        cardRef.current.classList.add('flying-left');
        setTimeout(()=>onCommit('left'), 420);
      } else if(e.key === 'ArrowRight'){
        cardRef.current.classList.add('flying-right');
        setTimeout(()=>onCommit('right'), 420);
      }
    };
    window.addEventListener('keydown', fn);
    return ()=>window.removeEventListener('keydown', fn);
  }, [onCommit, disabled]);

  const tones = {
    ghost:'#3a3a44', succubus:'#3a0a14', knight:'#1a1a1c',
    werewolf:'#2a1408', vampire:'#1a0a14', witch:'#1a2018',
  };
  const tone = tones[card.kind] || MH_POVS[povKey]?.tone || '#2A3D5C';

  const showLeft  = dragX < -30;
  const showRight = dragX > 30;

  return (
    <div className="card-wrap">
      <div className="swipe-hint left">◂ 左滑</div>
      <div className="swipe-hint right">右滑 ▸</div>

      <div className={`card ${card.boss?'boss':''} ${card.isFinal?'final':''} entering`} ref={cardRef}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        key={card.__key}>

        <CornerOrnament className="corner tl"/><CornerOrnament className="corner tr"/>
        <CornerOrnament className="corner bl"/><CornerOrnament className="corner br"/>

        <div className={`choice-banner left ${showLeft?'show':''}`}>{card.left.label}</div>
        <div className={`choice-banner right ${showRight?'show':''}`}>{card.right.label}</div>

        <div className="body-text">{card.body}</div>

        <div className="portrait" style={{background:tone}}>
          <Portrait tone={tone} kind={card.kind}/>
          <div className="grime"/>
        </div>

        <div className="name">{card.speaker}</div>
        <div className="role">— {card.role} —</div>
      </div>
    </div>
  );
}

function DeathOverlay({info, isFinal, onContinue}){
  const pov = MH_POVS[info.povKey];
  const dc = info.dc;

  useEffect(()=>{
    const fn = (e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onContinue(); }
    };
    window.addEventListener('keydown', fn);
    return ()=>window.removeEventListener('keydown', fn);
  }, [onContinue]);

  return (
    <div className="death-overlay">
      <div className="death-card">
        <CornerOrnament className="corner tl"/><CornerOrnament className="corner tr"/>
        <CornerOrnament className="corner bl"/><CornerOrnament className="corner br"/>
        <div className="death-banner">† Requiem †</div>
        <div className="death-portrait">
          <Portrait tone="#1a0408" kind={dc.kind}/>
        </div>
        <div className="death-name">{pov.name}</div>
        <div className="death-stat">死於 — {dc.stat}</div>
        <div className="death-cause">{dc.cause}</div>
        <div className="death-relic">
          <span className="lbl">— Relic Left Behind · 法器遺落 —</span>
          <div className="relic-text">{dc.relic}</div>
        </div>
        {isFinal ? (
          <button className="death-continue final" onClick={onContinue}>查看結局 ▸</button>
        ) : (
          <button className="death-continue" onClick={onContinue}>下一獵人接手 ▸</button>
        )}
      </div>
    </div>
  );
}

// ── 結局牌 ────────────────────────────────────────────────────────
function EndingOverlay({ending, onReset}){
  return (
    <div className={`death-overlay ending ${ending.isBad?'bad':'good'}`}>
      <div className={`death-card ending-card ${ending.isBad?'bad':'good'}`}>
        <CornerOrnament className="corner tl"/><CornerOrnament className="corner tr"/>
        <CornerOrnament className="corner bl"/><CornerOrnament className="corner br"/>
        <div className="ending-subtitle">{ending.subtitle}</div>
        <div className="ending-title">{ending.title}</div>
        <div className="death-portrait">
          <Portrait tone={ending.isBad?'#0a0a0a':'#1a1408'} kind={ending.kind}/>
        </div>
        <div className="death-cause">{ending.body}</div>
        <div className="death-relic">
          <span className="lbl">— Epilogue · 尾聲 —</span>
          <div className="relic-text">{ending.epilogue}</div>
        </div>
        <button className="death-continue" onClick={onReset}>
          重新開始 ⟲
        </button>
      </div>
    </div>
  );
}

// ─── §4-7 Map overlay ─────────────────────────────────────────
function ScrollworkCorner({className}){
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round">
      {/* outer L hook */}
      <path d="M3 3 L3 28 M3 3 L28 3"/>
      {/* curl */}
      <path d="M3 12 Q12 12 12 22 Q12 32 22 32"/>
      <path d="M12 3 Q12 12 22 12 Q32 12 32 22"/>
      {/* leaf/floret */}
      <path d="M16 16 Q22 16 22 22 Q22 28 16 28"/>
      <circle cx="7" cy="7" r="2.2" fill="currentColor" stroke="none"/>
      {/* trailing flourish */}
      <path d="M28 3 Q42 6 50 14"/>
      <path d="M3 28 Q6 42 14 50"/>
      <path d="M22 22 Q30 22 32 30"/>
    </svg>
  );
}

function HandDrawnRing({cx, cy, radius, seed=1, wobble=3.5, steps=72, ...rest}){
  const rnd = (i)=>{
    const x = Math.sin(seed*97.13 + i*12.97) * 43758.5453;
    return (x - Math.floor(x)) - 0.5;
  };
  let d = '';
  for(let i=0;i<=steps;i++){
    const a = (i/steps)*Math.PI*2;
    const r = radius + rnd(i)*wobble + rnd(i+steps)*wobble*0.4;
    const x = cx + Math.cos(a)*r;
    const y = cy + Math.sin(a)*r;
    d += (i===0?'M':'L') + x.toFixed(2) + ',' + y.toFixed(2) + ' ';
  }
  return <path d={d+'Z'} {...rest}/>;
}

function annulusPath(cx, cy, rOuter, rInner){
  // evenodd fill: outer CCW, inner CW
  const o = rOuter, n = rInner;
  let d = `M ${cx+o},${cy} A ${o},${o} 0 1,0 ${cx-o},${cy} A ${o},${o} 0 1,0 ${cx+o},${cy} Z`;
  if(n > 0){
    d += ` M ${cx+n},${cy} A ${n},${n} 0 1,1 ${cx-n},${cy} A ${n},${n} 0 1,1 ${cx+n},${cy} Z`;
  }
  return d;
}

const MAP_RINGS = [
  { id:1, r:300, label:'庭院',     meta:'I'   },
  { id:2, r:240, label:'地下墓穴', meta:'II'  },
  { id:3, r:180, label:'詛咒森林', meta:'III' },
  { id:4, r:120, label:'黑暗大廳', meta:'IV'  },
  { id:5, r:60,  label:'禁斷密室', meta:'V'   },
];
const MAP_CHAR_COLOR = {
  rookie:   '#7396cc',
  huntress: '#a684dc',
  ace:      '#e6c184',
};
const MAP_CHAR_ANGLE = {
  rookie:   220,
  huntress: 330,
  ace:      95,
};
const MAP_SEAL_SPEC = [
  { ring:2, boss:'vampire',  povOwner:'rookie',   angle:0    },
  { ring:3, boss:'werewolf', povOwner:'huntress', angle:270  },
  { ring:4, boss:'knight',   povOwner:'ace',      angle:90   },
];

function angleXY(cx, cy, deg, r){
  const rad = (deg-90) * Math.PI / 180;
  return { x: cx + Math.cos(rad)*r, y: cy + Math.sin(rad)*r };
}

function MapOverlay({open, onClose, povKey, charPositions, deathPositions, exploredRegions, sealsState, deathHistory}){
  useEffect(()=>{
    if(!open) return;
    const fn = (e)=>{
      const key = e.key.toLowerCase();
      if(key === 'escape' || key === 'm' || e.key === 'Tab'){
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', fn);
    return ()=>window.removeEventListener('keydown', fn);
  }, [open, onClose]);

  if(!open) return null;

  const cx = 320, cy = 320;

  return (
    <div className="map-overlay" onClick={onClose}>
      <div className="map-frame" onClick={(e)=>e.stopPropagation()}>
        <ScrollworkCorner className="map-corner tl"/>
        <ScrollworkCorner className="map-corner tr"/>
        <ScrollworkCorner className="map-corner bl"/>
        <ScrollworkCorner className="map-corner br"/>

        <div className="map-title">— Cartographia · 莊園輿圖 —</div>
        <div className="map-sub">五重之環 · concentric wards of the manor</div>

        <svg className="map-svg" viewBox="0 0 640 640">
          <defs>
            <filter id="ink-wobble" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7"/>
              <feDisplacementMap in="SourceGraphic" scale="6"/>
            </filter>
            <radialGradient id="parchment-bg" cx="50%" cy="50%" r="55%">
              <stop offset="0%"  stopColor="#3a2818"/>
              <stop offset="55%" stopColor="#2C1F14"/>
              <stop offset="100%" stopColor="#150c06"/>
            </radialGradient>
            <radialGradient id="halo-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="#ffc06a" stopOpacity=".75"/>
              <stop offset="45%" stopColor="#ff8c28" stopOpacity=".32"/>
              <stop offset="100%" stopColor="#ff8c28" stopOpacity="0"/>
            </radialGradient>
            <pattern id="ink-fog" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="#0a0604"/>
              <circle cx="15" cy="18" r="14" fill="#000" opacity=".55"/>
              <circle cx="42" cy="38" r="11" fill="#000" opacity=".45"/>
              <circle cx="50" cy="10" r="6"  fill="#1a1108" opacity=".65"/>
              <circle cx="8"  cy="48" r="8"  fill="#1a1108" opacity=".65"/>
            </pattern>
          </defs>

          {/* parchment disc */}
          <circle cx={cx} cy={cy} r="308" fill="url(#parchment-bg)"/>
          {/* parchment grain */}
          <circle cx={cx} cy={cy} r="308" fill="none"
            stroke="rgba(120,90,50,.18)" strokeWidth="6"/>

          {/* hand-drawn rings */}
          {MAP_RINGS.map(r=>(
            <HandDrawnRing key={r.id} cx={cx} cy={cy} radius={r.r} seed={r.id*3+1}
              wobble={r.id===5?2.2:3.6}
              fill={r.id===5?'rgba(80,18,18,.25)':'none'}
              stroke="#8a6a44" strokeWidth={r.id===5?1.8:1.4}
              strokeLinejoin="round" opacity={r.id===5?1:.85}/>
          ))}
          {/* faint inner second-stroke for hand drawn double-line feel */}
          {MAP_RINGS.filter(r=>r.id<5).map(r=>(
            <HandDrawnRing key={'b'+r.id} cx={cx} cy={cy} radius={r.r-4} seed={r.id*7+5}
              wobble={2.4} fill="none" stroke="#6a4e2e" strokeWidth=".7" opacity=".5"/>
          ))}

          {/* compass rose at center */}
          <g opacity=".55">
            <circle cx={cx} cy={cy} r="4" fill="#8a6a44"/>
            <path d={`M ${cx} ${cy-50} L ${cx+4} ${cy} L ${cx} ${cy+50} L ${cx-4} ${cy} Z`}
              fill="none" stroke="#6a4e2e" strokeWidth=".6"/>
            <text x={cx} y={cy-54} textAnchor="middle" fontFamily="'IM Fell English',serif"
              fontSize="9" fill="#8a6a44" letterSpacing="1">N</text>
          </g>

          {/* Ring labels */}
          {MAP_RINGS.map(r=>{
            const labelR = r.r - (r.id===5 ? 0 : 16);
            const y = cy - labelR + (r.id===5 ? 4 : 12);
            const size = r.id===5 ? 11 : (r.id===1 ? 14 : 12);
            return (
              <g key={'lbl'+r.id}>
                <text x={cx} y={y}
                  fontFamily="'IM Fell English', 'Noto Serif TC', serif"
                  fontStyle="italic"
                  fontSize={size} fill="#c8a878" textAnchor="middle"
                  letterSpacing="2" opacity=".95">{r.label}</text>
                <text x={cx} y={y+12} fontFamily="'Share Tech Mono',monospace"
                  fontSize="8" fill="#8a6a44" textAnchor="middle"
                  letterSpacing="3">{`— ${r.meta} —`}</text>
              </g>
            );
          })}

          {/* Fog overlays for unexplored rings */}
          {MAP_RINGS.map(r=>{
            if(exploredRegions.has(r.id)) return null;
            const inner = r.id === 5 ? 0 : (MAP_RINGS.find(x=>x.id === r.id+1)?.r || 0);
            return (
              <path key={'fog'+r.id} d={annulusPath(cx, cy, r.r-1, inner)}
                fill="url(#ink-fog)" fillRule="evenodd"
                filter="url(#ink-wobble)" opacity=".88"/>
            );
          })}
          {/* tiny "unknown" label on the centermost fogged ring */}
          {MAP_RINGS.filter(r=>!exploredRegions.has(r.id)).map(r=>{
            const labelY = cy - (r.r - (r.id===5?0:30));
            return (
              <text key={'unk'+r.id} x={cx} y={labelY+22}
                fontFamily="'IM Fell English',serif" fontStyle="italic"
                fontSize="11" fill="#5a4128" textAnchor="middle"
                letterSpacing="3">?  未知  ?</text>
            );
          })}

          {/* Seal nodes on rings II / III / IV */}
          {MAP_SEAL_SPEC.map(s=>{
            const ring = MAP_RINGS.find(r=>r.id===s.ring);
            const midR = ring.r - 30;
            const {x, y} = angleXY(cx, cy, s.angle, midR);
            const sealed = sealsState[s.boss];
            const ownerDead = deathHistory.includes(s.povOwner) && !sealed;
            const fogged = !exploredRegions.has(s.ring);
            if(fogged) return null;

            if(sealed){
              return (
                <g key={s.boss} transform={`translate(${x},${y})`}>
                  <circle r="15" fill="#4A8C4A" opacity=".22"/>
                  <circle r="11" fill="#1a2a18" stroke="#4A8C4A" strokeWidth="1.5"/>
                  <text y="4" textAnchor="middle" fontSize="12"
                    fill="#aacf9c" fontFamily="'Cinzel',serif">✦</text>
                  <text y="24" textAnchor="middle" fontSize="7.5"
                    fill="#7a9a78" fontFamily="'Share Tech Mono',monospace"
                    letterSpacing="1">SEALED</text>
                </g>
              );
            }
            if(ownerDead){
              return (
                <g key={s.boss} transform={`translate(${x},${y})`}>
                  <circle r="11" fill="#0a0604" stroke="#5a4128" strokeWidth="1.2"
                    opacity=".75"/>
                  <text y="4" textAnchor="middle" fontSize="13"
                    fill="#7a6a55" fontFamily="serif">☠</text>
                  <text y="24" textAnchor="middle" fontSize="7.5"
                    fill="#6a5a4a" fontFamily="'Share Tech Mono',monospace"
                    letterSpacing="1">FORSAKEN</text>
                </g>
              );
            }
            return (
              <g key={s.boss} transform={`translate(${x},${y})`}>
                <circle r="11" fill="#1a1108" stroke="#9a8b76" strokeWidth="1.2"
                  strokeDasharray="2.5 2"/>
                <text y="4" textAnchor="middle" fontSize="11"
                  fill="#9a8b76" fontFamily="'Cinzel',serif">◌</text>
                <text y="24" textAnchor="middle" fontSize="7.5"
                  fill="#8a7a65" fontFamily="'Share Tech Mono',monospace"
                  letterSpacing="1">UNSEALED</text>
              </g>
            );
          })}

          {/* Demon node at center (sanctum) */}
          {exploredRegions.has(5) && (
            <g transform={`translate(${cx},${cy})`}>
              <circle r="18" fill={sealsState.demon?'#4A8C4A':'#5a1818'} opacity=".25"/>
              <circle r="13" fill="#1a0408"
                stroke={sealsState.demon?'#4A8C4A':'#aa2020'} strokeWidth="1.6"/>
              <text y="5" textAnchor="middle" fontSize="14"
                fill={sealsState.demon?'#aacf9c':'#cc5a3a'} fontFamily="'Cinzel',serif">
                {sealsState.demon ? '✦' : '⛧'}
              </text>
            </g>
          )}

          {/* Characters */}
          {POV_ORDER.map(k=>{
            const isDead = deathHistory.includes(k);
            const isActive = k === povKey && !isDead;
            const ringId = isDead ? deathPositions[k] : charPositions[k];
            if(!ringId) return null;
            const ring = MAP_RINGS.find(r=>r.id===ringId);
            if(!ring) return null;
            const midR = ring.id===5 ? 28 : (ring.r - 30);
            const angle = MAP_CHAR_ANGLE[k];
            const {x, y} = angleXY(cx, cy, angle, midR);

            if(isDead){
              return (
                <g key={k} transform={`translate(${x},${y})`}>
                  <text textAnchor="middle" y="6"
                    fontFamily="'IM Fell English',serif"
                    fontSize="24" fill="#e8d9c0"
                    style={{filter:'drop-shadow(0 0 4px rgba(170,32,32,.5))'}}>†</text>
                  <text textAnchor="middle" y="22"
                    fontFamily="'IM Fell English',serif" fontStyle="italic"
                    fontSize="9.5" fill="#c8b890" letterSpacing="1">
                    {MH_POVS[k].short}
                  </text>
                </g>
              );
            }

            return (
              <g key={k} transform={`translate(${x},${y})`}>
                {isActive && (
                  <circle r="24" fill="url(#halo-grad)">
                    <animate attributeName="r" values="20;26;20"
                      dur="2.6s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values=".75;1;.75"
                      dur="2.6s" repeatCount="indefinite"/>
                  </circle>
                )}
                <circle r={isActive ? 8.5 : 5}
                  fill={MAP_CHAR_COLOR[k]}
                  stroke={isActive ? '#fff5e0' : '#1a1108'}
                  strokeWidth="1.4"
                  style={isActive ? {filter:'drop-shadow(0 0 6px rgba(255,180,90,.5))'} : null}/>
                <text textAnchor="middle"
                  y={isActive ? -14 : -10}
                  fontFamily="'IM Fell English',serif"
                  fontStyle="italic"
                  fontSize={isActive ? 11 : 9.5}
                  fill={isActive ? '#fff5e0' : '#c8b890'}
                  letterSpacing="1">
                  {MH_POVS[k].short}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="map-foot">
          <div className="legend">
            <span className="lg"><span className="sw" style={{background:MAP_CHAR_COLOR.rookie}}/>新人</span>
            <span className="lg"><span className="sw" style={{background:MAP_CHAR_COLOR.huntress}}/>女獵人</span>
            <span className="lg"><span className="sw" style={{background:MAP_CHAR_COLOR.ace}}/>王牌</span>
          </div>
          <span style={{color:'rgba(154,139,118,.4)'}}>·</span>
          <span><span className="kbd">M</span> 收起</span>
        </div>
      </div>
    </div>
  );
}

function MapHint({onSummon}){
  return (
    <button className="map-hint" onClick={onSummon}
      title="按 M 鍵或 Tab 召喚地圖">
      <svg className="scroll-icn" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M5 4 C5 4 6 6 6 8 L6 17 C6 19 5 20 5 20"/>
        <path d="M5 4 L17 4 C19 4 20 5 20 7 L20 17 C20 19 19 20 17 20 L5 20"/>
        <path d="M9 9 L16 9 M9 12 L16 12 M9 15 L14 15"/>
      </svg>
      <span>展開輿圖</span>
      <span className="kbd">M</span>
    </button>
  );
}

function RegionBackdrop({regionId, variant}){
  const r = MH_REGIONS.find(x => x.id === regionId);
  return (
    <div className={`bg-region region-${r.key} variant-${variant}`}>
      <div className="bg-base"/>
      <div className="bg-silhouette">{Silhouettes[r.key]}</div>
      <div className="bg-variant"/>
    </div>
  );
}

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const povKey = t.pov;
  const region = t.region;

  const [stats, setStats] = useState(() => ({...INITIAL_STATS[povKey]}));
  const [npcStep, setNpcStep] = useState({});
  const [mustSeen, setMustSeen] = useState(() => new Set());
  const [recent, setRecent] = useState([]);
  const [card, setCard] = useState(null);
  const [variant, setVariant] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const [death, setDeath] = useState(null);

  // 封印狀態 (吸血鬼/狼人/騎士/惡魔)
  const [sealsState, setSealsState] = useState({vampire:false, werewolf:false, knight:false, demon:false});
  // 已死亡 POV 集合（順序記錄）
  const [deathHistory, setDeathHistory] = useState([]);

  // 地圖狀態
  const [mapOpen, setMapOpen] = useState(false);
  const [charPositions, setCharPositions] = useState({
    rookie: POV_INITIAL_REGION.rookie,
    huntress: POV_INITIAL_REGION.huntress,
    ace: POV_INITIAL_REGION.ace,
  });
  const [deathPositions, setDeathPositions] = useState({});
  const [exploredRegions, setExploredRegions] = useState(
    () => new Set([POV_INITIAL_REGION.rookie])
  );
  // 結局
  const [ending, setEnding] = useState(null);
  // 女獵人重置次數
  const [resetUsed, setResetUsed] = useState(false);

  // 切換 POV → 重置 per-pov 進度
  useEffect(()=>{
    setStats({...INITIAL_STATS[povKey]});
    setNpcStep({});
    setMustSeen(new Set());
    setRecent([]);
    setDragX(0);
  }, [povKey]);

  // 同步當前角色位置 + 探索區
  useEffect(()=>{
    setCharPositions(p => p[povKey] === region ? p : {...p, [povKey]: region});
    setExploredRegions(s => s.has(region) ? s : new Set([...s, region]));
  }, [povKey, region]);

  // 召喚地圖：M 或 Tab
  useEffect(()=>{
    const fn = (e)=>{
      const key = e.key.toLowerCase();
      if(key === 'm' || e.key === 'Tab'){
        if(death || ending) return;
        e.preventDefault();
        setMapOpen(o => !o);
      }
    };
    window.addEventListener('keydown', fn);
    return ()=>window.removeEventListener('keydown', fn);
  }, [death, ending]);

  // 抽下一張牌
  useEffect(()=>{
    if(death || ending) return;
    const next = MH_pickNext({
      pov: povKey, region,
      npcStep, mustSeen, recent
    });
    setCard(next);
    setVariant(Math.floor(Math.random()*3));
    setCardKey(k => k+1);
  }, [povKey, region, npcStep, mustSeen, death, ending]);

  // 衍生 POV 狀態（依 deathHistory + 當前 POV）
  const povStates = {};
  for(const k of POV_ORDER){
    if(deathHistory.includes(k)) povStates[k] = 'dead';
    else if(k === povKey) povStates[k] = 'active';
    else povStates[k] = 'alive';
  }
  const deceased = deathHistory.map(k => MH_POVS[k].short);

  // 顯示用封印面板：來自 sealsState
  const seals = sealsState;
  const artifacts = {
    rookie:   deathHistory.includes('rookie') ? {state:'dropped', region:'墓穴'} : (sealsState.vampire?{state:'consumed'}:{state:'held'}),
    huntress: deathHistory.includes('huntress') ? {state:'dropped', region:'森林'} : (sealsState.werewolf?{state:'consumed'}:{state:'held'}),
    ace:      sealsState.knight?{state:'consumed'}:{state:'held'},
  };

  // 任務清單（依 POV 與封印狀態動態）
  const quests = useMemo(()=>{
    if(povKey==='rookie') return [
      { text:'抵達第二環封印節點', done:sealsState.vampire },
      { text:'封印吸血伯爵',       done:sealsState.vampire },
      { text:'走父親走過的路',     done:false, hidden:true },
    ];
    if(povKey==='huntress') return [
      { text:'抵達第三環封印節點', done:sealsState.werewolf },
      { text:'封印狼影獸',         done:sealsState.werewolf },
      { text:'查明師父最後遺言',   done:false, hidden:true },
    ];
    return [
      { text:'封印無頭騎士', done:sealsState.knight },
      { text:'進入禁斷密室', done:sealsState.knight && region>=5 },
      { text:'面對惡魔',     done:sealsState.demon },
      { text:'帶回真相',     done:false, hidden:true },
    ];
  }, [povKey, sealsState, region]);

  // 拖曳時的預測 delta（依 effects 計算後顯示）
  const deltas = useMemo(()=>{
    if(!card || death || ending) return {};
    let raw = null;
    if(dragX < -30) raw = card.left.deltas;
    else if(dragX >  30) raw = card.right.deltas;
    if(!raw) return {};
    const { applied } = applyEffects(stats, raw, povKey, region, card.kind);
    return applied;
  }, [dragX, card, death, ending, stats, povKey, region]);

  // 觸發結局
  const triggerEnding = useCallback((nextDeathHistory)=>{
    // 若 ace 死亡 → Bad
    if(nextDeathHistory.includes('ace')){
      setEnding(MH_ENDINGS.bad);
      return;
    }
    // 否則依倖存組合
    const alive = POV_ORDER.filter(k => !nextDeathHistory.includes(k));
    const key = alive.join(',');
    setEnding(MH_ENDINGS[key] || MH_ENDINGS.bad);
  }, []);

  // 提交一次選擇
  const commit = useCallback((dir)=>{
    if(death || ending || !card) return;
    const raw = card[dir].deltas;

    // 套用 effects 計算下一狀態
    const { next: nextStats } = applyEffects(stats, raw, povKey, region, card.kind);

    // 死亡檢測
    let deathStat = null;
    for(const k of STAT_KEYS){
      if(nextStats[k] >= DEATH_THRESHOLD){ deathStat = k; break; }
    }

    setStats(nextStats);

    // 推進 NPC step / must
    setNpcStep(s => ({...s, [card.npc]: (s[card.npc]||1) + 1}));
    if(card.must || card.boss) setMustSeen(s => { const n = new Set(s); n.add(card.id); return n; });
    setRecent(r => [card.id, ...r].slice(0, 4));
    setDragX(0);

    if(deathStat){
      // 死亡：顯示死亡牌
      const dc = MH_DEATH_LINES[povKey]?.[deathStat];
      const newDeathHistory = [...deathHistory, povKey];
      // 在地圖上凍結死亡位置
      setDeathPositions(dp => ({...dp, [povKey]: region}));
      setTimeout(()=>{
        setDeath({ povKey, statKey: deathStat, dc, isFinal: povKey === 'ace', newDeathHistory });
      }, 700);
      return;
    }

    // 沒死且為封印 boss → 封印成功
    if(card.boss && card.sealsBoss){
      setTimeout(()=>{
        setSealsState(s => ({...s, [card.sealsBoss]: true}));
        // 若是惡魔（最終）→ 觸發 Good End
        if(card.isFinal){
          setTimeout(()=>triggerEnding(deathHistory), 800);
        } else {
          // 推進到下一 POV
          const idx = POV_ORDER.indexOf(povKey);
          if(idx < POV_ORDER.length - 1){
            const nextPov = POV_ORDER[idx + 1];
            setTimeout(()=>setTweak({pov: nextPov, region: POV_INITIAL_REGION[nextPov]}), 600);
          }
        }
      }, 400);
    }
  }, [card, povKey, region, death, ending, stats, deathHistory, setTweak, triggerEnding]);

  // 死亡後接手下一位 / 看結局
  const continueAfterDeath = useCallback(()=>{
    const newHistory = death.newDeathHistory;
    setDeathHistory(newHistory);
    const idx = POV_ORDER.indexOf(death.povKey);
    if(death.isFinal || idx >= POV_ORDER.length - 1){
      // 王牌死 → Bad End
      setDeath(null);
      triggerEnding(newHistory);
    } else {
      const nextPov = POV_ORDER[idx + 1];
      setDeath(null);
      setTweak({ pov: nextPov, region: POV_INITIAL_REGION[nextPov] });
    }
  }, [death, setTweak, triggerEnding]);

  // 重置整局（結局結束）
  const restartAll = useCallback(()=>{
    setEnding(null);
    setDeath(null);
    setDeathHistory([]);
    setSealsState({vampire:false, werewolf:false, knight:false, demon:false});
    setResetUsed(false);
    setDeathPositions({});
    setCharPositions({
      rookie: POV_INITIAL_REGION.rookie,
      huntress: POV_INITIAL_REGION.huntress,
      ace: POV_INITIAL_REGION.ace,
    });
    setExploredRegions(new Set([POV_INITIAL_REGION.rookie]));
    setMapOpen(false);
    setTweak({ pov:'rookie', region:1 });
  }, [setTweak]);

  // 女獵人重置（任一指標歸 50）
  const huntressReset = useCallback(()=>{
    if(resetUsed || povKey !== 'huntress') return;
    // 找最差的指標重置
    let worst = null, worstVal = -1;
    for(const k of STAT_KEYS){
      // sanity/hydration/fear/bleed 都是越高越接近死亡
      if(stats[k] > worstVal){ worstVal = stats[k]; worst = k; }
    }
    if(worst){
      setStats(s => ({...s, [worst]: 50}));
      setResetUsed(true);
    }
  }, [resetUsed, povKey, stats]);

  useEffect(()=>{
    document.querySelectorAll('.fog').forEach(el=>{
      el.style.display = t.showFog ? '' : 'none';
    });
  }, [t.showFog]);

  if(!card) return null;
  card.__key = cardKey;

  return (
    <>
      <RegionBackdrop regionId={region} variant={variant}/>

      <StatsBar stats={stats} deltas={deltas} povKey={povKey} region={region}
        showHint={t.showHints && !death && !ending}/>
      <POVPanel pov={MH_POVS[povKey]} region={region} deceased={deceased}/>
      <SealsPanel seals={seals}/>

      <EventCard card={card} povKey={povKey} onCommit={commit}
        dragX={dragX} setDragX={setDragX} disabled={!!death || !!ending}/>

      <Roster povKey={povKey} povStates={povStates}
        onReset={huntressReset} resetUsed={resetUsed}/>
      <Artifacts artifacts={artifacts}/>
      <Quests quests={quests}/>

      <MapHint onSummon={()=>setMapOpen(true)}/>
      <MapOverlay open={mapOpen} onClose={()=>setMapOpen(false)}
        povKey={povKey}
        charPositions={charPositions}
        deathPositions={deathPositions}
        exploredRegions={exploredRegions}
        sealsState={sealsState}
        deathHistory={deathHistory}/>

      {death && (
        <DeathOverlay info={death} isFinal={death.isFinal} onContinue={continueAfterDeath}/>
      )}
      {ending && (
        <EndingOverlay ending={ending} onReset={restartAll}/>
      )}

      <TweaksPanel title="Manor Hunt — Tweaks">
        <TweakSection label="POV / 視角"/>
        <TweakRadio label="主角"
          value={povKey} options={['rookie','huntress','ace']}
          onChange={(v)=>{ setDeath(null); setTweak({pov:v, region:POV_INITIAL_REGION[v]}); }}/>
        <TweakSection label="場景"/>
        <TweakSelect label="區域"
          value={region}
          options={MH_REGIONS.map(r=>({label:`${r.meta} · ${r.short}`, value:r.id}))}
          onChange={(v)=>setTweak('region', Number(v))}/>
        <TweakSection label="氛圍"/>
        <TweakToggle label="霧氣動畫"
          value={t.showFog} onChange={(v)=>setTweak('showFog', v)}/>
        <TweakToggle label="拖曳箭頭預測"
          value={t.showHints} onChange={(v)=>setTweak('showHints', v)}/>
        <TweakSection label="開發測試"/>
        <TweakButton label="重置本回合"
          onClick={()=>{ setDeath(null); setStats({...INITIAL_STATS[povKey]}); }}/>
        <TweakButton label="重新開始整局"
          onClick={restartAll}/>
        <TweakButton label="開啟地圖（M / Tab）"
          onClick={()=>setMapOpen(o=>!o)}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
