import { CodeiumEditor } from "@codeium/react-code-editor";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import Split from "react-split";
import axios from "axios";

type runtime = {
	language: string;
	version: string;
	aliases: string[];
};

const runnerUrl = axios.create({
	baseURL: "https://emkc.org/api/v2/piston",
});

const CodeEditorComponent = () => {
	const [language, setLanguage] = useState<string>("python");
	const [value, setValue] = useState("");
	const editorRef = useRef<typeof CodeiumEditor | null>(null);
	const [output, setOutput] = useState("");
	const [supports, setSupports] = useState<runtime[]>([]);

	const [input] = useState("1\n2\n");

	useEffect(() => {
		const fetchData = async () => {
			const response = await runnerUrl.get("/runtimes");
			console.log(response.data);

			setSupports(response.data);
		};

		fetchData();
	}, []);

	const languageOptions = supports.map(
		(runtime: runtime) => runtime.language
	);

	const versionOptions: { [key: string]: string } = supports.reduce(
		(acc: any, runtime: runtime) => {
			acc[runtime.language] = runtime.version;
			return acc;
		},
		{}
	);

	useEffect(() => {
		if (editorRef.current) {
			// Perform any actions with the editor reference here
		}
	}, [editorRef.current]);

	const onMount = (editor: any) => {
		editorRef.current = editor;
		editor.setValue(value);
		setValue(value);
		editor.focus();
	};

	const handleRun = async () => {
		const response = await runnerUrl.post("/execute", {
			language: language,
			version: versionOptions[language],
			files: [
				{
					content: value,
				},
			],

			stdin: input,
		});

		console.log(response.data);

		setOutput(response.data.run.output);
	};

	return (
		<Split className="split-row" direction="vertical">
			<nav className="navbar">
				<select
					value={language}
					onChange={(e) => {
						setLanguage(e.target.value);
						setValue("");
					}}
				>
					{languageOptions.map((language) => (
						<option key={language} value={language}>
							{language}
						</option>
					))}
				</select>
				<button className="run-button" onClick={handleRun}>
					Run
				</button>
			</nav>
			<div className="CodeEditor">
				<CodeiumEditor
					language={language}
					value={value}
					onChange={(val: string | undefined) => {
						setValue(val || "");
					}}
					theme="vs-dark"
					height={"100%"}
					width={"100%"}
					onMount={onMount}
				/>
			</div>
			<div className="output">
				<div className="output-header">
					<h2>Output</h2>
					<button onClick={() => setOutput("")}>Clear</button>
				</div>
				{output && <pre>{output}</pre>}
			</div>
		</Split>
	);
};

export default CodeEditorComponent;
