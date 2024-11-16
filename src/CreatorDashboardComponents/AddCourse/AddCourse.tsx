'use client'

import React, { useState } from 'react'
import styles from './AddCourse.module.css'

interface Question {
  id: number
  title: string
}

interface Topic {
  topicName: string
  questions: Question[]
}

interface Course {
  name: string
  description: string
  imageUrl: string
  topics: Topic[]
}

interface AddCourseProps {
  onAddCourse: (course: Course) => void
}

const AddCourse: React.FC<AddCourseProps> = ({ onAddCourse }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [topics, setTopics] = useState<Topic[]>([{ topicName: '', questions: [] }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddCourse({ name, description, imageUrl, topics })
    setName('')
    setDescription('')
    setImageUrl('')
    setTopics([{ topicName: '', questions: [] }])
  }

  const addTopic = () => {
    setTopics([...topics, { topicName: '', questions: [] }])
  }

  const updateTopic = (index: number, topicName: string) => {
    const newTopics = [...topics]
    newTopics[index].topicName = topicName
    setTopics(newTopics)
  }

  const addQuestion = (topicIndex: number) => {
    const newTopics = [...topics]
    newTopics[topicIndex].questions.push({ id: newTopics[topicIndex].questions.length + 1, title: '' })
    setTopics(newTopics)
  }

  const updateQuestion = (topicIndex: number, questionIndex: number, field: keyof Question, value: string | number) => {
    const newTopics = [...topics]
    newTopics[topicIndex].questions[questionIndex][field] = value as never
    setTopics(newTopics)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Course</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Course Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter course name"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Course Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course description"
            className={styles.textarea}
            rows={4}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.label}>Image URL</label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Topics</label>
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className={styles.topic}>
              <input
                type="text"
                value={topic.topicName}
                onChange={(e) => updateTopic(topicIndex, e.target.value)}
                placeholder="Enter topic name"
                className={styles.input}
                required
              />
              <div className={styles.questions}>
                {topic.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className={styles.question}>
                    <input
                      type="number"
                      value={question.id}
                      onChange={(e) => updateQuestion(topicIndex, questionIndex, 'id', parseInt(e.target.value))}
                      placeholder="Question ID"
                      className={styles.input}
                      required
                    />
                    <input
                      type="text"
                      value={question.title}
                      onChange={(e) => updateQuestion(topicIndex, questionIndex, 'title', e.target.value)}
                      placeholder="Question title"
                      className={styles.input}
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addQuestion(topicIndex)} className={styles.addButton}>
                  Add Question
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addTopic} className={styles.addButton}>
            Add Topic
          </button>
        </div>
        <button type="submit" className={styles.submitButton}>Add Course</button>
      </form>
    </div>
  )
}

export default AddCourse