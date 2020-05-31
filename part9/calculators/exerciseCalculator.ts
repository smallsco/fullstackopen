interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (weeklyReport: Array<number>, targetHours: number): ExerciseReport => {
  const trainingHours: number = weeklyReport.reduce((prev, current) => prev + current)
  const averageHours: number = trainingHours / weeklyReport.length
  const success: boolean = averageHours >= targetHours
  let rating: number
  let ratingDescription: string
  if (success) {
    rating = 3
    ratingDescription = 'Good Job! You made your target!'
  }
  else if (averageHours >= (targetHours * 0.75)) {
    rating = 2
    ratingDescription = "You're pretty close! Keep on practicing!"
  }
  else {
    rating = 1
    ratingDescription = 'What are you, a couch potato?'
  }
  return {
    periodLength: weeklyReport.length,
    trainingDays: weeklyReport.filter(day => day != 0).length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: averageHours
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));