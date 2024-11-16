import React from 'react'
import './LearningPathSeeAll.css'
// import Learning from '../../assets/learningPath.json'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';


const LearningPathSeeAll = () => {

  const { problems, submissions, loading, learningPaths } = useContext(DataContext)!;

  if (loading) return (
    <div id="loading-for-data-page">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );

  const Learning = learningPaths;
  console.log(Learning);
  const navigate = useNavigate();

  function redirectPathhandler(id: number) {
    navigate(`/learning-path/${id}`);
  }

  return (
    <div id='learning-path-page'>
      <img src='https://t4.ftcdn.net/jpg/02/93/94/41/360_F_293944111_uTDy3HJcStHMbPTgC6GDSFGWudBiQZ5A.jpg' onClick={()=>navigate('/problemset')} className='back-button' />
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
