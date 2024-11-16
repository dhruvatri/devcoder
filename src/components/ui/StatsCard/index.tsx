import React from "react";
import "./style.css";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

type StatsCardProps = {
	contestRating: number;
	globalRanking: number;
	totalParticipants: number;
	attended: number;
	rating?: number;
};

const barChartData = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

const lineChartData = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

const StatsCard: React.FC<StatsCardProps> = ({
	contestRating,
	globalRanking,
	totalParticipants,
	attended,
	rating = 23.05,
}) => {
	return (
		<div className="stats-card">
			<div className="stats-grid">
				<div className="stats">
					<div className="stat-item">
						<h3>Contest Rating</h3>
						<p
							className="rating"
							style={{
								fontSize: "var(--font-size-xxl)",
								fontWeight: "var(--font-weight-regular)",
							}}
						>
							{contestRating}
						</p>
					</div>
					<div className="stat-item">
						<h3>Global Ranking</h3>
						<p>
							{globalRanking.toLocaleString()} /{" "}
							<span style={{ color: "var(--color-dark-gray-6)" }}>
								{totalParticipants.toLocaleString()}
							</span>
						</p>
					</div>
					<div className="stat-item">
						<h3>Attended</h3>
						<p>{attended}</p>
					</div>
				</div>
				<div className="responsive-chart-container">
					<ResponsiveContainer width={"100%"} height={"100%"}>
						<LineChart
							width={300}
							height={100}
							data={lineChartData}
						>
							<Line
								type="monotone"
								dataKey="pv"
								stroke="var(--color-brand-orange)"
								strokeWidth={1}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
			<div className="seperator"></div>
			<div className="rating-graph">
				<div className="rating-info">
					<h3>Top</h3>
					<p>{rating}%</p>
				</div>
				<div className="rating-chart">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart width={150} height={40} data={barChartData}>
							<Bar dataKey="uv" fill="var(--color-dark-fill-3)" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default StatsCard;
