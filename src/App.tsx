import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import { GlobalChat, ProblemPageComponent, UserDashBoard } from "./components";
import SelectRolePage from "./components/SelectRolePage";
import SignUpForm from "./components/SignUpForm";
import useAuthGuard from "./hooks/useAuthGuard";
import { Notes } from "./components/ui";

const App: React.FC = () => {
	const { ProtectRoute } = useAuthGuard();

	return (
		<Routes>
			<Route
				path="/problems/:problem_id"
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
		</Routes>
	);
};

export default App;
