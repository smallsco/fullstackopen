import React from 'react'
import ReactDOM from 'react-dom'

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      { courses.map( course =>
        <Course key={course.id} course={course} />
      ) }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))