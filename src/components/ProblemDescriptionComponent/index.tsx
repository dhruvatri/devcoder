import React, { useEffect } from "react";
import { db } from "../../utils/firebase";
import { getDocs, query, where, collection } from "firebase/firestore";

interface ProblemDescriptionComponentProps {
	id: string;
}

const ProblemDescriptionComponent: React.FC<
	ProblemDescriptionComponentProps
> = ({ id }) => {
	const fetchProblem = async (id: string) => {
		const q = query(collection(db, "problems"), where("id", "==", id));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			console.log(doc.id, " => ", doc.data());
		});
	};

	useEffect(() => {
		fetchProblem(id);
	}, []);

	return <div></div>;
};

export default ProblemDescriptionComponent;
