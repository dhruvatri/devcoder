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

type AuthContextType = {
	currentUser: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	isLoading: boolean;
};

type Message = {
	id: string;
	text: string;
	createdAt: { seconds: number; nanoseconds: number } | null;
	uid: string;
	photoURL: string | null;
	problemId: string;
};

type runtime = {
	language: string;
	version: string;
	aliases: string[];
};

interface Problem {
	id: number;
	title: string;
	description: string;
	difficulty: "Easy" | "Medium" | "Hard"; // Use union type for predefined difficulty levels
	tags: string[];
	solution: string;
	example: string;
	testCases: TestCase[];
	constraints?: string;
}
