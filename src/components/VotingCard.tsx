import { useState } from "react";
import "./VotingCard.css";

interface VotingCardProps {
  onVote: (gender: "boy" | "girl", name: string) => void;
}

export function VotingCard({ onVote }: VotingCardProps) {
  const [name, setName] = useState("");
  const [showCards, setShowCards] = useState(false);

  const handleContinue = () => {
    if (name.trim()) {
      setShowCards(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && name.trim()) {
      handleContinue();
    }
  };

  if (!showCards) {
    return (
      <div className="voting-container">
        <div className="welcome-decoration">
          <span className="deco-star">✨</span>
          <span className="deco-heart">💛</span>
          <span className="deco-star">✨</span>
        </div>

        <div className="welcome-icon">👶</div>

        <h1 className="voting-title">Welcome!</h1>
        <p className="voting-subtitle">Join us in guessing our baby's gender</p>

        <div className="name-input-container">
          <input
            type="text"
            className="name-input"
            placeholder="What's your name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={30}
            autoFocus
          />
          <button
            className="continue-btn"
            onClick={handleContinue}
            disabled={!name.trim()}
          >
            Let's Vote! 🎉
          </button>
        </div>

        <p className="welcome-note">Your guess will be revealed at the party!</p>
      </div>
    );
  }

  return (
    <div className="voting-container">
      <div className="vote-decoration">
        <span className="vote-deco-icon">🎊</span>
        <span className="vote-deco-icon">🎈</span>
        <span className="vote-deco-icon">🎊</span>
      </div>

      <h1 className="voting-title">Hi, {name}!</h1>
      <p className="voting-subtitle">What do you think it will be?</p>

      <div className="cards-container">
        <button className="vote-card boy-card" onClick={() => onVote("boy", name.trim())}>
          <div className="card-sparkle">✨</div>
          <span className="card-icon">👶</span>
          <span className="card-label">Boy</span>
          <span className="card-emoji">💙</span>
        </button>

        <span className="or-divider">or</span>

        <button className="vote-card girl-card" onClick={() => onVote("girl", name.trim())}>
          <div className="card-sparkle">✨</div>
          <span className="card-icon">👶</span>
          <span className="card-label">Girl</span>
          <span className="card-emoji">💗</span>
        </button>
      </div>

      <p className="voting-hint">✨ Tap a card to cast your vote! ✨</p>
    </div>
  );
}
