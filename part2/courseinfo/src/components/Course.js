import React from 'react'

const Header = ({ text }) => (
  <h2>{text}</h2>
)

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    { parts.map( part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ) }
  </div>
)

const Total = ({ parts }) => (
  <p>
    <b>
      Total of { parts.reduce( (sum, part) => (
        sum + part.exercises
      ), 0) } exercises
    </b>
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course