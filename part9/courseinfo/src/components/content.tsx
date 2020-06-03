// Third-Party Imports
import React from "react";

// My Imports
import { CoursePart } from "../types";
import Part from "./part";

const Content: React.FC<{course: CoursePart[]}> = ({course}) => {
  const courses = course.map(part => <Part key={part.name} part={part} />);
  return (
    <>
      {courses}
    </>
  );
};

export default Content;