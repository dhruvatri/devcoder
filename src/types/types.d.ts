type UserProfile = {
	name: string;
	username: string;
	rank: number;
	contestRating: number;
	globalRanking: number;
	attended: number;
	topPercentage: number;
};

type ProblemStats = {
	easy: { solved: number; total: number };
	medium: { solved: number; total: number };
	hard: { solved: number; total: number };
	attempting: number;
};

type CommunityStats = {
	views: number;
	solutions: number;
	discuss: number;
	reputation: number;
	lastWeek: {
		views: number;
		solutions: number;
		discuss: number;
		reputation: number;
	};
};

type Badge = {
	name: string;
	image: string;
};
