import React, { FC } from 'react'
import './LearningTopicCard.css'
import problems from '../../assets/problems.json'
import { useNavigate } from 'react-router-dom'

interface learningTopicCardProps {
  topic: Topic;
}

const LearningTopicCard : FC<learningTopicCardProps>= ({topic}) => {
    const navigate = useNavigate();
    const enrichedQuestions : Problem[] = topic.questions.map((question) => {
        const problem = problems.find((p) => p.id === question.id);
        return {
            ...question,
            description: problem?.description || '',
            difficulty: problem?.difficulty || 'Unknown',
            tags: problem?.tags || [],
          } as Problem;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
          case 'Easy':
            return 'green';
          case 'Medium':
            return 'orange';
          case 'Hard':
            return 'red';
          default:
            return 'white';
        }
      };

    
    return (
    <div id='learningPathTopic'>
        <div id='learningPathTopicHeader'>
        <h1>{topic.topicName}</h1>
        </div>
        <div className="problem-list">
        {enrichedQuestions.map((problem) => (
            <div key={problem.id} className="problem-item" onClick={()=>navigate(`/problem/${problem.id}`)}>
            <h3>{problem.id}: {problem.title}</h3>
            <p>{problem.description}</p>
            <p>
                <strong>Difficulty:</strong> <span style={{ color: getDifficultyColor(problem.difficulty) }}>{problem.difficulty}</span>
            </p>
            <p><strong>Tags:</strong> {problem.tags.join(', ')}</p>
            </div>
        ))}
    </div>
    </div>
  )
}

export default LearningTopicCard
