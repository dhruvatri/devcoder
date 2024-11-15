import React, { useState } from 'react';
import styles from './AddCourse.module.css';

interface Course {
  title: string;
  description: string;
  difficulty: string;
}

interface AddCourseProps {
  onAddCourse: (course: Course) => void;
}

const AddCourse: React.FC<AddCourseProps> = ({ onAddCourse }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCourse({ title, description, difficulty });
    setTitle('');
    setDescription('');
    setDifficulty('');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Course Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            className={styles.input}
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
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Submit Course</button>
      </form>
    </div>
  );
};

export default AddCourse;