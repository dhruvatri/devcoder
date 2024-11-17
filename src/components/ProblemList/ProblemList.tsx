import React, { useState } from "react";
import "./ProblemList.css";
// import problemData from '../../assets/problems.json';
import { useNavigate } from "react-router-dom";
// import submissionData from '../../assets/submissionData.json';
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
import { useAuth } from "../../contexts/AuthProvider";

const ProblemList: React.FC = () => {
	const {
		problems,
		submissions: submissionData,
		loading,
	} = useContext(DataContext)!;

	const problemData = problems;
	console.log("PROBLEM  ", problemData);
	console.log("SUBMISSIONS  ", submissionData);

	const [probList] = useState<Problem[]>(problemData as Problem[]);
	const [pageNo, setPageNo] = useState<number>(1);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
	const [selectedTag, setSelectedTag] = useState<string>("All");
	const [submissionFilter, setSubmissionFilter] = useState<string>("All");
	const { user } = useAuth();
	let currUser = "";
	if (user?.uid !== undefined) currUser = user?.uid;
	const problemPerPage: number = 10;

	const submissions = submissionData as Submission[];
	// To determine status of problems for sorting
	const getProblemStatus = (problemId: number, userId: string): string => {
		const userSubmissions = submissions.filter(
			(submission) =>
				submission.problemId === problemId &&
				submission.userId === userId
		);

		if (
			userSubmissions.some(
				(submission) => submission.status === "completed"
			)
		) {
			return "completed";
		} else if (userSubmissions.length > 0) {
			return "attempted";
		} else {
			return "to-do";
		}
	};

	// Sorting Logic
	const filteredProblems = probList.filter((problem) => {
		const matchesSearch =
			problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			problem.id.toString().includes(searchTerm); // Check if search term matches title or ID
		const matchesDifficulty =
			selectedDifficulty === "All" ||
			problem.difficulty === selectedDifficulty;
		const matchesTag =
			selectedTag === "All" || problem.tags.includes(selectedTag);
		const status = getProblemStatus(problem.id, currUser);
		const matchesSubmissionFilter =
			submissionFilter === "All" || status === submissionFilter;

		return (
			matchesSearch &&
			matchesDifficulty &&
			matchesTag &&
			matchesSubmissionFilter
		);
	});

	// Pagination logic
	const indexOfLastProblem = pageNo * problemPerPage;
	const indexOfFirstProblem = indexOfLastProblem - problemPerPage;
	const currentProblems = filteredProblems.slice(
		indexOfFirstProblem,
		indexOfLastProblem
	);

	const totalPages = Math.ceil(filteredProblems.length / problemPerPage);

	// Change page number
	const handlePageChange = (pageNumber: number) => {
		setPageNo(pageNumber);
	};

	// Difficulty and Tag filter handlers
	const handleDifficultyChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedDifficulty(event.target.value);
		setPageNo(1); // Reset to first page when filter changes
	};

	const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedTag(event.target.value);
		setPageNo(1); // Reset to first page when filter changes
	};

	// Submission filter handler
	const handleSubmissionFilterChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSubmissionFilter(event.target.value);
		setPageNo(1); // Reset to first page when filter changes
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Easy":
				return "green";
			case "Medium":
				return "orange";
			case "Hard":
				return "red";
			default:
				return "white";
		}
	};

	const navigate = useNavigate();

	if (loading)
		return (
			<div id="loading-for-data-page">
				<div className="loading-spinner"></div>
				<p>Loading...</p>
			</div>
		);

	return (
		<div id="ProblemSetProblemScreen">
			<div id="SortProblems">
				<input
					type="text"
					placeholder="Search problems by title or ID..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<select
					value={selectedDifficulty}
					onChange={handleDifficultyChange}
				>
					<option value="All">All Difficulties</option>
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
				<select value={selectedTag} onChange={handleTagChange}>
					<option value="All">All Topics</option>
					{[
						...new Set(probList.flatMap((problem) => problem.tags)),
					].map((tag) => (
						<option key={tag} value={tag}>
							{tag}
						</option>
					))}
				</select>
				<select
					value={submissionFilter}
					onChange={handleSubmissionFilterChange}
				>
					<option value="All">Status</option>
					<option value="completed">Completed</option>
					<option value="attempted">Attempted</option>
					<option value="to-do">To-Do</option>
				</select>
			</div>

			<div className="problem-list">
				{currentProblems.map((problem) => (
					<div
						key={problem.id}
						className="problem-item"
						onClick={() => navigate(`/problems/${problem.id}`)}
					>
						<div className="question-card-header">
							<h3>
								{problem.id}: {problem.title}
							</h3>
							<img
								className="question-status"
								src={
									getProblemStatus(problem.id, currUser) ===
									"completed"
										? "https://wallpapers.com/images/hd/green-check-mark-black-background-h4sar2aihe79iwgr-2.jpg"
										: getProblemStatus(
												problem.id,
												currUser
										  ) === "attempted"
										? "https://thumbs.dreamstime.com/b/red-black-grunge-brush-stroke-cross-no-decline-aggressive-vector-vintage-sign-curved-isolated-check-mark-object-dark-background-95414900.jpg"
										: "https://image.freepik.com/free-icon/minus-sign-in-a-square_318-53201.jpg"
								}
							></img>
						</div>
						<p>{problem.description}</p>
						<p>
							<strong>Difficulty:</strong>{" "}
							<span
								style={{
									color: getDifficultyColor(
										problem.difficulty
									),
								}}
							>
								{problem.difficulty}
							</span>
						</p>
						<p>
							<strong>Tags:</strong> {problem.tags.join(", ")}
						</p>
					</div>
				))}
			</div>

			<div className="pagination">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index}
						className={`page-button ${
							pageNo === index + 1 ? "active" : ""
						}`}
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
