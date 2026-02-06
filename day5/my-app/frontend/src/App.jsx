import { useEffect, useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const remaining = tasks.filter((t) => !t.completed).length;

  async function refresh() {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onAdd(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setError('');
    try {
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmed }),
      });
      const created = await res.json();
      setTasks([created, ...tasks]);
      setTitle('');
    } catch (e) {
      setError(e?.message || String(e));
    }
  }

  async function onToggle(task) {
    setError('');
    try {
      const res = await fetch(`/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updated = await res.json();

      const newTasks = tasks.map((t) => (t.id === task.id ? updated : t));
      setTasks(newTasks);
    } catch (e) {
      setError(e?.message || String(e));
    }
  }

  function startEdit(task) {
    setEditId(task.id);
    setEditTitle(task.title);
  }

  function cancelEdit() {
    setEditId(null);
    setEditTitle('');
  }

  async function saveEdit(task) {
    const trimmed = editTitle.trim();
    if (!trimmed) return;

    setError('');
    try {
      const res = await fetch(`/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmed }),
      });
      const updated = await res.json();

      const newTasks = tasks.map((t) => (t.id === task.id ? updated : t));
      setTasks(newTasks);
      cancelEdit();
    } catch (e) {
      setError(e?.message || String(e));
    }
  }

  async function onDelete(task) {
    setError('');
    try {
      await fetch(`/tasks/${task.id}`, { method: 'DELETE' });
      const newTasks = tasks.filter((t) => t.id !== task.id);
      setTasks(newTasks);
    } catch (e) {
      setError(e?.message || String(e));
    }
  }

  return (
    <div className="container">
      <h1>Liste de tâches</h1>

      <form className="form" onSubmit={onAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button type="submit" className="icon-btn" aria-label="Ajouter">
          ➕
        </button>
      </form>

      {error ? <div>{error}</div> : null}
      {loading ? <div>Chargement...</div> : null}

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {editId === t.id ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <span className={t.completed ? 'done' : ''}>
                {t.title}
              </span>
            )}
            <div className="actions">
              {editId === t.id ? (
                <>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => saveEdit(t)}
                    aria-label="Enregistrer"
                  >
                    💾
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={cancelEdit}
                    aria-label="Annuler"
                  >
                    ✖️
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onToggle(t)}
                    aria-label={t.completed ? 'Annuler' : 'Valider'}
                  >
                    {t.completed ? '↩️' : '✅'}
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => startEdit(t)}
                    aria-label="Modifier"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onDelete(t)}
                    aria-label="Supprimer"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
