'use client'

import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import styles from './Dashboard.module.css'
import { getCreatorName, db } from '../../utils/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import Header from '../Header/Header'
import AddProblem from '../AddProblem/AddProblem'
import AddCourse from '../AddCourse/AddCourse'

interface Problem {
  id: string
  title: string
  description: string
  difficulty: string
  tags: string[]
  solution: string
  example: string
  testCases: { input: string; output: string }[]
}

interface Course {
  id: string
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
  const [problems, setProblems] = useState<Problem[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = await getCreatorName()
        setCreatorName(name)

        const problemsSnapshot = await getDocs(collection(db, 'problems'))
        const problemsData = problemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Problem))
        setProblems(problemsData)

        const coursesSnapshot = await getDocs(collection(db, 'learningPath'))
        const coursesData = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course))
        setCourses(coursesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const addProblem = async (problem: Omit<Problem, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'problems'), problem)
      const newProblem = { ...problem, id: docRef.id }
      setProblems([...problems, newProblem])
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding problem:', error)
    }
  }

  const addCourse = async (course: Omit<Course, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'learningPath'), course)
      const newCourse = { ...course, id: docRef.id }
      setCourses([...courses, newCourse])
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding course:', error)
    }
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