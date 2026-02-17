# Product Requirements Document (PRD)

## 1. Product Title

**Anonymous Confession Wall (Hela Testnet)**

---

## 2. Problem Statement

In existing social platforms, anonymity is often weak, user identity is tied to emails or usernames, and moderation or ownership is centralized. Users hesitate to share honest confessions due to fear of judgment, tracking, or data misuse.

There is a need for a **privacy-first, anonymous platform** where users can freely express themselves while still maintaining fairness, anti-spam control, and engagement.

---

## 3. Product Vision

To build a **decentralized, anonymous confession platform** powered by blockchain where:

* Identity is wallet-based, not personal
* Confessions are immutable and transparent
* Engagement is increased via gamification
* Privacy is preserved by design

---

## 4. Goals & Objectives

### Primary Goals

* Enable anonymous confessions without personal identifiers
* Use blockchain for transparency and trust
* Introduce gamification to boost engagement

### Secondary Goals

* Prevent spam using economic cost (testnet tokens)
* Educate developers on basic Solidity concepts
* Provide a clean, simple UI for non-crypto users

---

## 5. Target Users

### Primary Users

* Students
* Hackathon participants
* Web3 enthusiasts

### Secondary Users

* Developers learning Solidity
* Privacy-focused communities

---

## 6. Success Metrics

| Metric             | Description                          |
| ------------------ | ------------------------------------ |
| Daily Confessions  | Number of confessions posted per day |
| Wallet Connections | Total unique wallet addresses        |
| Avg Session Time   | User engagement duration             |
| XP Distribution    | Gamification participation           |

---

## 7. Key Features

### 7.1 Wallet-Based Anonymous Login

* Users connect via wallet (MetaMask or Hela-compatible wallet)
* No email, username, or password
* Only wallet address is used as identity
* Wallet address displayed in shortened form

---

### 7.2 Confession Submission

* Users can submit text confessions
* Each confession requires a small Hela testnet token fee
* Confession is stored on-chain
* Timestamp recorded automatically

**Validation Rules:**

* Message cannot be empty
* Message length capped (e.g., 280–500 chars)

---

### 7.3 Confession Feed

* Public feed of all confessions
* Sorted by latest first
* Displays:

  * Shortened wallet address
  * Confession text
  * Time since posted

---

### 7.4 Gamification System

Users earn points (XP) for actions:

| Action                       | XP  |
| ---------------------------- | --- |
| First confession             | +50 |
| Each confession              | +10 |
| Long confession (>100 chars) | +5  |
| Daily activity               | +20 |

#### Badges (Optional)

* Silent Starter
* Midnight Confessor
* Truth Teller

---

### 7.5 Leaderboard

* Displays top wallets by XP
* Fully anonymous
* Updated via backend indexing

---

## 8. System Architecture

### 8.1 Frontend

* React.js
* Wallet connection
* Confession UI
* Leaderboard UI

### 8.2 Backend

* Node.js + Express
* Blockchain event listener
* XP calculation logic
* Leaderboard API

### 8.3 Blockchain

* Solidity smart contract
* Deployed on Hela testnet
* Stores confessions and emits events

---

## 9. Smart Contract Requirements

### Core Responsibilities

* Accept confessions
* Charge token fee
* Store confession data
* Emit events

### Solidity Concepts Covered

* Structs
* Arrays
* Events
* Payable functions
* Require statements
* msg.sender / msg.value

---

## 10. Non-Functional Requirements

### Security

* No personal data stored
* No private keys handled

### Performance

* Backend caching for feed
* Pagination support

### Scalability

* Backend handles indexing
* Blockchain used only for critical data

---

## 11. Constraints

* Hela testnet only
* Text-only confessions
* No moderation in MVP

---

## 12. Assumptions

* Users have access to testnet tokens
* Wallet providers are available
* Blockchain network is stable

---

## 13. Out of Scope (MVP)

* Image confessions
* Commenting system
* Token rewards with real value
* AI moderation

---

## 14. Future Enhancements

* DAO-based moderation
* Reputation-based XP
* Sentiment analysis
* On-chain badges

---

## 15. Risks & Mitigation

| Risk              | Mitigation               |
| ----------------- | ------------------------ |
| Spam              | Token fee per confession |
| High gas cost     | Testnet usage            |
| Offensive content | Future DAO moderation    |

---

## 16. One-Line Summary

A decentralized, anonymous confession wall built on Hela testnet that uses wallet-based identity and gamification to enable honest self-expression without compromising privacy.
