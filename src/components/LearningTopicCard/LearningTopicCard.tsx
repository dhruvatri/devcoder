import React, { FC } from 'react'
import './LearningTopicCard.css'
// import problems from '../../assets/problems.json'
import { useNavigate } from 'react-router-dom'
// import submissionData from '../../assets/submissionData.json';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { useAuth } from '../../contexts/AuthProvider';


interface learningTopicCardProps {
  topic: Topic;
}

const LearningTopicCard : FC<learningTopicCardProps>= ({topic}) => {

  const {user} = useAuth();
  let currUser = ''; if(user?.uid !== undefined) currUser = user.uid;

  const { problems, submissions, loading, learningPaths } = useContext(DataContext)!;
  if (loading) return (
    <div id="loading-for-data-page">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
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


    // To determine status of problems for icondisplay
  const getProblemStatus = (problemId: number, userId: string): string => {
    const userSubmissions = submissions.filter(
      (submission) => submission.problemId === problemId && submission.userId === userId
    );
  
    if (userSubmissions.some((submission) => submission.status === 'completed')) {
      return 'completed';
    } else if (userSubmissions.length > 0) {
      return 'attempted';
    } else {
      return 'to-do';
    }
  };


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

      // for topic wise completion bar
      // Calculate progress percentage for the topic
    const totalQuestions = enrichedQuestions.length;
    const completedQuestions = enrichedQuestions.filter(
        (question) => getProblemStatus(question.id, currUser) === 'completed'
    ).length;

    const progressPercentage = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;



    return (
    <div id='learningPathTopic'>
        <div id='learningPathTopicHeader'>
        <h1>{topic.topicName}</h1>
        </div>
        <div
            id="topic-completion-status"
            style={{
            width: `${progressPercentage}%`, // Set width based on progress
        }}></div>
        <div className="problem-list">
        {enrichedQuestions.map((problem) => (
            <div key={problem.id} className="problem-item" onClick={()=>navigate(`/problem/${problem.id}`)}>
            <div className='question-card-header'>
            <h3>{problem.id}: {problem.title}</h3>
            <img className='question-status' src={getProblemStatus(problem.id,currUser)==='completed' ? 'https://wallpapers.com/images/hd/green-check-mark-black-background-h4sar2aihe79iwgr-2.jpg' : getProblemStatus(problem.id,currUser) ==='attempted' ? 'https://thumbs.dreamstime.com/b/red-black-grunge-brush-stroke-cross-no-decline-aggressive-vector-vintage-sign-curved-isolated-check-mark-object-dark-background-95414900.jpg' : 'https://image.freepik.com/free-icon/minus-sign-in-a-square_318-53201.jpg' }></img>
          </div>
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
