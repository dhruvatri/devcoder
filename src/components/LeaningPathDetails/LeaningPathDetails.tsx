import React from 'react'
import { useParams } from 'react-router-dom';
import Learning from '../../assets/learningPath.json';
import LearningTopicCard from '../LearningTopicCard/LearningTopicCard';
import './LeaningPathDetails.css';
import { useNavigate } from 'react-router-dom';

const LeaningPathDetails = () => {
    const { id }  = useParams<string>();
    const navigate = useNavigate();
    let learningPlan;
    if (id !== undefined){
        learningPlan = Learning.find((item) => item.id === parseInt(id, 10));
        if (!learningPlan) {
            return <p>Learning plan not found!</p>;
        }
    }
  return (
    <div id='learning-details-screen'>
    <img src='https://static-00.iconduck.com/assets.00/go-back-icon-512x512-hqhqt5j0.png' onClick={()=>navigate('/learning-path')} className='back-button' style={{marginLeft:'-6em'}} />

     <div id='learning-details-header'>
        <img src={learningPlan?.imageUrl}></img>
        <div>
            <p>{learningPlan?.description}</p>
            <h1>{learningPlan?.name}</h1>
        </div>
     </div>
     {learningPlan?.topics.map((topic, index) => {
        return <LearningTopicCard topic={topic} key={index}/>
     })}
    </div>
  )
}

export default LeaningPathDetails
