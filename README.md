frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/
│   │   └── icons/
│
│   ├── components/
│   │   ├── Wallet/
│   │   │   └── ConnectWallet.jsx
│   │   │
│   │   ├── Confession/
│   │   │   ├── ConfessBox.jsx
│   │   │   ├── ConfessionCard.jsx
│   │   │   └── ConfessionFeed.jsx
│   │   │
│   │   ├── Gamification/
│   │   │   ├── XPBar.jsx
│   │   │   └── Badge.jsx
│   │   │
│   │   └── Leaderboard/
│   │       └── Leaderboard.jsx
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── hooks/
│   │   ├── useWallet.js
│   │   └── useContract.js
│   │
│   ├── services/
│   │   ├── blockchain.service.js
│   │   └── backend.service.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   └── formatAddress.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
└── vite.config.js / webpack.config.js


backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── blockchain.js
│   │
│   ├── routes/
│   │   ├── confession.routes.js
│   │   ├── leaderboard.routes.js
│   │   └── health.routes.js
│   │
│   ├── controllers/
│   │   ├── confession.controller.js
│   │   └── leaderboard.controller.js
│   │
│   ├── services/
│   │   ├── blockchain.service.js
│   │   ├── xp.service.js
│   │   └── eventListener.service.js
│   │
│   ├── models/
│   │   └── UserXP.model.js
│   │
│   ├── utils/
│   │   ├── shortenAddress.js
│   │   └── rateLimiter.js
│   │
│   ├── app.js
│   └── index.js
│
├── .env
├── package.json
└── nodemon.json


blockchain/
│
├── contracts/
│   └── ConfessionWall.sol
│
├── scripts/
│   ├── deploy.js
│   └── seed.js   (optional)
│
├── test/
│   └── ConfessionWall.test.js
│
├── artifacts/
├── cache/
│
├── hardhat.config.js
├── .env
└── package.json
