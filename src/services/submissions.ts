import {
	collection,
	doc,
	Firestore,
	getDocs,
	getDoc,
	query,
	where,
} from "firebase/firestore";

type SubmissionWithProblem = {
	id: string;
	userId: string;
	problemId: number;
	difficulty: string | null;
	problemTitle: string | null;
	[key: string]: any;
};

type GetUserSubmissionsProps = {
	userId: string;
	db: Firestore;
};

export const getUserSubmissions = async ({
	userId,
	db,
}: GetUserSubmissionsProps): Promise<SubmissionWithProblem[]> => {
	const submissionsRef = collection(db, "submissionData");
	const problemsRef = collection(db, "problems");

	const userQuery = query(submissionsRef, where("userId", "==", userId));
	const submissionSnapshot = await getDocs(userQuery);

	const submissions = await Promise.all(
		submissionSnapshot.docs.map(async (submissionDoc) => {
			const submissionData = submissionDoc.data();
			const problemDoc = await getDoc(
				doc(problemsRef, submissionData.problemId.toString())
			);

			return {
				id: submissionDoc.id,
				userId: submissionData.userId,
				problemId: submissionData.problemId,
				problemTitle: problemDoc.exists()
					? problemDoc.data()?.description || null
					: null,
				...submissionData,
				difficulty: problemDoc.exists()
					? problemDoc.data()?.difficulty || null
					: null,
			};
		})
	);

	return submissions;
};
