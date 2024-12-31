const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parse JSON body
app.use(express.json());

// Data penyimpanan tugas dalam bentuk array of objects
let tasks = [
  { id: 1, title: 'Belajar Express.js', completed: false },
  { id: 2, title: 'Membaca buku', completed: true },
];

// Route untuk membuat tugas baru (POST /tasks)
app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;

  // Validasi input
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: completed || false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Route untuk melihat daftar semua tugas (GET /tasks)
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route untuk melihat tugas tertentu berdasarkan ID (GET /tasks/:id)
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// Route untuk mengupdate tugas berdasarkan ID (PUT /tasks/:id)
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;

  // Update task
  task.title = title !== undefined ? title : task.title;
  task.completed = completed !== undefined ? completed : task.completed;

  res.json(task);
});

// Route untuk menghapus tugas berdasarkan ID (DELETE /tasks/:id)
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send(); // No content to return
});

// Menjalankan server di port 3000
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
