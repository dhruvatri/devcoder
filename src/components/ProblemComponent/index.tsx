import "./style.css";
import { NavLink, Outlet, useParams } from "react-router-dom";

const ProblemComponent = () => {
	const id = useParams();
	console.log(id);
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
							to="description"
							className={({ isActive }) =>
								isActive ? "active-link" : "link"
							}
							replace
						>
							Description
						</NavLink>
					</li>
					<li>
						<NavLink
							to="notes"
							className={({ isActive }) =>
								isActive ? "active-link" : "link"
							}
							replace
						>
							Notes
						</NavLink>
					</li>
					<li>
						<NavLink
							to="chat"
							className={({ isActive }) =>
								isActive ? "active-link" : "link"
							}
							replace
						>
							Chat
						</NavLink>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

export default ProblemComponent;
