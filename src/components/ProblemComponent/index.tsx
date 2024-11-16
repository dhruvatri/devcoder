import React from "react";
import "./style.css";
import { Navigate, NavLink, Route, Routes, useParams } from 'react-router-dom';
import ProblemDescriptionComponent from "../ProblemDescriptionComponent";
import GlobalChat from '../GlobalChat/index';
import { Notes } from "../ui";


const ProblemComponent = () => {
	const id: string = useParams();
	// const id:string = "1";

	return (
		// <div className='problem'>
		//   {parse(ProblemSet[pid-1].title)}
		//   {parse(ProblemSet[pid-1].description)}
		// </div>
		<div className="problem">
			<nav>
				<ul>
					<li>
						<NavLink 
							to="/description"
							className={({ isActive }) => (isActive ? "active-link" : "link")}>
							Description
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/notes"
							className={({ isActive }) => (isActive ? "active-link" : "link")}>
							Notes
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/chat"
							className={({ isActive }) => (isActive ? "active-link" : "link")}>
							Chat
						</NavLink>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/description" replace={true} />}
				/>
				<Route
					path="/description"
					Component={ProblemDescriptionComponent}
				/>
				<Route
					path="/chat"
					Component={GlobalChat}
				/>
				<Route
					path="/notes"
					Component={Notes}
				/>
			</Routes>
		</div>
	);
};

export default ProblemComponent;
