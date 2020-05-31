// My Imports
import { PublicPatient } from '../types';
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

export default { getAllPublic };