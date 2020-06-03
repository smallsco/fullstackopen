// Third-Party Imports
import React from "react";

// My Imports
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled type: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{part: CoursePart}> = ({part}) => {
  switch(part.name) {
    case "Fundamentals":
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount}<br />
          <i>{part.description}</i>
        </p>
      );
    case "Using props to pass data":
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
    case "Deeper type usage":
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount}<br />
          <i>{part.description}</i><br />
          <a href={part.exerciseSubmissionLink}>Submission Link</a>
        </p>
      );
    case "Exhaustive type checking":
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount}<br />
          <i>{part.description}</i><br />
          Rating: <b>{part.rating}</b>
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;