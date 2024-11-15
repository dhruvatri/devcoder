import React, { useState } from 'react';
import styles from './AddProblem.module.css';

interface Problem {
  description: string;
  topic: string;
  difficulty: string;
}

interface AddProblemProps {
  onAddProblem: (problem: Problem) => void;
}

const AddProblem: React.FC<AddProblemProps> = ({ onAddProblem }) => {
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProblem({ description, topic, difficulty });
    setDescription('');
    setTopic('');
    setDifficulty('');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Problem Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter problem description"
            className={styles.textarea}
            rows={4}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="topic" className={styles.label}>Topic</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="difficulty" className={styles.label}>Difficulty Level</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={styles.select}
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Submit Problem</button>
      </form>
    </div>
  );
};

export default AddProblem;