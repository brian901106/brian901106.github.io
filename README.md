# brian901106.github.io

沈志謙的個人網站 · [https://brian901106.github.io](https://brian901106.github.io)

應徵方向：**AI Agent／電腦視覺／LLM 應用**。早稻田大學情報生產系統研究科（IPS）碩士，已役畢、可即刻到職。

📄 履歷（PDF）：[resume_zh.pdf](https://brian901106.github.io/resume_zh.pdf)
📫 brian1030028@gmail.com

## 網站內容

從傳統影像處理與三維重建出發，到微調視覺模型、以 SAM2 分割建構語意點雲並偵測障礙物；畢業後延伸到 LLM 應用與 AI agent。開發方式是由我定義問題、寫規格與驗收標準，交給 AI 子代理實作，再由我以實驗比較與驗證決定採用哪個方案。

| 區塊 | 內容 |
|------|------|
| LLM 應用 | 食物拍照辨識熱量 APP（[FoodKcalNotes](https://github.com/brian901106/FoodKcalNotes)，開源）、Homie 日語家教模式、多角色架空世界觀手遊的 LLM wiki |
| 進行中 | 台語 LLM 微調（QLoRA、CPT／SFT 比較）、RAG＋LLM wiki 開放世界遊戲（架構實驗中）、利用所學搭建一個不依賴現有harness並具有完整迴圈的agent (第一優先進行中)|
| 畢業論文 | 以 3D 邊界整合重建樓梯區域，偵測視障者頭部高度的懸浮障礙物；偵測率 0.55 → 0.82、平均高度誤差 48.6 → 16.5 cm |
| CV 與硬體專案 | 樓梯分割模型微調、臉部特徵點驅動 Live2D、Verilog／FPGA 實作等 |
| 其他 | 學歷、替代役經歷、技能與證照 |

各專案的數據都是實際量測的結果；樣本較小或仍在實驗中的項目，網站上會註明。

## 關於這個網站

這個網站由 **Claude**（Anthropic 的 AI 助手）實作：版面設計、React 元件、內容整理與部署設定都由 Claude 撰寫，我負責提出需求、整理內容、檢查與驗收後發布。

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
  assets/          # 大頭照、研究海報、專案照片、時間軸圖
public/
  resume_zh.pdf    # 一頁式中文履歷
  favicon*         # 網站圖示
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
