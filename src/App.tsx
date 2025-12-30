import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { VotingCard } from "./components/VotingCard";
import { WishesForm } from "./components/WishesForm";
import { WishesList, type Wish } from "./components/WishesList";
import { TeamResults } from "./components/TeamResults";
import { submitVote, subscribeToVotes, submitWish, subscribeToWishes, type VoteData } from "./firebase";
import "./App.css";

type AppStep = "landing" | "vote" | "reveal" | "wishform" | "results" | "wishes";

function App() {
  const [step, setStep] = useState<AppStep>("landing");
  const [userName, setUserName] = useState<string>("");
  const [voteData, setVoteData] = useState<VoteData>({ boyVotes: [], girlVotes: [] });
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribeVotes = subscribeToVotes((newVoteData) => {
      setVoteData(newVoteData);
    });

    const unsubscribeWishes = subscribeToWishes((newWishes) => {
      setWishes(newWishes);
    });

    return () => {
      unsubscribeVotes();
      unsubscribeWishes();
    };
  }, []);

  const handleVote = async (gender: "boy" | "girl", name: string) => {
    setIsLoading(true);
    try {
      await submitVote(gender, name);
      setUserName(name);
      setStep("reveal");
    } catch (error) {
      console.error("Failed to submit vote:", error);
      alert("Failed to submit vote. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishSubmit = async (name: string, message: string) => {
    await submitWish(name, message);
    setStep("results");
  };

  const handleWishSkip = () => {
    setStep("results");
  };

  const handleGoToWishForm = () => {
    setStep("wishform");
  };

  const handleViewWishes = () => {
    setStep("wishes");
  };

  const handleBackToResults = () => {
    setStep("results");
  };

  const handleStartVoting = () => {
    setStep("vote");
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <span className="loading-emoji">👶</span>
          <p>Submitting your vote...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      
      {step === "landing" && (
        <LandingPage
          onStartVoting={handleStartVoting}
          totalVotes={voteData.boyVotes.length + voteData.girlVotes.length}
        />
      )}

      {step === "vote" && <VotingCard onVote={handleVote} />}

      {step === "reveal" && (
        <div className="reveal-content">
          <TeamResults
            boyVotes={voteData.boyVotes}
            girlVotes={voteData.girlVotes}
          />
          <button className="wish-btn" onClick={handleGoToWishForm}>
            Leave a Wish for Baby
          </button>
        </div>
      )}

      {step === "wishform" && (
        <div className="reveal-content">
          <WishesForm
            onSubmit={handleWishSubmit}
            onSkip={handleWishSkip}
            defaultName={userName}
          />
        </div>
      )}

      {step === "results" && (
        <div className="reveal-content">
          <TeamResults
            boyVotes={voteData.boyVotes}
            girlVotes={voteData.girlVotes}
          />
          <button className="wish-btn" onClick={handleViewWishes}>
            View Wishes ({wishes.length}) 💝
          </button>
        </div>
      )}

      {step === "wishes" && (
        <div className="reveal-content">
          <WishesList wishes={wishes} />
          <button className="back-btn" onClick={handleBackToResults}>
            ← Back to Results
          </button>
        </div>
      )}

      <footer className="app-footer">
        <p>Made with 💖 for our little one</p>
      </footer>
    </div>
  );
}

export default App;
