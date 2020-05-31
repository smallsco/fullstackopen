// My Imports
import { Diagnosis } from '../types';
import diagnoses from '../../data/diagnoses';

// Get all diagnoses
const getAll = (): Array<Diagnosis> => {
  return diagnoses;
};

export default { getAll };