import React from 'react'
import { useParams } from 'react-router-dom';
// import Learning from '../../assets/learningPath.json';
// import submissionData from '../../assets/submissionData.json';
// import problems from '../../assets/problems.json';
import LearningTopicCard from '../LearningTopicCard/LearningTopicCard';
import './LeaningPathDetails.css';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { useAuth } from '../../contexts/AuthProvider';

const LeaningPathDetails = () => {

  const {user} = useAuth();
  const currUser = user?.uid;

  const { problems, submissions, loading, learningPaths } = useContext(DataContext)!;
  if (loading) return (
    <div id="loading-for-data-page">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
  const Learning = learningPaths;
  const submissionData = submissions;
  const { id } = useParams<string>();
  const navigate = useNavigate();

  let learningPlan;
  if (id !== undefined) {
    learningPlan = Learning.find((item) => item.id === parseInt(id, 10));
    if (!learningPlan) {
      return <p>Learning plan not found!</p>;
    }
  }

  const [hoveredCategory, setHoveredCategory] = useState<string>('all'); // Track hover state

  const allQuestions = learningPlan?.topics.flatMap((topic) => topic.questions) || [];
  const enrichedQuestions = allQuestions.map((question) => {
    const problem = problems.find((p) => p.id === question.id);
    const submission = submissionData.find((s) => s.problemId === question.id && s.userId === currUser);
    return {
      ...question,
      description: problem?.description || '',
      difficulty: problem?.difficulty || 'Unknown',
      tags: problem?.tags || [],
      status: submission?.status || 'to-do',
    };
  });

  // Calculating progress bar for side panel
  const totalProblems = enrichedQuestions.length;
  const easyProblems = enrichedQuestions.filter((q) => q.difficulty === 'Easy');
  const mediumProblems = enrichedQuestions.filter((q) => q.difficulty === 'Medium');
  const hardProblems = enrichedQuestions.filter((q) => q.difficulty === 'Hard');

  const solvedEasy = easyProblems.filter((q) => q.status === 'completed').length;
  const solvedMedium = mediumProblems.filter((q) => q.status === 'completed').length;
  const solvedHard = hardProblems.filter((q) => q.status === 'completed').length;

  const progressData = [
    { name: 'Easy', value: solvedEasy, total: easyProblems.length, color: 'green' },
    { name: 'Medium', value: solvedMedium, total: mediumProblems.length, color: 'orange' },
    { name: 'Hard', value: solvedHard, total: hardProblems.length, color: 'red' },
  ];

  // to change on hover
  const hoverData = hoveredCategory === 'all'
    ? progressData.flatMap((category) => [
        {
          name: `${category.name} Solved`,
          value: category.value,
          color: category.color,
        },
        {
          name: `${category.name} Remaining`,
          value: category.total - category.value,
          color: 'lightgray',
        },
      ])
    : [
        {
          name: `${hoveredCategory} Solved`,
          value: progressData.find((d) => d.name === hoveredCategory)?.value || 0,
          color: progressData.find((d) => d.name === hoveredCategory)?.color || 'gray',
        },
        {
          name: `${hoveredCategory} Remaining`,
          value:
            (progressData.find((d) => d.name === hoveredCategory)?.total ??0)-
              (progressData.find((d) => d.name === hoveredCategory)?.value ?? 0),
          color: 'lightgray',
        },
      ];

  return (
    <div id='learning-details-screen'>
      <img src='https://t4.ftcdn.net/jpg/02/93/94/41/360_F_293944111_uTDy3HJcStHMbPTgC6GDSFGWudBiQZ5A.jpg' onClick={() => navigate('/learning-path')} className='back-button' style={{ marginLeft: '-6em' }} alt="Back" />

      <div id='learning-details-header'>
        <img src={learningPlan?.imageUrl} alt={learningPlan?.name} />
        <div>
          <p>{learningPlan?.description}</p>
          <h1>{learningPlan?.name}</h1>
        </div>
      </div>

      {learningPlan?.topics.map((topic, index) => {
        return <LearningTopicCard topic={topic} key={index} />
      })}

      <div id="sidebar">
        <h2>Progress Overview</h2>
        <div className="sidebar-boxes" onMouseEnter={() => setHoveredCategory('all')} onMouseLeave={() => setHoveredCategory('all')}>
          <p>Total</p> <p>{solvedEasy + solvedMedium + solvedHard}/{totalProblems}</p>
        </div>
        <div className="sidebar-boxes" onMouseEnter={() => setHoveredCategory('Easy')} onMouseLeave={() => setHoveredCategory('all')}>
          <p style={{ color: 'green' }}>Easy</p> <p>{solvedEasy}/{easyProblems.length}</p>
        </div>
        <div className="sidebar-boxes" onMouseEnter={() => setHoveredCategory('Medium')} onMouseLeave={() => setHoveredCategory('all')}>
          <p style={{ color: 'var(--color-brand-orange)' }}>Medium</p><p>{solvedMedium}/{mediumProblems.length}</p>
        </div>
        <div className="sidebar-boxes" onMouseEnter={() => setHoveredCategory('Hard')} onMouseLeave={() => setHoveredCategory('all')}>
          <p style={{ color: 'red' }}>Hard</p><p>{solvedHard}/{hardProblems.length}</p>
        </div>

        <PieChart width={200} height={200}>
          <Pie
            data={hoverData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            innerRadius="62.5%"
            // label={(entry) => `${entry.value}`} // Label to show the value inside the pie
          >
            {hoverData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div style={{ marginTop: '-8.9em', marginBottom: '3em' }} id='innerPieChartText'>
          <div style={{ marginBottom: '-0.2em' }}>{hoveredCategory.toUpperCase()}</div>
          {hoveredCategory === 'all' ? (
            <div>
              <p>{solvedEasy + solvedMedium + solvedHard}</p>
              <div style={{ height: '0.2em', width: '3em', backgroundColor: 'white', marginTop: '-0.4em', marginBottom: '-0.4em' }}></div>
              <p>{totalProblems}</p>
            </div>
          ) : (
            <>
              <p>
                {hoverData[0].value}
              </p>
              <div style={{ height: '0.2em', width: '3em', backgroundColor: 'white', marginTop: '-0.4em', marginBottom: '-0.4em' }}></div>
              <p>
                {hoverData[0].value + hoverData[1].value}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeaningPathDetails;
