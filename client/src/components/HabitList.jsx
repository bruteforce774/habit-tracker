import { useState, useEffect } from "react";
import { getStreak } from "../api";

export default function HabitList({ habits, completions, onDelete, onComplete }) {
  const [streaks, setStreaks] = useState({});

  useEffect(() => {
    const fetchStreaks = async () => {
      const results = {};
      for (const habit of habits) {
        const data = await getStreak(habit.id);
        results[habit.id] = data.streak;
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
          (c) => c.habit_id === habit.id
        );
        return (
          <li key={habit.id}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => !isCompleted && onComplete(habit.id)}
            />
            <span>{habit.name}</span>
            <span>🔥 {streaks[habit.id] ?? 0}</span>
            <button onClick={() => onDelete(habit.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
