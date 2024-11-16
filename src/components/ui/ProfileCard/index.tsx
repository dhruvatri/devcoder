import React from "react";
import "./style.css";

type ProfileCardProps = {
	profile: UserProfile;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
	return (
		<div className="profile-card">
			<div className="profile-header">
				<div className="profile-avatar"></div>
				<div className="profile-info">
					<h2>{profile.name}</h2>
					<p className="username">{profile.username}</p>
					<p className="rank">Rank {profile.rank.toLocaleString()}</p>
				</div>
			</div>
			<button className="edit-profile-btn">Edit Profile</button>
			<div className="github-info">
				<span className="github-icon">●</span>
				<span>Kingpin98k</span>
			</div>
		</div>
	);
};

export default ProfileCard;
