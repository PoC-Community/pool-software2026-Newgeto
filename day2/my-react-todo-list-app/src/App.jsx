import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addOrEditTodo() {
    if (text.trim() === "") return;

    if (editIndex !== null) {
     
      const newTodos = [...todos];
      newTodos[editIndex].text = text;
      setTodos(newTodos);
      setEditIndex(null);
    } else {
    
      setTodos([{ text, done: false }, ...todos]);
    }

    setText("");
  }

  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function toggleDone(index) {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  }

  function startEdit(index) {
    setText(todos[index].text);
    setEditIndex(index);
  }

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écris une tâche"
        />
        <button onClick={addOrEditTodo}>
          {editIndex !== null ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.done ? "done" : ""}>
            <span onClick={() => toggleDone(index)}>
              {todo.text}
            </span>

            <div className="actions">
              <button onClick={() => startEdit(index)}>✏️</button>
              <button onClick={() => deleteTodo(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
