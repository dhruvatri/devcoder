import React from 'react'
import './LearningPathSeeAll.css'
import Learning from '../../assets/learningPath.json'
import { useNavigate } from 'react-router-dom'

const LearningPathSeeAll = () => {
  const navigate = useNavigate();

  function redirectPathhandler(id: number) {
    navigate(`/learning-path/${id}`);
  }

  return (
    <div id='learning-path-page'>
      <img src='https://static-00.iconduck.com/assets.00/go-back-icon-512x512-hqhqt5j0.png' onClick={()=>navigate('/problemset')} className='back-button' />
      <h1 id='learning-path-header'>Learning Paths </h1>
      <div id='learning-path-show-area'>
        {Learning.map((item, index) => {
            return (
                <div key={index} className='learning-name-card' onClick={()=>redirectPathhandler(item.id)}>
                    <img src={item.imageUrl} alt={item.name} />
                    <div>
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                    </div>    
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default LearningPathSeeAll
