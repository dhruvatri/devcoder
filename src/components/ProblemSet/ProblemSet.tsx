import React from 'react'
import './ProblemSet.css'
import LearningPath from '../LearningPath/LearningPath'
import ProblemList from '../ProblemList/ProblemList'
import { useNavigate } from 'react-router-dom'

const ProblemSet = () => {
  const navigate = useNavigate();

  function ExpandStudyPlanHandler() {
    console.log('Click');
    navigate('/learning-path');
  }

  return (
    <div id='problemSetScreen'>
      <div id='plannerHeader'>
        <h1 >Study Plan</h1>
        <h3 id='see-all-courses' onClick={ExpandStudyPlanHandler}>See all</h3>
      </div>
      <LearningPath />
      <h1>Problems </h1>
      <ProblemList />
    </div>
  )
}

export default ProblemSet
