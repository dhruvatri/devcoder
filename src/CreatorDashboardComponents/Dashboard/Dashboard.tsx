import React, { useState, useEffect } from 'react';
import { Code, BookOpen } from 'lucide-react';
import { getCreatorName } from '../../utils/firebase';
import Header from '../Header/Header';
import AddProblem from '../AddProblem/AddProblem';
import AddCourse from '../AddCourse/AddCourse';
import styles from './Dashboard.module.css';

interface Problem {
  id: number;
  description: string;
  topic: string;
  difficulty: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  difficulty: string;
}

const Dashboard: React.FC = () => {
  const [creatorName, setCreatorName] = useState('');
  const [showProblem, setShowProblem] = useState(false);
  const [showCourse, setShowCourse] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCreatorName = async () => {
      const name = await getCreatorName();
      setCreatorName(name);
    };
    fetchCreatorName();
  }, []);

  const addProblem = (problem: Omit<Problem, 'id'>) => {
    setProblems([...problems, { ...problem, id: problems.length + 1 }]);
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    setCourses([...courses, { ...course, id: courses.length + 1 }]);
  };

  return (
    <div className={styles.container}>
      <Header creatorName={creatorName} />
      <main className={styles.main}>
        <div className={styles.section}>
          <button 
            onClick={() => setShowProblem(!showProblem)}
            className={styles.toggleButton}
          >
            <Code className={styles.buttonIcon} size={20} />
            {showProblem ? 'Hide Problem Form' : 'Add Problem'}
          </button>
          {showProblem && <AddProblem onAddProblem={addProblem} />}
          <div className={styles.list}>
            <h3 className={styles.listTitle}>Problems</h3>
            {problems.map((problem) => (
              <div key={problem.id} className={styles.card}>
                <h4 className={styles.cardTitle}>{problem.topic}</h4>
                <p className={styles.cardDescription}>{problem.description}</p>
                <p className={styles.cardDifficulty}>Difficulty: {problem.difficulty}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <button 
            onClick={() => setShowCourse(!showCourse)}
            className={styles.toggleButton}
          >
            <BookOpen className={styles.buttonIcon} size={20} />
            {showCourse ? 'Hide Course Form' : 'Add Course'}
          </button>
          {showCourse && <AddCourse onAddCourse={addCourse} />}
          <div className={styles.list}>
            <h3 className={styles.listTitle}>Courses</h3>
            {courses.map((course) => (
              <div key={course.id} className={styles.card}>
                <h4 className={styles.cardTitle}>{course.title}</h4>
                <p className={styles.cardDescription}>{course.description}</p>
                <p className={styles.cardDifficulty}>Difficulty: {course.difficulty}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;