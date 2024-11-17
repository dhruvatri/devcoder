// DataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs } from 'firebase/firestore';
// import db from './firebaseConfig'; // Your Firebase configuration
import {db} from '../utils/firebase'

interface DataContextType {
  problems: Problem[];
  submissions: Submission[];
  learningPaths: Course[];
  loading: boolean;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [learningPaths, setLearningPaths] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch problems
        const problemsCollection = collection(db, 'problems');
        const problemsSnapshot = await getDocs(problemsCollection);
        const problemsData = problemsSnapshot.docs.map((doc) => ({
          id: Number(doc.id), // Ensure ID is a number
          ...doc.data(),
        })) as Problem[];
  
        // Sort problems by `quesId`
        problemsData.sort((a, b) => a.id - b.id); // Ensure quesId exists and is numeric
        setProblems(problemsData);
  
        // Fetch submissions
        const submissionsCollection = collection(db, 'submissionData');
        const submissionsSnapshot = await getDocs(submissionsCollection);
        const submissionsData = submissionsSnapshot.docs.map((doc) => {
          const data = doc.data();
          const submission: Submission = {
            submissionId: data.submissionId, // Assuming submissionId is stored in the document
            userId: data.userId,
            problemId: data.problemId,
            status: data.status,
            isCorrect: data.isCorrect,
          };
          return submission;
        });
        setSubmissions(submissionsData);
  
        // Fetch learning paths
        const learningPathsCollection = collection(db, 'learningPath');
        const learningPathsSnapshot = await getDocs(learningPathsCollection);
        const learningPathsData = learningPathsSnapshot.docs.map((doc) => ({
          id: Number(doc.id),
          ...doc.data(),
        })) as Course[];
        setLearningPaths(learningPathsData);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <DataContext.Provider value={{ problems, submissions, learningPaths, loading }}>
      {children}
    </DataContext.Provider>
  );
};
