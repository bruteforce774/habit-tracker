import { useState, useEffect } from 'react';
import { getHabits, addHabit, deleteHabit, getTodayCompletions, addCompletion } from './api';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState([]);

  const fetchHabits = async () => {
    const data = await getHabits();
    setHabits(data);
  };

  const fetchCompletions = async () => {
    const data = await getTodayCompletions();
    setCompletions(data);
  };

  useEffect(() => {
    fetchHabits();
    fetchCompletions();
  }, []);

  const handleAddHabit = async (name) => {
    await addHabit(name);
    await fetchHabits();
  };

  const handleDelete = async (id) => {
    await deleteHabit(id);
    await fetchHabits();
  };

  const handleComplete = async (habitId) => {
    await addCompletion(habitId);
    await fetchCompletions();
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      <HabitForm onHabitAdded={handleAddHabit} />
      <HabitList
        habits={habits}
        completions={completions}
        onDelete={handleDelete}
        onComplete={handleComplete}
      />
    </div>
  );
}
