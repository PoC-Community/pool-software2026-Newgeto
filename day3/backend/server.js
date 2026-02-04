const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let id = 1;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = {
    id: id++,
    title: req.body.title,
    completed: false
  };

  tasks.push(task);
  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  task.title = req.body.title;
  task.completed = req.body.completed;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  tasks.splice(index, 1);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
