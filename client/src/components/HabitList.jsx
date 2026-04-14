export default function HabitList({ habits, completions, onDelete, onComplete }) {
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
            <button onClick={() => onDelete(habit._id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
