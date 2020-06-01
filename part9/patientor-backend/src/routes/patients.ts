// Third-Party Imports
import express from 'express';

// My Imports
import patientService from '../services/patientService';
import toNewPatient from '../utils';

// Create router
const router = express.Router();

// Get all patients without SSN
router.get('/', (_req, res) => {
  return res.send(patientService.getAllPublic());
});

// Adds a new patient
router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    return res.json(addedPatient);
  }
  catch(e) {
    return res.status(400).json({error: e.message});
  }
});

export default router;