import  { useState } from 'react'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const [code, setCode] = useState(`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Problems</button>
          <button className={styles.navButton}>Contests</button>
          <button className={styles.navButton}>Discuss</button>
        </nav>
        <div className={styles.authButtons}>
          <button className={styles.loginButton}>Login</button>
          <button className={styles.registerButton}>Register</button>
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.logo}>DEV EDITOR</h1>
        <p className={styles.tagline}>Master Algorithms,Interview Questions</p>
        <div className={styles.editorContainer}>
          <div className={styles.problemStatement}>
            <h2>Two Sum</h2>
            <p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
          </div>
          <div className={styles.codeEditor}>
            <div className={styles.editorHeader}>
              <select className={styles.languageSelect}>
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
              </select>
              <button className={styles.runButton}>Run Code</button>
            </div>
            <textarea
              className={styles.codeArea}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <h3>Global Chat</h3>
            <p>While solving problems, use our global chat to connect, share ideas, and collaborate with others in real time.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Learn and Grow with Expert-Led Courses</h3>
            <p>Learn step-by-step and gain expertise in various topics with our curated courses.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Notes</h3>
            <p>You can also add your own notes and practice regularly to improve.</p>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2023 CODEEDITOR. All rights reserved.</p>
      </footer>
    </div>
  )
}