interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (args: Array<string>): ExerciseReport => {
  // Sanity-Check Input and cast to numbers
  if (args.length < 4) {
    throw new Error('Incorrect number of arguments');
  }
  const targetHours: number = Number(args[2]);
  const weeklyReport: Array<number> = args.slice(3, args.length).map(hours => Number(hours));
  if (isNaN(targetHours)) {
    throw new Error('Target hours must be a number');
  }
  weeklyReport.forEach(hours => {
    if (isNaN(hours)) {
      throw new Error('Weekly report must contain numbers');
    }
  })

  // Calculate Exercise
  const trainingHours: number = weeklyReport.reduce((prev, current) => prev + current);
  const averageHours: number = trainingHours / weeklyReport.length;
  const success: boolean = averageHours >= targetHours;
  let rating: number;
  let ratingDescription: string;
  if (success) {
    rating = 3;
    ratingDescription = 'Good Job! You made your target!';
  }
  else if (averageHours >= (targetHours * 0.75)) {
    rating = 2;
    ratingDescription = "You're pretty close! Keep on practicing!";
  }
  else {
    rating = 1;
    ratingDescription = 'What are you, a couch potato?';
  }
  return {
    periodLength: weeklyReport.length,
    trainingDays: weeklyReport.filter(day => day != 0).length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: averageHours
  };
}

console.log(calculateExercises(process.argv));