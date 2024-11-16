import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { GlobalChat, UserDashBoard } from "./components";
import SelectRolePage from "./components/SelectRolePage";
import SignUpForm from "./components/SignUpForm";
import CodeEditorComponent from "./components/CodeEditorComponent";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CodeEditorComponent />} />
				<Route path="/chat" element={<GlobalChat />} />
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/select-role" element={<SelectRolePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
