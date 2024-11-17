import React from 'react'
import { FC } from 'react'

interface LearningCardProps {
    course: Course;
}

const Learningcard : FC<LearningCardProps> = ({course}) => {
    console.log(course.name);
  return (
    <div id='problemSetLeaningCard'>
      <h1>{course.name}</h1>
    </div>
  )
}

export default Learningcard
