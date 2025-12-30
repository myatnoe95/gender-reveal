import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import "./ResultsView.css";

interface ResultsViewProps {
  boyCount: number;
  girlCount: number;
  actualGender: "boy" | "girl";
  userVote: "boy" | "girl";
  showConfetti?: boolean;
}

export function ResultsView({ boyCount, girlCount, actualGender, userVote, showConfetti = true }: ResultsViewProps) {
  const confettiTriggered = useRef(false);
  const total = boyCount + girlCount;

  useEffect(() => {
    if (showConfetti && !confettiTriggered.current) {
      confettiTriggered.current = true;

      const colors = actualGender === "boy" ? ["#7ec8e3", "#a8d8ea", "#5eb0d2"] : ["#ffb6c1", "#ffd1dc", "#ff9fb2"];

      // Initial burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors,
      });

      // Side bursts
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });
      }, 250);
    }
  }, [actualGender, showConfetti]);

  const isCorrect = userVote === actualGender;

  return (
    <div className="results-container">
      <div className={`reveal-card ${actualGender}`}>
        <span className="reveal-emoji">{actualGender === "boy" ? "👶💙" : "👶💗"}</span>
        <h1 className="reveal-title">It's a {actualGender === "boy" ? "Boy" : "Girl"}!</h1>
        <p className="reveal-message">
          {isCorrect ? "You guessed correctly! 🎉" : "Nice try! 🌟"}
        </p>
        <p className="reveal-total">{total} {total === 1 ? "guest has" : "guests have"} voted</p>
      </div>
    </div>
  );
}
