import React, { useState } from "react";
import "./style.css";

type Category = {
	count: number;
	problems: string[];
};

const SolvedProblemList: React.FC = () => {
	const [activeTab, setActiveTab] = useState<
		"SCHOOL" | "BASIC" | "EASY" | "MEDIUM" | "HARD"
	>("MEDIUM");

	const categories: Record<string, Category> = {
		SCHOOL: {
			count: 1,
			problems: [
				"Binary Tree to DLL",
				"Max rectangle",
				"Alien Dictionary",
				"Merge Without Extra Space",
				"Word Ladder I",
			],
		},
		BASIC: {
			count: 13,
			problems: [
				"Binary Tree to DLL",
				"Max rectangle",
				"Alien Dictionary",
				"Merge Without Extra Space",
				"Word Ladder I",
			],
		},
		EASY: {
			count: 139,
			problems: [
				"Binary Tree to DLL",
				"Max rectangle",
				"Alien Dictionary",
				"Merge Without Extra Space",
				"Word Ladder I",
			],
		},
		MEDIUM: {
			count: 219,
			problems: [
				"Min distance between two given nodes of a Binary Tree",
				"LRU Cache",
				"Fixing Two nodes of a BST",
				"Histogram Max Rectangular Area",
				"Stock Buy and Sell – Multiple Transaction Allowed",
			],
		},
		HARD: {
			count: 28,
			problems: [
				"Binary Tree to DLL",
				"Max rectangle",
				"Alien Dictionary",
				"Merge Without Extra Space",
				"Word Ladder I",
			],
		},
	};

	return (
		<div className="problem-list-container">
			{/* Tab Navigation */}
			<div className="tab-navigation">
				{Object.entries(categories).map(([category, { count }]) => (
					<button
						key={category}
						onClick={() =>
							setActiveTab(
								category as
									| "SCHOOL"
									| "BASIC"
									| "EASY"
									| "MEDIUM"
									| "HARD"
							)
						}
						className={`tab-button ${
							activeTab === category ? "active" : ""
						}`}
					>
						{category} ({count})
					</button>
				))}
			</div>

			{/* Problem List */}
			<div className="problem-list">
				<ul>
					{categories[activeTab].problems.map((problem, index) => (
						<li
							key={index}
							className="problem-item"
							style={{
								listStyle: "none",
								marginBottom: 0,
								height: "4rem",
							}}
						>
							<p
								className="problem-link"
								style={{ color: "white" }}
							>
								{problem}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SolvedProblemList;
