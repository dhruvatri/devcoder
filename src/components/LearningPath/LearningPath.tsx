import React from 'react'
import './LearningPath.css'
import learningPath from '../../assets/learningPath.json'
import Learningcard from '../Learningcard/Learningcard'
import { useNavigate } from 'react-router-dom'
const LearningPath = () => {
  const navigate = useNavigate();
  const learningComponents : Course[] = learningPath.slice(0,6);
  console.log(learningComponents);
  return (
    <div className='problemSetLearningItems'>
    {
      learningComponents.map((learningComponent) => {
        console.log(learningComponent)
        return <div key={learningComponent.id} className='problemSetLeaningCard' onClick={()=>{navigate(`/learning-path/${learningComponent.id}`)}}>
          <img src={learningComponent.imageUrl} />
          <h1>{learningComponent.name}</h1>
        </div>
      })
    }
    </div>
  )
}

export default LearningPath
