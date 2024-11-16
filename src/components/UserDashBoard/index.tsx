import React from "react";
import "./style.css";
import { Notes, ProblemCircle, ProfileCard, StatsCard } from "../ui";
import { mockProblemStats } from "../../data";
import ActivityCalendar from "../ui/ActivityCalendarComponent";

const UserDashBoard: React.FC = () => {
	const userProfile = {
		name: "Aditya",
		username: "AllStar98k",
		rank: 655582,
		contestRating: 1598,
		globalRanking: 140644,
		attended: 4,
		topPercentage: 23.05,
	};

	return (
		<div className="dashboard-container">
			<div className="dashboard-grid">
				<div className="left-column">
					<ProfileCard profile={userProfile} />
					<div className="community-stats mt-md">
						{/* Community stats implementation */}
					</div>
				</div>
				<div className="main-content">
					<StatsCard
						contestRating={userProfile.contestRating}
						globalRanking={userProfile.globalRanking}
						totalParticipants={622576}
						attended={userProfile.attended}
					/>
					<ActivityCalendar />
					<ProblemCircle stats={mockProblemStats} />
				</div>
			</div>
		</div>
	);
};

export default UserDashBoard;
