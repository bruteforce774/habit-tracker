import { useState, useEffect } from "react";
import axios from "axios";

export default function HabitList({ habits, completions, onDelete, onComplete }) {
  const [streaks, setStreaks] = useState({});

  useEffect(() => {
    const fetchStreaks = async () => {
      const results = {};
      for (const habit of habits) {
        const res = await axios.get(`/api/completions/streak/${habit._id}`);
        results[habit._id] = res.data.streak;
      }
      setStreaks(results);
    };

    if (habits.length > 0) {
      fetchStreaks();
    }
  }, [habits]);
  
  return (
    <ul>
      {habits.map((habit) => {
        const isCompleted = completions.some(
          (c) => c.habitId === habit._id
        );
        return (
          <li key={habit._id}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => !isCompleted && onComplete(habit._id)}
            />
            <span>{habit.name}</span>
            <span>🔥 {streaks[habit._id] ?? 0}</span>
            <button onClick={() => onDelete(habit._id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
