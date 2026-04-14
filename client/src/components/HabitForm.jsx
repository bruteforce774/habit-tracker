import { useState } from "react";

export default function HabitForm({ onHabitAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await onHabitAdded(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New habit"
      />
      <button type="submit">Add</button>
    </form>
  );
}
