import React from 'react'
import ProblemSet from './components/ProblemSet/ProblemSet'
import LearningPathSeeAll from './components/LearningPathSeeAll/LearningPathSeeAll'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeaningPathDetails from './components/LeaningPathDetails/LeaningPathDetails';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/problemset" element={<ProblemSet />} />
        <Route path="/learning-path" element={<LearningPathSeeAll />} />
        <Route path='/learning-path/:id' element={<LeaningPathDetails />} />
      </Routes>
    </Router>
  )
}

export default App
