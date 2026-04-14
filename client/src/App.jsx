import { useState, useEffect } from 'react';
import axios from 'axios';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';

export default function App() {
  // state
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState([]);

  // data fetching
  const fetchHabits = async () => {
    const res = await axios.get('/api/habits');
    setHabits(res.data);
  };

  const fetchCompletions = async () => {
    const res = await axios.get('/api/completions/today');
    setCompletions(res.data);
  };

  useEffect(() => {
    fetchHabits();
    fetchCompletions();
  }, []);

  // handlers
  const handleAddHabit = async (name) => {
    await axios.post('/api/habits', { name });
    await fetchHabits();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/habits/${id}`);
    await fetchHabits();
  };

  const handleComplete = async (habitId) => {
    const today = new Date().toISOString().split('T')[0];
    await axios.post('/api/completions', { habitId, date: today });
    await fetchCompletions();
  };

  // JSX
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
