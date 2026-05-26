# brian901106.github.io

沈志謙的個人網站 · [https://brian901106.github.io](https://brian901106.github.io)

## 關於

電腦視覺（Computer Vision）與視覺 SLAM 研究生的個人頁面。
介紹研究方向、精選研究專案與副專案。

## 技術架構

| 項目 | 技術 |
|------|------|
| 框架 | React 18 + TypeScript |
| 建構工具 | Vite |
| 字體 | Noto Sans TC（思源黑體）|
| 部署 | GitHub Actions → GitHub Pages |

## 專案結構

```
src/
  App.tsx        # 主頁面元件
  App.css        # 樣式
public/
  game/          # Manor Hunt 遊戲 Demo（靜態檔案）
.github/
  workflows/
    deploy.yml   # 自動部署腳本
```

## 本地開發

```bash
npm install
npm run dev
```

## 部署

Push 至 `master` 後，GitHub Actions 自動執行 `npm run build` 並部署至 GitHub Pages。
