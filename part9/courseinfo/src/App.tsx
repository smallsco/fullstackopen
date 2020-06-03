// Third-Party Imports
import React from "react";

// My Imports
import Header from "./components/header";
import Content from "./components/content";
import Total from "./components/total";

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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