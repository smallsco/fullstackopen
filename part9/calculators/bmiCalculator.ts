export const calculateBmi = (height: number, weight: number): string => {
  const height_in_metres: number = height / 100;
  const bmi: number = weight / (Math.pow(height_in_metres, 2));
  if (bmi < 18.5) {
    return 'Underweight';
  }
  else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
  }
  else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  }
  else /*if (bmi >= 30)*/ {
    return 'Obese';
  }
};

// Calculate BMI using command line args if the script was called directly
if (require.main === module) {

  // Sanity Check Input
  const args: Array<string> = process.argv;
  if (args.length != 4) {
    throw new Error('Incorrect number of arguments');
  }
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Height and Weight must be numbers');
  }

  // Do the BMI Calculation
  console.log(calculateBmi(height, weight));
}