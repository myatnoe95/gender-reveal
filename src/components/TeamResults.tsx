import type { Vote } from "../firebase";
import "./TeamResults.css";

interface TeamResultsProps {
  boyVotes: Vote[];
  girlVotes: Vote[];
}

export function TeamResults({ boyVotes, girlVotes }: TeamResultsProps) {
  const total = boyVotes.length + girlVotes.length;
  const boyPercent = total > 0 ? ((boyVotes.length / total) * 100).toFixed(1) : "0.0";
  const girlPercent = total > 0 ? ((girlVotes.length / total) * 100).toFixed(1) : "0.0";

  return (
    <div className="team-results">
      {/* Team Boy Card */}
      <div className="team-card team-boy">
        <div className="team-header">
          <span className="team-icon">👶</span>
          <div className="team-info">
            <h2 className="team-title">TEAM BOY</h2>
            <p className="team-count">{boyVotes.length} {boyVotes.length === 1 ? "vote" : "votes"}</p>
            <div className="team-percent-bar">
              <span className="percent-text">{boyPercent}%</span>
              <div className="percent-track">
                <div
                  className="percent-fill"
                  style={{ width: `${boyPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="team-voters">
          {boyVotes.length === 0 ? (
            <p className="no-voters">No votes yet</p>
          ) : (
            boyVotes.map((vote) => (
              <div key={vote.id} className="voter-item">
                <span className="voter-avatar">{vote.name.charAt(0).toUpperCase()}</span>
                <div className="voter-info">
                  <span className="voter-name">{vote.name}</span>
                  <span className="voter-team">Team Boy</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Team Girl Card */}
      <div className="team-card team-girl">
        <div className="team-header">
          <span className="team-icon">👶</span>
          <div className="team-info">
            <h2 className="team-title">TEAM GIRL</h2>
            <p className="team-count">{girlVotes.length} {girlVotes.length === 1 ? "vote" : "votes"}</p>
            <div className="team-percent-bar">
              <span className="percent-text">{girlPercent}%</span>
              <div className="percent-track">
                <div
                  className="percent-fill"
                  style={{ width: `${girlPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="team-voters">
          {girlVotes.length === 0 ? (
            <p className="no-voters">No votes yet</p>
          ) : (
            girlVotes.map((vote) => (
              <div key={vote.id} className="voter-item">
                <span className="voter-avatar">{vote.name.charAt(0).toUpperCase()}</span>
                <div className="voter-info">
                  <span className="voter-name">{vote.name}</span>
                  <span className="voter-team">Team Girl</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
