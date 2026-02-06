const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/tasks", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, completed FROM tasks ORDER BY id DESC"
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "title required" });

    const [result] = await pool.execute(
      "INSERT INTO tasks (title, completed) VALUES (?, ?)",
      [title, false]
    );

    res.status(201).json({ id: result.insertId, title, completed: false });
  } catch {
    res.status(500).json({ error: "DB error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const [rows] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "task not found" });

    const old = rows[0];
    const newTitle = title !== undefined ? title : old.title;
    const newCompleted = completed !== undefined ? completed : old.completed;

    await pool.execute(
      "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
      [newTitle, newCompleted, id]
    );

    res.json({ id, title: newTitle, completed: newCompleted });
  } catch {
    res.status(500).json({ error: "DB error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [result] = await pool.execute(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "task not found" });

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "DB error" });
  }
});

app.listen(PORT, () =>
  console.log("http://localhost:" + PORT)
);
