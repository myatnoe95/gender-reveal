import { useMemo } from "react";
import "./FloatingBalloons.css";

const BALLOON_COLORS = [
  "#ff9fb2", // pink
  "#7ec8e3", // blue
  "#ffd93d", // yellow
  "#6bcb77", // green
  "#ff8c42", // orange
  "#b8a9c9", // purple
  "#87ceeb", // light blue
  "#ffb6c1", // light pink
];

interface Balloon {
  id: number;
  color: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export function FloatingBalloons() {
  const balloons = useMemo(() => {
    const items: Balloon[] = [];
    for (let i = 0; i < 18; i++) {
      items.push({
        id: i,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        left: Math.random() * 100,
        size: 40 + Math.random() * 30,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 10,
      });
    }
    return items;
  }, []);

  return (
    <div className="balloons-container">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="balloon"
          style={{
            left: `${balloon.left}%`,
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.2}px`,
            backgroundColor: balloon.color,
            animationDuration: `${balloon.duration}s`,
            animationDelay: `${balloon.delay}s`,
          }}
        >
          <div className="balloon-string" />
        </div>
      ))}
    </div>
  );
}
