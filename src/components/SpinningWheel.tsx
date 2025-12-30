import { useState } from "react";
import "./SpinningWheel.css";

interface SpinningWheelProps {
  actualGender: "boy" | "girl";
  onRevealComplete: () => void;
}

export function SpinningWheel({ actualGender, onRevealComplete }: SpinningWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  // Calculate final rotation to land on the correct gender
  // Boy is on the right (0deg), Girl is on the left (180deg)
  const getFinalRotation = () => {
    const spins = 5; // Number of full rotations
    const baseRotation = spins * 360;
    // Add random offset within the target segment for natural feel
    const segmentOffset = Math.random() * 60 - 30; // -30 to +30 degrees

    if (actualGender === "boy") {
      return baseRotation + 360 + segmentOffset; // Land on blue (right side)
    } else {
      return baseRotation + 180 + segmentOffset; // Land on pink (left side)
    }
  };

  const handleSpin = () => {
    if (isSpinning || hasRevealed) return;

    setIsSpinning(true);
    const wheel = document.querySelector(".wheel") as HTMLElement;
    const rotation = getFinalRotation();

    if (wheel) {
      wheel.style.setProperty("--final-rotation", `${rotation}deg`);
      wheel.classList.add("spinning");
    }

    // Wait for spin to complete
    setTimeout(() => {
      setIsSpinning(false);
      setHasRevealed(true);
      setTimeout(onRevealComplete, 1000);
    }, 5000);
  };

  return (
    <div className="wheel-container">
      <h2 className="wheel-title">
        {hasRevealed
          ? `It's a ${actualGender === "boy" ? "Boy" : "Girl"}!`
          : "Spin to Reveal!"}
      </h2>

      <div className="wheel-wrapper">
        <div className="wheel-pointer">▼</div>
        <div className={`wheel ${hasRevealed ? "revealed" : ""}`}>
          <div className="wheel-segment boy-segment">
            <span className="segment-content">
              <span className="segment-emoji">👶💙</span>
              <span className="segment-text">Boy</span>
            </span>
          </div>
          <div className="wheel-segment girl-segment">
            <span className="segment-content">
              <span className="segment-emoji">👶💗</span>
              <span className="segment-text">Girl</span>
            </span>
          </div>
        </div>
      </div>

      <button
        className={`spin-button ${isSpinning ? "disabled" : ""} ${hasRevealed ? "hidden" : ""}`}
        onClick={handleSpin}
        disabled={isSpinning || hasRevealed}
      >
        {isSpinning ? "Spinning..." : "🎯 Spin the Wheel!"}
      </button>

      {hasRevealed && (
        <p className="reveal-hint">Get ready for the celebration!</p>
      )}
    </div>
  );
}
