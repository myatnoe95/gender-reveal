import { useState } from "react";
import "./WishesForm.css";

interface WishesFormProps {
  onSubmit: (name: string, message: string) => Promise<void>;
  onSkip: () => void;
  defaultName?: string;
}

export function WishesForm({ onSubmit, onSkip, defaultName = "" }: WishesFormProps) {
  const [name, setName] = useState(defaultName);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(name.trim(), message.trim());
    } catch (error) {
      console.error("Failed to submit wish:", error);
      alert("Failed to submit wish. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wishes-form-container">
      <div className="wishes-form-card">
        <div className="form-header">
          <span className="form-emoji">💝</span>
          <h2>Leave a Wish for Baby!</h2>
          <p>Share your love and blessings</p>
        </div>

        <form onSubmit={handleSubmit} className="wishes-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Wish</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a sweet message for the baby..."
              maxLength={500}
              rows={4}
              required
            />
            <span className="char-count">{message.length}/500</span>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || !name.trim() || !message.trim()}
            >
              {isSubmitting ? "Sending..." : "Send Wish 💌"}
            </button>
            <button
              type="button"
              className="skip-btn"
              onClick={onSkip}
              disabled={isSubmitting}
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
