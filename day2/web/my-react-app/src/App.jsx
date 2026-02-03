import { useState } from "react";
import "./App.css";


export default function App() {

  const [todos, setTodos] = useState([]);

  const [text, setText] = useState("");

  function addTodo() {

    if (text.trim() === "") return;

   
    setTodos([text, ...todos]);

    setText("");
  }

return (
  <div className="container">
    <h1>Ma Todo List</h1>

    <div className="form">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écris une tâche"
      />
      <button onClick={addTodo}>Ajouter</button>
    </div>

    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  </div>
);

}
