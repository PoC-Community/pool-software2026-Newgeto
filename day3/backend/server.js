const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// fausse base de données
const tasks = [];

// routes

// test
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// voir toutes les tâches
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// ajouter une tâche
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// supprimer une tâche
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// lancement serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
