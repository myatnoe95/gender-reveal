import { useState, useEffect } from "react";
import { FloatingBalloons } from "./FloatingBalloons";
import "./LandingPage.css";

// Target: January 1, 2026 at 17:00 JST (Japan Standard Time = UTC+9)
const TARGET_DATE = new Date("2026-01-01T17:00:00+09:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

interface LandingPageProps {
  onStartVoting: () => void;
  totalVotes: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const target = TARGET_DATE.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
}

function padNumber(num: number): string {
  return num.toString().padStart(2, "0");
}

export function LandingPage({ onStartVoting, totalVotes }: LandingPageProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isExpired, setIsExpired] = useState(TARGET_DATE.getTime() <= Date.now());

  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining.total <= 0) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  return (
    <div className="landing-container">
      <FloatingBalloons />

      <div className="landing-content">
        <p className="landing-subtitle">What will it be?</p>

        <h1 className="landing-title">
          <span className="boy-text">BOY</span>
          <span className="or-text">or</span>
          <span className="girl-text">GIRL</span>
        </h1>

        <div className="countdown-container">
          <div className="countdown-item">
            <span className="countdown-number">{padNumber(timeLeft.days)}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{padNumber(timeLeft.hours)}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{padNumber(timeLeft.minutes)}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{padNumber(timeLeft.seconds)}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>

        <div className="landing-actions">
          {isExpired ? (
            <button className="reveal-btn" onClick={onStartVoting}>
              Start the Reveal!
            </button>
          ) : (
            <button className="vote-btn" onClick={onStartVoting}>
              View all votes ({totalVotes})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
