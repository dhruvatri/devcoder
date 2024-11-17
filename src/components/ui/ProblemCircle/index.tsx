import React, { useMemo, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import "./style.css";
import SolvedProblemList from "../SolvedProblemsList";
import { useUserSubmissions } from "../../../hooks/submissions/useUserSubmissions";
import { useAuth } from "../../../contexts/AuthProvider";

type ProblemStats = {
	easy: { solved: number; total: number };
	medium: { solved: number; total: number };
	hard: { solved: number; total: number };
	attempting: number;
};

type ProblemCircleProps = {
	stats: ProblemStats;
};

const renderActiveShape = (props: any) => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? "start" : "end";

	return (
		<g>
			<text
				x={cx}
				y={cy - 20}
				dy={8}
				textAnchor="middle"
				fill={fill}
				className="chart-center-text"
			>
				{payload.name}
			</text>
			<text
				x={cx}
				y={cy + 10}
				textAnchor="middle"
				fill={fill}
				className="chart-value-text"
			>
				{`${value}/${payload.total}`}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill="none"
			/>
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill={fill}
				className="chart-label"
			>
				{`Solved ${value}`}
			</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				fill={fill}
				className="chart-percentage"
			>
				{`(${(percent * 100).toFixed(1)}%)`}
			</text>
		</g>
	);
};

const ProblemCircle: React.FC<ProblemCircleProps> = () => {
	const { user } = useAuth();
	const [activeIndex, setActiveIndex] = useState(0);

	const { data: submissionData, isLoading } = useUserSubmissions(
		user?.uid || ""
	);

	const stats = useMemo(() => {
		if (isLoading || !submissionData) {
			return {
				easy: {
					solved: 0,
					total: 0,
					problems: [],
				},
				medium: {
					solved: 0,
					total: 0,
					problems: [],
				},
				hard: {
					solved: 0,
					total: 0,
					problems: [],
				},
				attempting: 0,
			};
		} else {
			console.log(submissionData);
			const easy = submissionData.filter(
				(problem) => problem.difficulty === "Easy"
			);
			const medium = submissionData.filter(
				(problem) => problem.difficulty === "Medium"
			);
			const hard = submissionData.filter(
				(problem) => problem.difficulty === "Hard"
			);
			return {
				easy: {
					solved: easy.filter(
						(problem) => problem.status === "completed"
					).length,
					total: easy.length,
					problems: easy,
				},
				medium: {
					solved: medium.filter(
						(problem) => problem.status === "completed"
					).length,
					total: medium.length,
					problems: medium,
				},
				hard: {
					solved: hard.filter(
						(problem) => problem.status === "completed"
					).length,
					total: hard.length,
					problems: hard,
				},
				attempting: submissionData.filter(
					(problem) => problem.status !== "completed"
				).length,
			};
		}
	}, [submissionData, isLoading]);

	const data = [
		{
			name: "Easy",
			value: stats.easy.solved,
			total: stats.easy.total,
			fill: "var(--color-dark-green-s)",
		},
		{
			name: "Medium",
			value: stats.medium.solved,
			total: stats.medium.total,
			fill: "var(--color-dark-yellow)",
		},
		{
			name: "Hard",
			value: stats.hard.solved,
			total: stats.hard.total,
			fill: "var(--color-dark-pink)",
		},
	];

	const totalSolved =
		stats.easy.solved + stats.medium.solved + stats.hard.solved;
	const totalProblems =
		stats.easy.total + stats.medium.total + stats.hard.total;

	console.log(stats);

	const onPieEnter = (_: any, index: number) => {
		setActiveIndex(index);
	};

	return (
		<div className="problem-circle-container">
			<div className="problem-circle-wrapper">
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							activeIndex={activeIndex}
							activeShape={renderActiveShape}
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={50}
							outerRadius={80}
							paddingAngle={2}
							dataKey="value"
							stroke="none"
							onMouseEnter={onPieEnter}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div className="difficulty-legend">
				<SolvedProblemList isLoading={isLoading} stats={stats} />
			</div>
		</div>
	);
};

export default ProblemCircle;
