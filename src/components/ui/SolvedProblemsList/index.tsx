import { useMemo, useState } from "react";
/* eslint-disable */
import styles from "./style.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { link } from "framer-motion/client";

type SolvedProblemListProps = {
	isLoading: boolean;
	stats: any;
};

type Category = {
	count: number;
	problems: string[];
};

const SolvedProblemList = ({ isLoading, stats }: SolvedProblemListProps) => {
	const [activeTab, setActiveTab] = useState<"EASY" | "MEDIUM" | "HARD">(
		"MEDIUM"
	);

	const categories: Record<string, Category> = useMemo(() => {
		if (isLoading || !stats) {
			return {
				EASY: { count: 0, problems: [] },
				MEDIUM: { count: 0, problems: [] },
				HARD: { count: 0, problems: [] },
			};
		}
		return {
			EASY: {
				count: stats.easy.solved,
				problems: stats.easy.problems.map(
					(problem: any) => problem.problemTitle
				),
			},
			MEDIUM: {
				count: stats.medium.solved,
				problems: stats.medium.problems.map(
					(problem: any) => problem.problemTitle
				),
			},
			HARD: {
				count: stats.hard.solved,
				problems: stats.hard.problems.map(
					(problem: any) => problem.problemTitle
				),
			},
		};
	}, [stats, isLoading]);

	return (
		<div className={styles.problemListContainer}>
			{/* Tab Navigation */}
			<div className={styles.tabNavigation}>
				{Object.entries(categories).map(([category, { count }]) => (
					<button
						key={category}
						onClick={() =>
							setActiveTab(category as "EASY" | "MEDIUM" | "HARD")
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
			<div className={styles.problemList}>
				{isLoading ? (
					<Skeleton
						count={3}
						height={100}
						baseColor="var(--color-dark-fill-2)"
						highlightColor="var(--color-dark-fill-3)"
					/>
				) : (
					<ul>
						{categories[activeTab].problems.map(
							(problem, index) => (
								<li
									key={index}
									className={styles.problemItem}
									style={{
										listStyle: "none",
										marginBottom: 0,
										height: "4rem",
									}}
								>
									<p
										className={styles.problemLink}
										style={{ color: "white" }}
									>
										{problem}
									</p>
								</li>
							)
						)}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SolvedProblemList;
