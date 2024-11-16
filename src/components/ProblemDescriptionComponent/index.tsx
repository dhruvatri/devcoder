import React, { useEffect } from 'react'
import { db } from '../../utils/firebase'
import { getDocs, query, where, collection } from 'firebase/firestore'
import './style.css'

interface ProblemDescriptionComponentProps {
	id: string;
}

const ProblemDescriptionComponent: React.FC<ProblemDescriptionComponentProps> = ({ id }) => {
	const [problem , setProblem] = React.useState<Problem | null>(null)

    const fetchProblem = async (id:number) => {
		const q = query(collection(db, 'problems'), where('id', '==', id))
		const querySnapshot = await getDocs(q)

		console.log(querySnapshot.docs.map(doc => doc.data()))
		if(querySnapshot.docs.length === 1) {
			setProblem(querySnapshot.docs[0].data() as Problem)
		}
	}

	useEffect(() => {
		console.log(id)
		fetchProblem(parseInt(id));
	}, []);

  return (
    <div className='problem-description'>
	  {problem ? (
		<div>
			<div className='description-header'>
				<h1>{id+'.  '}{problem.title}</h1>
				<span>{problem.difficulty}</span>
			</div>
		  <p>{problem.description}</p>
		  <p>Examples:</p>
		  <p>{problem.example}</p>
		</div>
	  ) : (
		<p>Loading...</p>
	  )}
    </div>
  )
}

export default ProblemDescriptionComponent