// Third-Party Imports
import React from "react";

// My Imports
import { CoursePart } from "../types";

const Total: React.FC<{course: CoursePart[]}> = ({course}) => (
  <p>
    Number of exercises{" "}
    {course.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;