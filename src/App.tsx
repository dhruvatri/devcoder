import React from 'react'
import ProblemSet from './components/ProblemSet/ProblemSet'
import LearningPathSeeAll from './components/LearningPathSeeAll/LearningPathSeeAll'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeaningPathDetails from './components/LeaningPathDetails/LeaningPathDetails';

import { DataProvider } from './DataContext';

const App = () => {
  const [currentUser,setCurrentUser] = React.useState<number>(1);
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/problemset" element={<ProblemSet />} />
          <Route path="/learning-path" element={<LearningPathSeeAll />} />
          <Route path='/learning-path/:id' element={<LeaningPathDetails />} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
