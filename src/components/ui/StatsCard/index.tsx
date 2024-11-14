import React from "react";
import "./style.css";

type StatsCardProps = {
	contestRating: number;
	globalRanking: number;
	totalParticipants: number;
	attended: number;
};

const StatsCard: React.FC<StatsCardProps> = ({
	contestRating,
	globalRanking,
	totalParticipants,
	attended,
}) => {
	return (
		<div className="stats-card">
			<div className="stats-grid">
				<div className="stat-item">
					<h3>Contest Rating</h3>
					<p className="rating">{contestRating}</p>
				</div>
				<div className="stat-item">
					<h3>Global Ranking</h3>
					<p>
						{globalRanking.toLocaleString()} /{" "}
						{totalParticipants.toLocaleString()}
					</p>
				</div>
				<div className="stat-item">
					<h3>Attended</h3>
					<p>{attended}</p>
				</div>
			</div>
			<div className="rating-graph">{/* Rating graph implementation */}</div>
		</div>
	);
};

export default StatsCard;
