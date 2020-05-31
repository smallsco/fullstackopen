// Third-Party Imports
import express from 'express';

// My Imports
import patientService from '../services/patientService';

// Create router
const router = express.Router();

// Get all patients without SSN
router.get('/', (_req, res) => {
  return res.send(patientService.getAllPublic());
});

export default router;