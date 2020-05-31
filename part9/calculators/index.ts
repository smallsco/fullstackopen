// Third-Party Imports
import express from 'express';

// Init Express Framework
const app = express();

// Routes
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// Start Server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});