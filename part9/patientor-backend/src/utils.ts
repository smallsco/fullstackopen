/* eslint-disable @typescript-eslint/no-explicit-any */

// My Imports
import { Gender, NewPatient } from './types';

// String Validation
const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String;
};
const parseString = (field: string, value: any): string => {
  if (!value || !isString(value)) {
    throw new Error(`Value for field ${field} must be a string`);
  }
  return value;
};

// Date Validation
const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};
const parseDate = (field: string, value: any): string => {
  if (!value || !isString(value) || !isDate(value)) {
    throw new Error(`Value for field ${field} must be a stringified date`);
  }
  return value;
};

// Gender Validation
const isGender = (value: any): value is Gender => {
  return Object.values(Gender).includes(value);
};
const parseGender = (field: string, value: any): Gender => {
  if (!value || !isGender(value)) {
    throw new Error(`Value for field ${field} must be a gender`);
  } 
  return value;
};

// SSN Validation
// 6 digits, one dash, 3 or 4 alphanumeric characters
const isSSN = (value: string): boolean => {
  const re = /^\d{6}-\w{3,4}$/;
  return re.exec(value) !== null;
};
const parseSSN = (field: string, value: any): string => {
  if (!value || !isString(value) || !isSSN(value)) {
    throw new Error(`Value for field ${field} must be a SSN`);
  }
  return value;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString('name', object.name),
    dateOfBirth: parseDate('dateOfBirth', object.dateOfBirth),
    ssn: parseSSN('ssn', object.ssn),
    gender: parseGender('gender', object.gender),
    occupation: parseString('occupation', object.occupation)
  };
};

export default toNewPatient;