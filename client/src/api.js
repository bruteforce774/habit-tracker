const BASE = '/apps/habit-tracker/api';

export async function getHabits() {
  const res = await fetch(`${BASE}/habits.php`);
  return res.json();
}

export async function addHabit(name) {
  const res = await fetch(`${BASE}/habits.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function deleteHabit(id) {
  await fetch(`${BASE}/habits.php/${id}`, { method: 'DELETE' });
}

export async function getTodayCompletions() {
  const res = await fetch(`${BASE}/completions.php`);
  return res.json();
}

export async function addCompletion(habitId) {
  const res = await fetch(`${BASE}/completions.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ habit_id: habitId }),
  });
  return res.json();
}

export async function getStreak(habitId) {
  const res = await fetch(`${BASE}/streak.php?habit_id=${habitId}`);
  return res.json();
}
