import React from 'react';
import ProblemSet from '../../utils/problems.json'
import parse from 'html-react-parser'

interface ProblemComponentProps {
  pid: number;
}

const ProblemComponent: React.FC<ProblemComponentProps> = ({ pid }) => {
  return (
    <div className='problem'>
      {parse(ProblemSet[pid-1].title)}
      {parse(ProblemSet[pid-1].description)}
    </div>
  )
}

export default ProblemComponent