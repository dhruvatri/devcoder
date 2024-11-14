import Split from "react-split";
import CodeEditorComponent from "../CodeEditorComponent";
import "./style.css";
import ProblemComponent from "../ProblemComponent";

const ProblemPageComponent = () => {
	return (
		<Split className="split-col" minSize={0}>
			<ProblemComponent pid={1} />
			{/* <CodeEditorComponent /> */}
			<CodeEditorComponent />
		</Split>
	);
};

export default ProblemPageComponent;
