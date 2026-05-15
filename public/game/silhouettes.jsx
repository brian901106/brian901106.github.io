// silhouettes.jsx — region backdrops + simple portraits
// Placeholders: stylized abstract shapes; not photoreal.

const Silhouettes = {
  courtyard: (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYEnd slice">
      {/* Distant manor */}
      <g fill="#0a0604">
        <polygon points="1100,560 1100,860 1820,860 1820,560 1760,520 1700,560 1640,510 1580,560 1520,500 1460,560 1400,520 1340,560 1280,510 1220,560 1160,520" />
        {/* spires */}
        <polygon points="1240,560 1260,440 1280,560" />
        <polygon points="1500,560 1520,400 1540,560" />
        <polygon points="1700,560 1720,460 1740,560" />
      </g>
      {/* iron fence */}
      <g fill="#000" opacity=".95">
        <rect x="0" y="780" width="1920" height="14"/>
        {Array.from({length:36}).map((_,i)=>(
          <g key={i} transform={`translate(${i*55},${720})`}>
            <rect x="0" y="0" width="6" height="100"/>
            <polygon points="-4,0 9,0 3,-12"/>
          </g>
        ))}
        <rect x="0" y="700" width="1920" height="6"/>
      </g>
      {/* dead trees */}
      <g fill="#000" opacity=".9">
        <path d="M100 780 L110 540 L120 780 Z"/>
        <path d="M105 600 L70 540 M115 580 L150 530 M110 560 L100 510 M115 555 L130 510" stroke="#000" strokeWidth="3" fill="none"/>
        <path d="M1840 780 L1850 480 L1860 780 Z"/>
        <path d="M1850 540 L1810 490 M1855 520 L1890 470 M1852 500 L1840 460" stroke="#000" strokeWidth="3" fill="none"/>
      </g>
    </svg>
  ),

  catacombs: (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYEnd slice">
      {/* arched ceiling */}
      <g fill="#0a0604">
        <path d="M0 0 L0 360 Q120 220 240 360 Q360 220 480 360 Q600 220 720 360 Q840 220 960 360 Q1080 220 1200 360 Q1320 220 1440 360 Q1560 220 1680 360 Q1800 220 1920 360 L1920 0 Z"/>
      </g>
      {/* sarcophagi */}
      <g fill="#000">
        <rect x="100" y="820" width="380" height="60"/>
        <polygon points="100,820 140,790 440,790 480,820"/>
        <rect x="1440" y="820" width="380" height="60"/>
        <polygon points="1440,820 1480,790 1780,790 1820,820"/>
      </g>
      {/* dripping candles */}
      <g fill="#000" opacity=".95">
        <rect x="940" y="320" width="6" height="80"/>
        <rect x="1080" y="340" width="6" height="60"/>
        <rect x="820" y="350" width="6" height="50"/>
      </g>
    </svg>
  ),

  forest: (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYEnd slice">
      {/* moonlight glow */}
      <defs>
        <radialGradient id="moonglow" cx="50%" cy="20%" r="40%">
          <stop offset="0%" stopColor="#cdd9e8" stopOpacity=".18"/>
          <stop offset="100%" stopColor="#cdd9e8" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#moonglow)"/>
      <g fill="#000">
        {/* trees */}
        {[80,260,420,1500,1660,1820].map((x,i)=>(
          <g key={i}>
            <rect x={x} y="280" width="14" height="600"/>
            <path d={`M${x-18} 480 L${x+7} 320 L${x+30} 480 Z`}/>
            <path d={`M${x-26} 600 L${x+7} 360 L${x+38} 600 Z`}/>
          </g>
        ))}
        {/* ground roots */}
        <path d="M0 880 Q200 820 400 870 Q600 920 800 870 Q1000 820 1200 880 Q1400 940 1600 870 Q1800 820 1920 880 L1920 1080 L0 1080 Z"/>
      </g>
    </svg>
  ),

  hall: (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYEnd slice">
      <g fill="#0a0604">
        {/* columns */}
        {[120, 1740].map((x,i)=>(
          <g key={i}>
            <rect x={x} y="180" width="60" height="700"/>
            <rect x={x-12} y="170" width="84" height="20"/>
            <rect x={x-12} y="870" width="84" height="20"/>
          </g>
        ))}
        {/* broken statue */}
        <g transform="translate(960 600)">
          <rect x="-40" y="200" width="80" height="80"/>
          <rect x="-26" y="40" width="52" height="160"/>
          <polygon points="-30,40 0,-30 30,40"/>
          <rect x="-90" y="280" width="180" height="20"/>
        </g>
        {/* lantern stands */}
        <rect x="500" y="500" width="6" height="380"/>
        <rect x="490" y="490" width="26" height="14"/>
        <rect x="1414" y="500" width="6" height="380"/>
        <rect x="1404" y="490" width="26" height="14"/>
      </g>
    </svg>
  ),

  sanctum: (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYEnd slice">
      <g fill="#0a0604">
        <rect x="0" y="780" width="1920" height="120"/>
        {/* runic circle */}
        <circle cx="960" cy="780" r="280" fill="none" stroke="#3a1818" strokeWidth="2"/>
        <circle cx="960" cy="780" r="220" fill="none" stroke="#3a1818" strokeWidth="2"/>
        {Array.from({length:12}).map((_,i)=>{
          const a = (i/12) * Math.PI*2;
          const x1 = 960 + Math.cos(a)*220;
          const y1 = 780 + Math.sin(a)*220;
          const x2 = 960 + Math.cos(a)*280;
          const y2 = 780 + Math.sin(a)*280;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5a1818" strokeWidth="2"/>
        })}
      </g>
      {/* blood splatter */}
      <g fill="#3a0808" opacity=".8">
        <path d="M820 880 q-30 -10 -50 10 q40 30 60 -10 z"/>
        <path d="M1100 850 q40 -20 70 20 q-40 30 -70 -20 z"/>
      </g>
    </svg>
  ),
};

// Portrait placeholder system: simple geometric figure with traits.
// We use abstract forms (mask-like silhouettes) — original art, not photoreal.
function Portrait({tone, kind}){
  // tone: bg color of portrait box
  const palettes = {
    rookie:    { skin:'#d8c8b8', cloak:'#3c4a5c', accent:'#8aa1bb' },
    huntress:  { skin:'#cab8b6', cloak:'#3a2855', accent:'#a78ad8' },
    ace:       { skin:'#d4b78a', cloak:'#5c3f1a', accent:'#e0b85c' },
    ghost:     { skin:'#bcc6d0', cloak:'#2a2e36', accent:'#cfd6df' },
    succubus:  { skin:'#a85a5a', cloak:'#2a0a14', accent:'#cf3a3a' },
    knight:    { skin:'#1a1a1a', cloak:'#0e0e0e', accent:'#7a8898' },
    werewolf:  { skin:'#2a1a14', cloak:'#1a0c08', accent:'#7a3a1a' },
    vampire:   { skin:'#c8b8c0', cloak:'#1a0a14', accent:'#7a1a2a' },
    witch:     { skin:'#9aa68a', cloak:'#1a2018', accent:'#c8d8a0' },
  };
  const p = palettes[kind] || palettes.rookie;

  return (
    <svg viewBox="0 0 400 380" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`bg-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tone} stopOpacity="1"/>
          <stop offset="100%" stopColor="#000" stopOpacity=".55"/>
        </linearGradient>
        <filter id={`g-${kind}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={kind.length}/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .12 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="380" fill={`url(#bg-${kind})`}/>

      {/* candlelight rim */}
      <ellipse cx="200" cy="200" rx="240" ry="220" fill="none"
        stroke="rgba(255,200,140,0.05)" strokeWidth="40"/>

      {/* shoulders */}
      <path d={`M40 380 L40 320 Q200 250 360 320 L360 380 Z`} fill={p.cloak}/>
      <path d={`M120 320 Q200 280 280 320 L280 360 L120 360 Z`} fill={p.accent} opacity=".4"/>

      {/* neck */}
      <rect x="180" y="220" width="40" height="40" fill={p.skin}/>
      <path d="M180 250 L220 250 L220 270 L180 270 Z" fill={p.skin} opacity=".6"/>

      {/* head — slight angular block (Reigns-derivative style avoided; keep abstract) */}
      <ellipse cx="200" cy="180" rx="64" ry="76" fill={p.skin}/>

      {/* hair / hood — varies by kind */}
      {kind === 'rookie' && (
        <>
          {/* short hair, fearful eyes */}
          <path d="M138 150 Q200 90 262 150 L262 175 Q200 145 138 175 Z" fill="#2a2018"/>
          <ellipse cx="178" cy="190" rx="4" ry="6" fill="#1a1208"/>
          <ellipse cx="222" cy="190" rx="4" ry="6" fill="#1a1208"/>
          <path d="M186 222 Q200 226 214 222" stroke="#1a1208" strokeWidth="2" fill="none"/>
        </>
      )}
      {kind === 'huntress' && (
        <>
          {/* hooded */}
          <path d="M120 180 Q120 80 200 70 Q280 80 280 180 L270 200 Q200 175 130 200 Z" fill={p.cloak}/>
          <path d="M138 162 Q200 130 262 162 L262 180 Q200 152 138 180 Z" fill="#1a1018" opacity=".8"/>
          <ellipse cx="178" cy="198" rx="3" ry="5" fill="#e0bce0"/>
          <ellipse cx="222" cy="198" rx="3" ry="5" fill="#e0bce0"/>
          <path d="M188 230 L212 230" stroke="#1a0a1a" strokeWidth="2"/>
        </>
      )}
      {kind === 'ace' && (
        <>
          <path d="M138 150 Q200 110 262 150 L262 175 Q200 155 138 175 Z" fill="#3a3028"/>
          <ellipse cx="178" cy="190" rx="3" ry="5" fill="#1a1208"/>
          <ellipse cx="222" cy="190" rx="3" ry="5" fill="#1a1208"/>
          {/* eye-patch over right */}
          <path d="M155 178 L240 195 L240 205 L155 188 Z" fill="#0a0604"/>
          <line x1="240" y1="195" x2="270" y2="160" stroke="#0a0604" strokeWidth="3"/>
          {/* scar */}
          <path d="M170 158 L180 178 L172 196" stroke="#5a2818" strokeWidth="2" fill="none"/>
          <path d="M186 230 Q200 226 214 230" stroke="#1a1208" strokeWidth="2" fill="none"/>
        </>
      )}
      {kind === 'ghost' && (
        <>
          <ellipse cx="200" cy="180" rx="64" ry="76" fill="#cfd9e2" opacity=".6"/>
          <ellipse cx="178" cy="190" rx="6" ry="8" fill="#0a0a0a"/>
          <ellipse cx="222" cy="190" rx="6" ry="8" fill="#0a0a0a"/>
          <ellipse cx="200" cy="225" rx="14" ry="10" fill="#0a0a0a" opacity=".7"/>
        </>
      )}
      {kind === 'succubus' && (
        <>
          {/* horns */}
          <path d="M150 130 L138 80 L172 120 Z" fill="#1a0a14"/>
          <path d="M250 130 L262 80 L228 120 Z" fill="#1a0a14"/>
          <ellipse cx="178" cy="195" rx="5" ry="4" fill="#cf3a3a"/>
          <ellipse cx="222" cy="195" rx="5" ry="4" fill="#cf3a3a"/>
          <path d="M180 228 Q200 240 220 228" stroke="#5a0a1a" strokeWidth="3" fill="none"/>
        </>
      )}
      {kind === 'knight' && (
        <>
          {/* helm — no head visible */}
          <rect x="136" y="100" width="128" height="160" fill="#1a1a1c"/>
          <rect x="136" y="100" width="128" height="14" fill="#2a2a2e"/>
          <rect x="148" y="180" width="104" height="6" fill="#000"/>
          <rect x="156" y="190" width="20" height="14" fill="#000"/>
          <rect x="224" y="190" width="20" height="14" fill="#000"/>
        </>
      )}
      {kind === 'werewolf' && (
        <>
          <ellipse cx="200" cy="180" rx="80" ry="76" fill="#2a1a14"/>
          {/* ears */}
          <polygon points="140,110 150,150 175,135" fill="#2a1a14"/>
          <polygon points="260,110 250,150 225,135" fill="#2a1a14"/>
          {/* glowing eyes */}
          <ellipse cx="178" cy="180" rx="6" ry="4" fill="#e0a040"/>
          <ellipse cx="222" cy="180" rx="6" ry="4" fill="#e0a040"/>
          <polygon points="190,222 200,238 210,222 205,228 200,232 195,228" fill="#f0e0d0"/>
        </>
      )}
      {kind === 'vampire' && (
        <>
          <path d="M138 150 Q200 95 262 150 L262 175 Q200 145 138 175 Z" fill="#0a0a0e"/>
          <path d="M138 150 L155 110 L172 145 Z" fill="#0a0a0e"/>
          <path d="M262 150 L245 110 L228 145 Z" fill="#0a0a0e"/>
          <ellipse cx="178" cy="195" rx="3" ry="5" fill="#7a1a2a"/>
          <ellipse cx="222" cy="195" rx="3" ry="5" fill="#7a1a2a"/>
          <polygon points="194,228 198,236 200,228" fill="#fff"/>
          <polygon points="200,228 202,236 206,228" fill="#fff"/>
        </>
      )}
      {kind === 'witch' && (
        <>
          <path d="M120 180 Q120 90 200 70 Q280 90 280 180 L270 195 Q200 168 130 195 Z" fill="#1a2018"/>
          <ellipse cx="178" cy="198" rx="3" ry="5" fill="#c0d8a0"/>
          <ellipse cx="222" cy="198" rx="3" ry="5" fill="#c0d8a0"/>
          <path d="M180 232 Q200 222 220 232" stroke="#1a0a08" strokeWidth="2" fill="none"/>
        </>
      )}

      {/* subtle grain overlay */}
      <rect width="400" height="380" fill={tone} opacity="0.03"
        style={{mixBlendMode:'overlay'}}/>
    </svg>
  );
}

window.Silhouettes = Silhouettes;
window.Portrait = Portrait;
