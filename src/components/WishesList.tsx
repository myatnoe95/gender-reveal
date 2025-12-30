import "./WishesList.css";

export interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

interface WishesListProps {
  wishes: Wish[];
}

export function WishesList({ wishes }: WishesListProps) {
  if (wishes.length === 0) {
    return (
      <div className="wishes-list-container">
        <div className="wishes-header">
          <span className="wishes-icon">💝</span>
          <h2>Wishes for Baby</h2>
        </div>
        <p className="no-wishes">No wishes yet. Be the first to leave one!</p>
      </div>
    );
  }

  return (
    <div className="wishes-list-container">
      <div className="wishes-header">
        <span className="wishes-icon">💝</span>
        <h2>Wishes for Baby</h2>
        <p className="wishes-count">{wishes.length} {wishes.length === 1 ? "wish" : "wishes"}</p>
      </div>

      <div className="wishes-grid">
        {wishes.map((wish, index) => (
          <div
            key={wish.id}
            className="wish-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="wish-content">
              <p className="wish-message">"{wish.message}"</p>
              <p className="wish-author">— {wish.name}</p>
            </div>
            <div className="wish-decoration">✨</div>
          </div>
        ))}
      </div>
    </div>
  );
}
