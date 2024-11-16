import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Login from "./components/Login/Login";
import SelectRolePage from "./components/SelectRolePage/SelectRolePage";
import { GlobalChat, UserDashBoard } from "./components";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<UserDashBoard />} />
				<Route path="/chat" element={<GlobalChat />} />
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/select-role" element={<SelectRolePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
