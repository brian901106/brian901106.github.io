// deck.jsx — Manor Hunt v2.0
// 環狀結構：庭院 I → 墓穴 II（吸血鬼·新人封）→ 森林 III（狼人·女獵人封）
//          → 大廳 IV（騎士·王牌封）→ 密室 V（惡魔·最終）

const REGIONS = [
  { id:1, key:'courtyard', name:'庭院 · The Courtyard',  short:'COURTYARD',  meta:'RING I' },
  { id:2, key:'catacombs', name:'地下墓穴 · Catacombs',   short:'CATACOMBS',  meta:'RING II' },
  { id:3, key:'forest',    name:'詛咒森林 · Cursed Wood', short:'CURSED WOOD',meta:'RING III' },
  { id:4, key:'hall',      name:'黑暗大廳 · Dark Hall',   short:'DARK HALL',  meta:'RING IV' },
  { id:5, key:'sanctum',   name:'禁斷密室 · Forbidden Sanctum', short:'SANCTUM', meta:'RING V' },
];

const POVS = {
  rookie:   { name:'新人 · The Novice',   short:'NOVICE',   traits:['靈異體質','新手運'],
    tone:'#2A3D5C', kind:'rookie',   sealsBoss:'vampire', artifact:'父親的舊銅鎖' },
  huntress: { name:'女獵人 · The Huntress', short:'HUNTRESS', traits:['自我控制','重置×1'],
    tone:'#2D1F45', kind:'huntress', sealsBoss:'werewolf', artifact:'師父的銀刃' },
  ace:      { name:'王牌 · The Ace',     short:'ACE',      traits:['王牌·五區前無懼','冷靜±15上限'],
    tone:'#3D2A0F', kind:'ace',      sealsBoss:'knight',  artifact:'父親留下的舊鑰匙' },
};

// Boss → 區域 / 封印者 / 顯示名
const BOSSES = {
  cripple:  { region:1, sealer:null,      name:'瘸子',       kind:'witch'   },
  vampire:  { region:2, sealer:'rookie',  name:'吸血伯爵',   kind:'vampire' },
  werewolf: { region:3, sealer:'huntress',name:'狼影獸',     kind:'werewolf'},
  knight:   { region:4, sealer:'ace',     name:'無頭騎士',   kind:'knight'  },
  demon:    { region:5, sealer:'ace',     name:'惡魔',       kind:'succubus'},
};

// ─── 死亡牌：依 (pov, statKey) → 死法 + 法器遺落 ──────────────────────
const DEATH_CARDS = {
  rookie: {
    sanity:    { kind:'rookie', stat:'瘋狂',
      cause:'走廊的低語成了他自己的聲音。新人在牆上寫下父親的名字，越寫越多，越寫越亂。最後他坐了下來，再沒有起身。',
      relic:'父親的舊銅鎖落在牆角，鎖面刻著一個只有他血脈能啟動的符文——它在等下一個血親。' },
    hydration: { kind:'rookie', stat:'脫水',
      cause:'他連水袋都沒打開——以為還能撐到下一座井。新人最後在第一環的鐵柵前蜷起身體。',
      relic:'銅鎖滑落在井邊。鎖鏈未斷，只是不再溫熱。' },
    fear:      { kind:'rookie', stat:'恐懼',
      cause:'門後並沒有怪物。新人在吸血鬼的封印節點前跪下，沒有任何傷口。靈異體質讓他看見了太多。',
      relic:'銅鎖留在他腳邊，與父親五年前留下的外套疊在一起。' },
    bleed:     { kind:'rookie', stat:'失血',
      cause:'伯爵甚至沒有靠近。新人在墓穴深處嘗試啟動法器，他差一點——就差一點。',
      relic:'銅鎖從他手中滑落，沾血墜地——封印未完成，等下一個能啟動它的人。' },
  },
  huntress: {
    sanity:    { kind:'huntress', stat:'瘋狂',
      cause:'她開始記不得是誰殺了誰。最後她對著鏡中的自己拔出了銀彈，扣下扳機之前露出了笑。',
      relic:'師父的銀刃插在她身旁的土上——刃還亮，只是握柄不再有人撐著。' },
    hydration: { kind:'huntress', stat:'脫水',
      cause:'森林裡她的唇焦裂如紙。她不肯喝那些不該喝的東西。她坐著，等到自己成了森林的一部分。',
      relic:'銀刃從她攤開的指間滑出，停在師父當年刻下的符文旁。' },
    fear:      { kind:'huntress', stat:'恐懼',
      cause:'狼影笑得很真——女獵人也信了。控制是她的盔甲，也是壓垮她的重量。',
      relic:'銀刃留在樹根間，刀尖朝向月光的方向，像是她最後仍想離開。' },
    bleed:     { kind:'huntress', stat:'失血',
      cause:'狼影的爪痕沒有結痂。她把法器放在土上，倒在師父刻過的那棵樹下，閉上眼。',
      relic:'銀刃倒插在樹根間，與師父的符文並排——它們最後並肩。' },
  },
  ace: {
    sanity:    { kind:'ace', stat:'瘋狂',
      cause:'王牌看見了密室盡頭真正在等他的東西。他笑了，五年前沒有笑出來的那個聲音，這次出來了。',
      relic:'父親的舊鑰匙留在密室門上——它不會再被取下，那是他最後的封印。' },
    hydration: { kind:'ace', stat:'脫水',
      cause:'惡魔留給他最後一杯酒。他知道那不是水，他還是喝了。五年前沒喝下的那口，今晚補上了。',
      relic:'鑰匙落在酒杯邊，杯緣微紅，鑰齒朝外，像在指誰下一個該來。' },
    fear:      { kind:'ace', stat:'恐懼',
      cause:'第五環的門開了。王牌第一次怕了。一次就夠了。他沒能再走完最後幾步。',
      relic:'鑰匙從他手中滑落到密室門前——後來的人若懂，就知道它在等。' },
    bleed:     { kind:'ace', stat:'失血',
      cause:'他用最後一滴血畫完了符文。封印完成，他沒能起身。但他這次沒有跑——這比五年前重要。',
      relic:'鑰匙嵌在符文中央，再也拔不出來——那是它終於找到的位置。' },
  },
};

// ─── 結局牌 (依倖存組合) ─────────────────────────────────────────────
const ENDINGS = {
  'rookie,huntress,ace': {
    title:'家族盛大', subtitle:'Three Returned',
    kind:'ace',
    body:'三人在莊園大門外重逢。王牌把檔案箱放在地上：「你們要看嗎？」 一個月後，產權悄悄轉至家族名下。新人駐守，女獵人建情報網，王牌打獵，每隔一段時間回來。',
    epilogue:'奧瓦的墓碑被立起，刻上了她真正的名字。' },
  'huntress,ace': {
    title:'短暫復興', subtitle:'A Fading Light',
    kind:'huntress',
    body:'女獵人繼承管理權，但缺乏血脈知識，幾年後將莊園轉交給她信任的人，自己回到打獵。',
    epilogue:'她每年某一天，會回到師父刻符文的那棵樹前，待一會兒。' },
  'ace': {
    title:'孤獨遺產', subtitle:'A Solitary Witness',
    kind:'ace',
    body:'王牌一個人走出來。他把檔案箱交給獨立學者整理成公開報告。莊園後來成了教堂。',
    epilogue:'正門旁立了石牌，刻著初代五人的名字。據說那天黃昏有人路過，停了一下。' },
  'rookie,ace': {
    title:'默默守護', subtitle:'Quiet Inheritance',
    kind:'rookie',
    body:'新人繼承莊園，但缺乏果決。某夜王牌沒有預告地回來。莊園沒能保住，產權轉移。',
    epilogue:'新人跟著王牌上路，開始打獵——那是他父親的工作，他用最迂迴的方式學到的事。' },
  'bad': {
    title:'未完', subtitle:'Untold',
    kind:'knight', isBad:true,
    body:'惡魔未被封印。莊園的門從此再沒打開過。盟會將之列為紅色禁區，對外稱結構不穩定。',
    epilogue:'任務記錄欄只有兩個字：「未完。」' },
};

// ─── 卡牌資料庫 ──────────────────────────────────────────
const CARDS = [
  // ── RING I · 庭院 — 共用入口 ──
  { id:'CP-01', npc:'cripple', step:1, pov:'all', regions:[1], must:true, kind:'witch',
    speaker:'瘸子', role:'庭院 · 第一遭遇',
    body:'拖著一條腿的男人從鐵柵後爬出來，他的眼神跟人不一樣。「都過去了。」他說，「都過去了五年。」',
    left:  { label:'繞道', deltas:{fear:+15, sanity:+8} },
    right: { label:'過去問', deltas:{fear:+22, bleed:+18, sanity:+12} } },

  // 沙赫爾 SA (新人/王牌)
  { id:'SA-001', npc:'sahel', step:1, pov:'rookie', regions:[1], must:true, kind:'huntress',
    speaker:'沙赫爾 · 老獵人', role:'庭院 · 必觸發',
    body:'老人靠在石牆上抽菸斗。「你父親叫什麼名字？」',
    left:  { label:'說出父親名字', deltas:{sanity:+22, fear:-8} },
    right: { label:'反問他是誰',   deltas:{sanity:+12, fear:+6} } },
  { id:'SA-002', npc:'sahel', step:2, pov:'rookie', regions:[1,2], kind:'huntress',
    speaker:'沙赫爾 · 再遇', role:'庭院',
    body:'「你去了？」「還沒。」「那你在猶豫什麼？」',
    left:  { label:'想他怎麼想的', deltas:{sanity:+24, fear:-15} },
    right: { label:'你為何不進去', deltas:{sanity:+28, hydration:+12} } },
  { id:'SA-003', npc:'sahel', step:3, pov:'rookie', regions:[1,2], kind:'huntress',
    speaker:'沙赫爾 · 包紮', role:'流血時',
    body:'他蹲下幫你重新包紮，手法很熟練——他選擇退休，不是死。',
    left:  { label:'沉默接受', deltas:{bleed:-35, hydration:+10, sanity:+18} },
    right: { label:'問外面看見什麼', deltas:{bleed:-30, sanity:+22, fear:+12} } },
  { id:'SA-005', npc:'sahel', step:1, pov:'ace', regions:[1,4], kind:'huntress',
    speaker:'沙赫爾 · 菸草氣味', role:'王牌 · 隨機',
    body:'庭院某處聞到熟悉的菸味。「你活著。」他說。',
    left:  { label:'你怎麼會在這裡', deltas:{sanity:+15, fear:-10} },
    right: { label:'你知道我活著', deltas:{bleed:-30, sanity:+10} } },

  // ── RING II · 墓穴 — 新人封吸血鬼 ──
  { id:'BOSS-V', npc:'boss-v', step:1, pov:'rookie', regions:[2], boss:true, sealsBoss:'vampire', kind:'vampire',
    speaker:'吸血伯爵 · Vlasic', role:'第二環封印 · BOSS',
    body:'「你已不是第一個踏進這扇門的人。」他的笑很慢，他的牙比你想的多。父親五年前停在同一個位置。',
    left:  { label:'點亮符文', deltas:{bleed:+25, sanity:+22} },
    right: { label:'近身斬斷', deltas:{bleed:+45, fear:+28, hydration:+22} } },
  { id:'PH-001', npc:'ph01', step:1, pov:'all', regions:[2], kind:'ghost',
    speaker:'幻影 · 初代隊伍', role:'墓穴 · 殘影',
    body:'五個灰色人影出現在走廊盡頭，作戰，一個倒下，然後另一個——',
    left:  { label:'看完', deltas:{sanity:+28, fear:+12} },
    right: { label:'轉頭不看', deltas:{sanity:+15, fear:+25} } },
  { id:'BF-001', npc:'fer', step:1, pov:'all', regions:[2], kind:'witch',
    speaker:'布藍·費爾 · 情報商', role:'墓穴',
    body:'「你想知道五年前那批人在找什麼嗎？要一件道具來換。」',
    left:  { label:'同意交換',     deltas:{sanity:+25, hydration:+18} },
    right: { label:'問他怎麼知道', deltas:{sanity:+15, fear:+10} } },
  { id:'BF-002', npc:'fer', step:2, pov:'all', regions:[2,4], kind:'witch',
    speaker:'布藍·費爾 · 地圖另半', role:'隨機',
    body:'他從懷裡摸出另一張紙。「另一半。」',
    left:  { label:'你有殘片',     deltas:{sanity:+25, fear:+8} },
    right: { label:'要什麼換',     deltas:{sanity:+18, hydration:+10} } },
  { id:'MG-001', npc:'margot', step:1, pov:'all', regions:[2], kind:'ghost',
    speaker:'瑪格麗特 · 老廚師亡魂', role:'墓穴 · 餐廳',
    body:'她端著空盤從你身邊飄過。「客人要趁熱吃，您不吃我會難過的。」',
    left:  { label:'說我吃過了', deltas:{hydration:+5, fear:+8} },
    right: { label:'坐下吃',     deltas:{hydration:-22, sanity:+15, fear:-12} } },

  // ── RING III · 森林 — 女獵人封狼人 ──
  { id:'BOSS-W', npc:'boss-w', step:1, pov:'huntress', regions:[3], boss:true, sealsBoss:'werewolf', kind:'werewolf',
    speaker:'狼影 · The Beast', role:'第三環封印 · BOSS',
    body:'月光下牠在等。牠的呼吸與你的同步——那是你最不該注意到的事。',
    left:  { label:'退入墓穴', deltas:{sanity:+18, hydration:+18, fear:+15} },
    right: { label:'掏出銀彈', deltas:{bleed:+48, fear:+28, hydration:+22} } },
  { id:'GL-001', npc:'greta', step:1, pov:'huntress', regions:[3], must:true, kind:'huntress',
    speaker:'葛列塔 · 年輕獵人', role:'森林 · 必觸發',
    body:'她踹開腐爛木門，差點對你開火。「你是後代之一。我師父五年前死在這裡。」',
    left:  { label:'問她怎麼知道家族', deltas:{sanity:+25, fear:+10} },
    right: { label:'反問她是誰',       deltas:{sanity:+18, hydration:+10} } },
  { id:'GL-002', npc:'greta', step:2, pov:'huntress', regions:[3], kind:'huntress',
    speaker:'葛列塔 · 再遇', role:'森林',
    body:'「盟會說，他們撤退時把能帶的都帶走了。你相信嗎？」',
    left:  { label:'我在找師父遺物', deltas:{sanity:+22, hydration:+8} },
    right: { label:'只說完成任務',   deltas:{bleed:-30, sanity:+12} } },
  { id:'GL-003', npc:'greta', step:3, pov:'huntress', regions:[3], kind:'huntress',
    speaker:'葛列塔 · 兩棵符文', role:'森林',
    body:'她看見你的手放在那棵樹上。「你找到他留下的東西了？」',
    left:  { label:'告訴她位置', deltas:{sanity:+30, fear:-20} },
    right: { label:'說沒找到',   deltas:{sanity:+15, fear:+8} } },
  { id:'SC-002', npc:'succ', step:1, pov:'huntress', regions:[3], kind:'succubus',
    speaker:'魅魔 · 動機', role:'隨機',
    body:'「你師父的死，對你來說夠不夠當一個理由？」',
    left:  { label:'問她什麼意思', deltas:{hydration:+38, sanity:+22} },
    right: { label:'不回應離開',   deltas:{hydration:+25, fear:-8} } },
  { id:'BN-001', npc:'bernois', step:1, pov:'huntress', regions:[3], kind:'vampire',
    speaker:'伯努瓦 · 半轉化', role:'森林 · 道德抉擇',
    body:'前獵魔人，半邊臉已不像人。「讓我陪你打狼影，我只需要一個承諾——封印完後別追我。」',
    left:  { label:'拒絕', deltas:{fear:+18, sanity:+10} },
    right: { label:'承諾', deltas:{bleed:-25, sanity:+12, fear:-10} } },

  // ── RING IV · 大廳 — 王牌封騎士 ──
  { id:'BOSS-K', npc:'boss-k', step:1, pov:'ace', regions:[4], boss:true, sealsBoss:'knight', kind:'knight',
    speaker:'無頭騎士', role:'第四環封印 · BOSS',
    body:'門縫滲出鐵鏽味。無頭甲冑在另一側等你。你五年前停在同一個位置。',
    left:  { label:'繞道', deltas:{fear:+30, sanity:+12, bleed:-10} },
    right: { label:'破門應戰', deltas:{bleed:+45, fear:+22, sanity:+15} } },
  { id:'IS-001', npc:'isa', step:1, pov:'ace', regions:[4], must:true, kind:'witch',
    speaker:'伊薩貝爾 · 倖存者', role:'大廳 · 必觸發',
    body:'她靠在牆上，右腿包紮已舊。「你活著。」「你也是。」「勉強算。」',
    left:  { label:'問她怎麼在這裡', deltas:{fear:+22, sanity:+12} },
    right: { label:'問她腿的狀況',   deltas:{sanity:-10, fear:-6} } },
  { id:'IS-002', npc:'isa', step:2, pov:'ace', regions:[4], kind:'witch',
    speaker:'伊薩貝爾 · 再遇', role:'大廳',
    body:'「你是進來超過一次還活著的第一個人。」',
    left:  { label:'為什麼這件事重要', deltas:{sanity:+25, fear:+15} },
    right: { label:'你看見什麼了',   deltas:{sanity:+18, fear:+18} } },
  { id:'OW-001', npc:'oldwoman', step:1, pov:'ace', regions:[4], kind:'ghost',
    speaker:'老婦 · 領主夫人', role:'大廳 · 幽靈',
    body:'她端著茶站在窗邊。「主人說，後來的人若懂得敲門，就讓他進。」她把茶遞給你。',
    left:  { label:'接過杯子', deltas:{hydration:-15, sanity:+22, fear:-12} },
    right: { label:'婉拒',     deltas:{sanity:+10, fear:+12} } },
  { id:'SB-001', npc:'seb', step:1, pov:'ace', regions:[4], kind:'vampire',
    speaker:'賽巴斯 · 領主之子', role:'大廳',
    body:'「你是這次來的，還是五年前那批的？」「這次。」「活著。」',
    left:  { label:'你怎麼知道', deltas:{sanity:+22, fear:+12} },
    right: { label:'你是誰',     deltas:{sanity:+15, fear:+8} } },

  // ── RING V · 密室 — 惡魔 (FINAL) ──
  { id:'BOSS-D', npc:'boss-d', step:1, pov:'ace', regions:[5], boss:true, isFinal:true, sealsBoss:'demon', kind:'succubus',
    speaker:'惡魔 · The Source', role:'最終封印 · BOSS',
    body:'牠從不止一張臉裡看你。「你身後倒下的最後一個人，叫什麼名字？」',
    left:  { label:'記得他的名字', deltas:{sanity:+30, fear:+45} },
    right: { label:'封印到底', deltas:{bleed:+40, fear:+38, sanity:+22} } },
  { id:'SC-003', npc:'succ', step:1, pov:'ace', regions:[5], kind:'succubus',
    speaker:'魅魔 · 五年前', role:'密室',
    body:'「你跑出去之後，還有一個人撐了很久——但那個人沒能出去。」',
    left:  { label:'你看見什麼', deltas:{hydration:+38, bleed:+22} },
    right: { label:'為何告訴我', deltas:{hydration:+28, sanity:+18} } },

  // ── 通用：幻影 / 雙胞胎 / 托比 ──
  { id:'TW-001', npc:'twins', step:1, pov:'all', regions:[1,2,3], kind:'ghost',
    speaker:'雙胞胎 · 艾洛艾格', role:'隨機',
    body:'兩個孩子手拉手出現：「你來找什麼？」',
    left:  { label:'說實話', deltas:{sanity:+15, fear:-12} },
    right: { label:'我在走', deltas:{sanity:+12, hydration:+10} } },
  { id:'TB-001', npc:'toby', step:1, pov:'all', regions:[1], kind:'ghost',
    speaker:'托比 · 老管家', role:'庭院',
    body:'穿舊式管家服的老人念著：「三位客人，要準備三份晚餐。」',
    left:  { label:'叫住他', deltas:{sanity:+18, fear:+15} },
    right: { label:'讓他走', deltas:{sanity:+10, fear:+22} } },
  { id:'PH-002', npc:'ph02', step:1, pov:'rookie', regions:[1,2], kind:'ghost',
    speaker:'幻影 · 父親背影', role:'走廊',
    body:'走廊另一端有一個人背對你。他轉頭——沒有臉，只有輪廓。',
    left:  { label:'跟上去', deltas:{sanity:+35, hydration:+12} },
    right: { label:'停在原地', deltas:{sanity:+22, fear:+15} } },
  { id:'AU-001', npc:'aug', step:1, pov:'all', regions:[1,2,3,4], kind:'witch',
    speaker:'奧古斯汀 · 神父', role:'隨機 · 異見者',
    body:'「你知道為什麼盟會派你來嗎？」',
    left:  { label:'信，大部分',   deltas:{sanity:+15, fear:+12} },
    right: { label:'不完全信',     deltas:{sanity:+22, hydration:+12} } },
];

// ─── 選牌 ──────────────────────────────────────────
function pickNext(state){
  const { pov, region, npcStep, mustSeen, recent } = state;
  // 1) BOSS 強制
  const boss = CARDS.find(c =>
    c.boss && c.regions.includes(region) &&
    (c.pov === pov || c.pov === 'all') && !mustSeen.has(c.id)
  );
  if(boss) return boss;
  // 2) Must
  const must = CARDS.find(c =>
    c.must && c.regions.includes(region) &&
    (c.pov === pov || c.pov === 'all') && !mustSeen.has(c.id)
  );
  if(must) return must;
  // 3) NPC step
  const eligible = CARDS.filter(c =>
    c.regions.includes(region) &&
    (c.pov === pov || c.pov === 'all') &&
    !c.boss && !c.must &&
    (npcStep[c.npc] || 1) === c.step
  );
  const fresh = eligible.filter(c => !recent.includes(c.id));
  const pool = fresh.length ? fresh : eligible;
  if(!pool.length){
    const any = CARDS.filter(c =>
      (c.pov === pov || c.pov === 'all') && !c.boss
    );
    return any[Math.floor(Math.random()*any.length)] || CARDS[0];
  }
  return pool[Math.floor(Math.random()*pool.length)];
}

window.MH_REGIONS     = REGIONS;
window.MH_POVS        = POVS;
window.MH_BOSSES      = BOSSES;
window.MH_CARDS       = CARDS;
window.MH_DEATH_LINES = DEATH_CARDS;
window.MH_ENDINGS     = ENDINGS;
window.MH_pickNext    = pickNext;
