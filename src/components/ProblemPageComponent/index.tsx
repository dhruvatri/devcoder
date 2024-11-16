import Split from "react-split";
import CodeEditorComponent from "../CodeEditorComponent";
import "./style.css";
import ProblemComponent from "../ProblemComponent";
import { Outdent } from "lucide-react";
import { Outlet } from "react-router-dom";

const ProblemPageComponent = () => {
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
