import React, { useState } from 'react'
import styles from './AddProblem.module.css'

interface Problem {
  title: string
  description: string
  difficulty: string
  tags: string[]
  solution: string
  example: string
  testCases: { input: string; output: string }[]
}

interface AddProblemProps {
  onAddProblem: (problem: Problem) => void
}

const AddProblem: React.FC<AddProblemProps> = ({ onAddProblem }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [tags, setTags] = useState('')
  const [solution, setSolution] = useState('')
  const [example, setExample] = useState('')
  const [testCases, setTestCases] = useState([{ input: '', output: '' }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddProblem({
      title,
      description,
      difficulty,
      tags: tags.split(',').map(tag => tag.trim()),
      solution,
      example,
      testCases
    })
    // Reset form fields
    setTitle('')
    setDescription('')
    setDifficulty('')
    setTags('')
    setSolution('')
    setExample('')
    setTestCases([{ input: '', output: '' }])
  }

  const handleTestCaseChange = (index: number, field: 'input' | 'output', value: string) => {
    const updatedTestCases = [...testCases]
    updatedTestCases[index][field] = value
    setTestCases(updatedTestCases)
  }

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }])
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Problem</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Problem Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter problem title"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Problem Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter problem description"
            className={styles.textarea}
            rows={4}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="difficulty" className={styles.label}>Difficulty Level</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="tags" className={styles.label}>Tags (comma-separated)</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags (e.g., Array, String, Dynamic Programming)"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="solution" className={styles.label}>Solution</label>
          <textarea
            id="solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Enter solution code"
            className={styles.textarea}
            rows={6}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="example" className={styles.label}>Example</label>
          <input
            id="example"
            type="text"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            placeholder="Enter an example (e.g., Input: nums = [2, 7, 11, 15], target = 9)"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Test Cases</label>
          {testCases.map((testCase, index) => (
            <div key={index} className={styles.testCase}>
              <input
                type="text"
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                placeholder="Input"
                className={styles.input}
                required
              />
              <input
                type="text"
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                placeholder="Output"
                className={styles.input}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addTestCase} className={styles.addTestCaseButton}>
            Add Test Case
          </button>
        </div>
        <button type="submit" className={styles.submitButton}>Submit Problem</button>
      </form>
    </div>
  )
}

export default AddProblem