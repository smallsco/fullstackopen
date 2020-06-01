// Third-Party Imports
import { v4 as uuidv4 } from 'uuid';

// My Imports
import { NewPatient, Patient, PublicPatient } from '../types';
import patients from '../../data/patients';

// Get all patients without ssn
const getAllPublic = (): Array<PublicPatient> => {
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

// Adds a new patient
const addPatient = (patientData: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patientData
  };
  patients.push(newPatient);
  return newPatient;
};

export default { addPatient, getAllPublic };