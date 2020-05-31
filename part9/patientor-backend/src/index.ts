// Third-Party Imports
import express from 'express';
import cors from 'cors';

// My Imports
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

// Init Express Framework
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get('/api/ping', (_req, res) => {
  return res.send('pong');
});
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

// Start Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});