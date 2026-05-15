import './App.css'

function App() {
  return (
    <main className="landing">
      <div className="landing-content">
        <p className="subtitle">DEMO</p>
        <h1 className="title">Manor Hunt</h1>
        <p className="description">
          一款哥德風格的卡牌敘事遊戲原型。<br />
          在廢棄莊園的黑暗角落中，每一張卡牌都是一個抉擇。
        </p>
        <a
          className="play-btn"
          href="/game/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          開始遊玩
        </a>
      </div>
      <div className="ornament top-left" />
      <div className="ornament top-right" />
      <div className="ornament bottom-left" />
      <div className="ornament bottom-right" />
    </main>
  )
}

export default App
