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

// Adds a new patient
router.post('/', (req, res) => {
  console.log(req.body);
  const newPatient = patientService.addPatient(req.body);
  return res.json(newPatient);
})

export default router;