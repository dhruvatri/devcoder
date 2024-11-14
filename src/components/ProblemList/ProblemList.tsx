import React, { useState } from 'react';
import './ProblemList.css';
import problemData from '../../assets/problems.json';
import { useNavigate } from 'react-router-dom';

interface TestCase {
  input: string;
  output: string;
}

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  solution: string;
  example: string;
  testCases: TestCase[];
}

const ProblemList: React.FC = () => {
  const [probList, setProbList] = useState<Problem[]>(problemData as Problem[]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const problemPerPage: number = 10;

  // Sorting Logic
  const filteredProblems = probList.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.id.toString().includes(searchTerm); // Check if search term matches title or ID
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesTag = selectedTag === 'All' || problem.tags.includes(selectedTag);
    return matchesSearch && matchesDifficulty && matchesTag;
  });

  // Pagination logic
  const indexOfLastProblem = pageNo * problemPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);

  const totalPages = Math.ceil(filteredProblems.length / problemPerPage);

  // Change page number
  const handlePageChange = (pageNumber: number) => {
    setPageNo(pageNumber);
  };

  // Difficulty and Tag filter handlers
  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(event.target.value);
    setPageNo(1); // Reset to first page when filter changes
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
    setPageNo(1); // Reset to first page when filter changes
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'green';
      case 'Medium':
        return 'orange';
      case 'Hard':
        return 'red';
      default:
        return 'white';
    }
  };

  const navigate = useNavigate();

  return (
    <div id="ProblemSetProblemScreen">
      <div id="SortProblems">
        <input
          type="text"
          placeholder="Search problems by title or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedDifficulty} onChange={handleDifficultyChange}>
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select value={selectedTag} onChange={handleTagChange}>
          <option value="All">All Topics</option>
          {[...new Set(probList.flatMap((problem) => problem.tags))].map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="problem-list">
      {currentProblems.map((problem) => (
        <div key={problem.id} className="problem-item" onClick={()=>navigate(`/problem/${problem.id}`)}>
          <h3>{problem.id}: {problem.title}</h3>
          <p>{problem.description}</p>
          <p>
            <strong>Difficulty:</strong> <span style={{ color: getDifficultyColor(problem.difficulty) }}>{problem.difficulty}</span>
          </p>
          <p><strong>Tags:</strong> {problem.tags.join(', ')}</p>
        </div>
      ))}
    </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${pageNo === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
