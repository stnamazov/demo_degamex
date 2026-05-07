# DeGameX — Demo Web App (no wallet / no backend)

This repository contains a **self‑contained demo build** of the DeGameX frontend.
It runs **fully locally** and simulates a connected user: **no wallet**, **no backend**, **no smart contracts**.

## What works in demo

- **Arena**: opponent matchmaking simulation, RPS, attack sequence, win/lose result, lootbox drops
- **Lootboxes**: infinite lootboxes in demo, open animation + reward modal
- **Account**: demo points, demo Degamers (static SVGs), lootbox count badge
- **Mint**: “mint” flow is simulated locally and shows a clear **DEMO** message (no transaction)

## Demo state & persistence

Demo data is generated and persisted in the browser:

- **Source of truth**: `src/demo/demo.js`
- **Persistence**: `localStorage` (address, token, degamers, lootboxes, points, arena stats, etc.)

To reset the demo state, clear site data in the browser (or clear `localStorage` for the app origin).

## Getting started

### Prerequisites

- Node.js 18+ recommended

### Install & run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```