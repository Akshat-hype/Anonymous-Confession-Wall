import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [text, setText] = useState("");
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Connect Wallet
  const connectWallet = async () => {
    try {
      setError(null);
      if (!window.ethereum) {
        setError("Please install MetaMask to use this app");
        return;
      }

      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      setAccount(address);
      setContract(contractInstance);
      setSuccessMessage("Wallet connected successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Post Confession
  const postConfession = async () => {
    if (!text.trim()) {
      setError("Please write something before posting");
      return;
    }

    if (text.length > 500) {
      setError("Confession must be less than 500 characters");
      return;
    }

    try {
      setError(null);
      setPosting(true);
      
      const tx = await contract.postConfession(text);
      await tx.wait();

      setText("");
      setSuccessMessage("Your confession has been posted!");
      setTimeout(() => setSuccessMessage(""), 3000);
      loadConfessions();
    } catch (err) {
      setError("Failed to post confession. Please try again.");
    } finally {
      setPosting(false);
    }
  };

  // Load Confessions
  const loadConfessions = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      const count = await contract.getTotalConfessions();
      const items = [];

      for (let i = 1; i <= count; i++) {
        const confession = await contract.getConfession(i);
        items.push(confession);
      }

      setConfessions(items.reverse());
    } catch (err) {
      setError("Failed to load confessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      loadConfessions();
    }
  }, [contract]);

  // Format address for display
  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="background">
        <div className="gradient-bg"></div>
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <span className="logo-emoji">📜</span>
              </div>
              <div>
                <h1 className="title">Confession Board</h1>
                <p className="subtitle">Share your thoughts anonymously on the blockchain</p>
              </div>
            </div>
            
            {!account ? (
              <button 
                onClick={connectWallet} 
                className="connect-button"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span className="button-icon">🔌</span>
                    Connect Wallet
                  </>
                )}
              </button>
            ) : (
              <div className="wallet-info">
                <div className="wallet-address">
                  <span className="wallet-dot"></span>
                  <span>{formatAddress(account)}</span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Messages */}
        {error && (
          <div className="error-message">
            <span className="message-icon">⚠️</span>
            <span>{error}</span>
            <button onClick={() => setError(null)} className="close-button">×</button>
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            <span className="message-icon">✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Content */}
        <main className="main-content">
          {/* Post Confession Section */}
          {account && (
            <div className="post-section">
              <h2 className="section-title">Write Your Confession</h2>
              <div className="post-card">
                <textarea
                  placeholder="What's on your mind? Share it anonymously..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength="500"
                  className="confession-input"
                />
                <div className="input-footer">
                  <span className="char-counter">
                    {text.length}/500 characters
                  </span>
                  <button 
                    onClick={postConfession} 
                    className="post-button"
                    disabled={posting || !text.trim()}
                  >
                    {posting ? (
                      <>
                        <span className="button-spinner"></span>
                        Posting...
                      </>
                    ) : (
                      <>
                        <span className="button-icon">✍️</span>
                        Post Confession
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Confessions List */}
          <div className="confessions-section">
            <h2 className="section-title">
              All Confessions
              {confessions.length > 0 && (
                <span className="confession-count">{confessions.length}</span>
              )}
            </h2>

            {loading && confessions.length === 0 ? (
              <div className="loading-state">
                <div className="loading-spinner-large"></div>
                <p>Loading confessions...</p>
              </div>
            ) : confessions.length > 0 ? (
              <div className="confessions-grid">
                {confessions.map((c, index) => (
                  <div key={index} className="confession-card">
                    <div className="card-header">
                      <span className="confession-id">#{c.id.toString()}</span>
                      <span className="confession-author">
                        {formatAddress(c.author)}
                      </span>
                    </div>
                    <p className="confession-text">{c.text}</p>
                    <div className="card-footer">
                      <span className="confession-time">
                        <span className="time-icon">🕒</span>
                        {new Date(c.timestamp * 1000).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-emoji">📭</div>
                <h3>No Confessions Yet</h3>
                <p>Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;