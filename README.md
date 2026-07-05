# CryptoDash

CryptoDash is a cryptocurrency dashboard built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Recharts, and the CoinGecko API.

The application allows users to track cryptocurrency prices, market capitalization, 24h price variation, market ranking, favorite assets, and interactive price charts.

## Live Demo

[View project](https://cryptodashbord-wine.vercel.app/)

## Screenshots

> Add the screenshots inside the `/screenshots` folder and update the image paths below.

![CryptoDash Home](./screenshots/home.png)

![CryptoDash Dark Mode](./screenshots/dark-mode.png)

![CryptoDash Chart Modal](./screenshots/chart-modal.png)

## Features

- Real-time cryptocurrency data from CoinGecko API
- Search cryptocurrencies by name or symbol
- Favorite cryptocurrencies with LocalStorage persistence
- Light and dark theme support
- Responsive cryptocurrency cards
- Mini price charts on each card
- Detailed 7-day price chart modal
- Market cap and ranking display
- Responsive layout for desktop and mobile

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- CoinGecko API
- next-themes
- Lucide React
- Vercel

## Main Functionalities

### Cryptocurrency Listing

The dashboard displays cryptocurrency data including name, symbol, current price, market cap, market rank, 24h price variation, and 7-day sparkline data.

### Search

Users can search cryptocurrencies by name or symbol. The search input uses a debounce to reduce unnecessary API calls.

### Favorites

Users can mark cryptocurrencies as favorites. Favorite assets are stored in LocalStorage and persist after page reload.

### Charts

Each cryptocurrency card includes a mini chart. Users can also open a modal with a detailed 7-day price chart.

### Theme Toggle

The application supports light and dark mode using `next-themes`.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/gamaalice/cryptodashbord.git
cd cryptodashbord
npm install
```

### Running the project

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

### Build

```bash
npm run build
```

### Start production server

```bash
npm start
```

## API

This project uses the public CoinGecko API to retrieve cryptocurrency market data.

Main endpoint used:

```bash
https://api.coingecko.com/api/v3/coins/markets
```

The application fetches market data with:

- USD currency
- Market cap ordering
- Sparkline data enabled
- 24h price change percentage

## Deployment

The project is deployed on Vercel.

[View live project](https://cryptodashbord-wine.vercel.app/)

## Author

Developed by Alice Gama.

- [LinkedIn](COLOQUE_SEU_LINKEDIN_AQUI)
- [Portfolio](COLOQUE_SEU_PORTFOLIO_AQUI)
- [GitHub](https://github.com/gamaalice)
