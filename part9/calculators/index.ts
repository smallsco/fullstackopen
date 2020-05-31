// Third-Party Imports
import express, { ErrorRequestHandler } from 'express';

// My Imports
import { calculateBmi } from './bmiCalculator';

// Init Express Framework
const app = express();

// Routes
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  // Sanity Check Input
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({ error: 'Height and Weight must be provided' });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'Height and Weight must be numbers' });
  }

  // Do the BMI Calculation
  const bmi: string = calculateBmi(height, weight);
  return res.json({weight, height, bmi});
});

// Error Handler
const errorHandler: ErrorRequestHandler = (error: Error, _req, res, _next) => {
  return res.status(500).json({ error: error.message });
};
app.use(errorHandler);

// Start Server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});