# brian901106.github.io

沈志謙的個人網站 · [https://brian901106.github.io](https://brian901106.github.io)

## 關於這個網站

這是請 **Claude**（Anthropic 的 AI 助手）協助建置的個人網站：從版面設計、React 元件撰寫、內容整理到部署設定，都是我提出需求與方向、由 Claude 實作，再由我檢查、調整內容後發布。

網站內容是我的求職資訊：電腦視覺／影像演算法方向的學歷、碩士研究、專案作品、硬體實作與經歷。

## 技術架構

| 項目 | 技術 |
|------|------|
| 框架 | React 19 + TypeScript |
| 建構工具 | Vite |
| 字體 | Noto Sans TC（思源黑體）|
| 部署 | GitHub Actions → GitHub Pages |

## 專案結構

```
src/
  App.tsx          # 主頁面元件（所有內容）
  App.css          # 樣式
  assets/          # 大頭照、研究海報、專案照片
.github/
  workflows/
    deploy.yml     # 自動部署腳本
```

## 本地開發

```bash
npm install
npm run dev
```

## 部署

Push 至 `master` 後，GitHub Actions 自動執行 `npm run build` 並部署至 GitHub Pages。
