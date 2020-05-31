// Third-Party Imports
import express from 'express';

// Init Express Framework
const app = express();

// Routes
app.get('/ping', (_req, res) => {
  return res.send('pong');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});