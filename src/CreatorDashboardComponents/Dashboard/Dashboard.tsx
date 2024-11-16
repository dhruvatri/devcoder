'use client'

import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import styles from './Dashboard.module.css'
import { getCreatorName } from '../../utils/firebase'
import Header from '../Header/Header'
import AddProblem from '../AddProblem/AddProblem'
import AddCourse from '../AddCourse/AddCourse'
import problemsData from '../../assets/problems.json'
import learningPathData from '../../assets/learningPath.json'

interface Problem {
  id: number
  title: string
  description: string
  difficulty: string
  tags: string[]
  solution: string
  example: string
  testCases: { input: string; output: string }[]
}

interface Course {
  id: number
  name: string
  description: string
  imageUrl: string
  topics: {
    topicName: string
    questions: { id: number; title: string }[]
  }[]
}

export default function Dashboard() {
  const [creatorName, setCreatorName] = useState('')
  const [activeSection, setActiveSection] = useState<'problems' | 'courses'>('problems')
  const [showAddForm, setShowAddForm] = useState(false)
  const [problems, setProblems] = useState<Problem[]>(problemsData)
  const [courses, setCourses] = useState<Course[]>(learningPathData)

  useEffect(() => {
    const fetchCreatorName = async () => {
      const name = await getCreatorName()
      setCreatorName(name)
    }
    fetchCreatorName()
  }, [])

  const addProblem = (problem: Omit<Problem, 'id'>) => {
    const newProblem = { ...problem, id: problems.length + 1 }
    setProblems([...problems, newProblem])
    setShowAddForm(false)
  }

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = { ...course, id: courses.length + 1 }
    setCourses([...courses, newCourse])
    setShowAddForm(false)
  }

  const toggleSection = (section: 'problems' | 'courses') => {
    setActiveSection(section)
    setShowAddForm(false)
  }

  return (
    <div className={styles.dashboard}>
      <Header creatorName={creatorName} />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statCircle} style={{ backgroundColor: 'var(--color-dark-pink)' }}>
                {problems.length}
              </div>
              <p>Problems Posted</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCircle} style={{ backgroundColor: 'var(--color-dark-green-s)' }}>
                {courses.length}
              </div>
              <p>Courses Posted</p>
            </div>
          </div>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeSection === 'problems' ? styles.activeTab : ''}`}
              onClick={() => toggleSection('problems')}
            >
              Problems
            </button>
            <button
              className={`${styles.tab} ${activeSection === 'courses' ? styles.activeTab : ''}`}
              onClick={() => toggleSection('courses')}
            >
              Courses
            </button>
          </div>
          <div className={styles.content}>
            {activeSection === 'problems' && (
              <>
                {problems.map((problem) => (
                  <div key={problem.id} className={styles.card}>
                    <h4 className={styles.cardTitle}>{problem.title}</h4>
                    <p className={styles.cardDescription}>{problem.description}</p>
                    <p className={styles.cardDifficulty}>Difficulty: {problem.difficulty}</p>
                    <p className={styles.cardTags}>Tags: {problem.tags.join(', ')}</p>
                  </div>
                ))}
              </>
            )}
            {activeSection === 'courses' && (
              <>
                {courses.map((course) => (
                  <div key={course.id} className={styles.card}>
                    <img src={course.imageUrl} alt={course.name} className={styles.courseImage} />
                    <h4 className={styles.cardTitle}>{course.name}</h4>
                    <p className={styles.cardDescription}>{course.description}</p>
                    <div className={styles.topicsContainer}>
                      {course.topics.map((topic, index) => (
                        <div key={index} className={styles.topic}>
                          <h5 className={styles.topicName}>{topic.topicName}</h5>
                          <ul className={styles.questionList}>
                            {topic.questions.map((question) => (
                              <li key={question.id} className={styles.questionItem}>
                                {question.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
            <button className={styles.addButton} onClick={() => setShowAddForm(true)}>
              <Plus className={styles.addIcon} />
              Add {activeSection === 'problems' ? 'Problem' : 'Course'}
            </button>
          </div>
        </div>
      </main>
      {showAddForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowAddForm(false)}>
              <X />
            </button>
            {activeSection === 'problems' ? (
              <AddProblem onAddProblem={addProblem} />
            ) : (
              <AddCourse onAddCourse={addCourse} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}