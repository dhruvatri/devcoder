import React from 'react'
import './LearningPath.css'
import learningPath from '../../assets/learningPath.json'
import Learningcard from '../Learningcard/Learningcard'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';

const LearningPath = () => {
  const { problems, submissions, loading, learningPaths } = useContext(DataContext)!;
  if (loading) return (
    <div id="loading-for-data-page">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
  const learningPath = learningPaths;

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
