// Third-Party Imports
import React from "react";

// My Imports
import { CoursePart } from "../App";

const Content: React.FC<{course: CoursePart[]}> = ({course}) => {
  const courses = course.map(part =>
    <p key={part.name}>
      {part.name} {part.exerciseCount}
    </p>
  );
  return (
    <>
      {courses}
    </>
  );
};

export default Content;