const calculateBmi = (height: number, weight: number): String => {
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
  else if (bmi >= 30) {
    return 'Obese';
  }
}

console.log(calculateBmi(180, 74));