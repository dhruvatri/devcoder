import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import { GlobalChat, ProblemPageComponent, UserDashBoard } from "./components";
import SelectRolePage from "./components/SelectRolePage";
import SignUpForm from "./components/SignUpForm";
import useAuthGuard from "./hooks/useAuthGuard";
import { Notes } from "./components/ui";
import LeaningPathDetails from "./components/LeaningPathDetails/LeaningPathDetails";
import LearningPathSeeAll from "./components/LearningPathSeeAll/LearningPathSeeAll";
import ProblemSet from "./components/ProblemSet/ProblemSet";
import { DataProvider } from "./contexts/DataContext";

const App: React.FC = () => {
	const { ProtectRoute } = useAuthGuard();

	return (
		<DataProvider>
			<Routes>
				<Route path="/" element={<Navigate to="/problemset" />} />
				<Route
					path="/problems/:problemId"
					element={<ProblemPageComponent />}
				>
					<Route index element={<Navigate to="description" />} />
					<Route path="description" element={<div>Hello</div>} />
					<Route path="notes" element={<Notes />} />
					<Route
						path="chat"
						element={
							<ProtectRoute>
								<GlobalChat />
							</ProtectRoute>
						}
					/>
				</Route>
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/u/:username" element={<UserDashBoard />} />
				<Route path="/select-role" element={<SelectRolePage />} />
				<Route path="/problemset" element={<ProblemSet />} />
				<Route path="/learning-path" element={<LearningPathSeeAll />} />
				<Route
					path="/learning-path/:id"
					element={<LeaningPathDetails />}
				/>
			</Routes>
		</DataProvider>
	);
};

export default App;
