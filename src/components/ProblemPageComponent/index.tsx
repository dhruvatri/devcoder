import Split from "react-split";
import CodeEditorComponent from "../CodeEditorComponent";
import "./style.css";
import ProblemComponent from "../ProblemComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProblemPageComponent = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const handlePopState = () => {
			navigate(-2);
		};

		window.addEventListener("popstate", handlePopState);
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [navigate]);

	return (
		<div className="problem-page">
			<Split className="split-col" minSize={0}>
				<ProblemComponent />
				{/* <CodeEditorComponent /> */}
				<CodeEditorComponent />
			</Split>
		</div>
	);
};

export default ProblemPageComponent;
