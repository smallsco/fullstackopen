// Third-Party Imports
import React from "react";

// My Imports
import { CoursePart } from "./types";
import Header from "./components/header";
import Content from "./components/content";
import Total from "./components/total";


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Exhaustive type checking",
      exerciseCount: 4,
      description: "Did I do this correctly?",
      rating: 5
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content course={courseParts} />
      <Total course={courseParts} />
    </div>
  );

};

export default App;