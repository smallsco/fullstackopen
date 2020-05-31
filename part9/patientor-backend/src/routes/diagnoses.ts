// Third-Party Imports
import express from 'express';

// My Imports
import diagnosisService from '../services/diagnosisService';

// Create router
const router = express.Router();

// Get all diagnoses
router.get('/', (_req, res) => {
  return res.send(diagnosisService.getAll());
});

export default router;