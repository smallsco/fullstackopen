// Third-Party Imports
import express from 'express';
import cors from 'cors';

// Init Express Framework
const app = express();
app.use(cors());  // eslint-disable-line @typescript-eslint/no-unsafe-call

// Routes
app.get('/api/ping', (_req, res) => {
  return res.send('pong');
});

// Start Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});