import { CodeiumEditor } from "@codeium/react-code-editor";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import Split from "react-split";
import { runnerUrl } from "../../apis";

const CodeEditorComponent = () => {
	const [language, setLanguage] = useState<string>("python");
	const [value, setValue] = useState("");
	const editorRef = useRef<typeof CodeiumEditor | null>(null);
	const [output, setOutput] = useState("");
	const [supports, setSupports] = useState<runtime[]>([]);

	const [input , setInput] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await runnerUrl.get("/runtimes");
			console.log(response.data);

			setSupports(response.data);
		};

		fetchData();
	}, []);

	const languageOptions = Array.from(
		new Set(
			supports
				.filter((runtime: runtime) =>
					["python", "javascript", "java", "c", "c++"].includes(
						runtime.language
					)
				)
				.map((runtime: runtime) => runtime.language)
		)
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

	const fetchResponse = async (stdin:string) => {
		const response = await runnerUrl.post("/execute", {
			language: language,
			version: versionOptions[language],
			files: [
				{
					content: value,
				},
			],

			stdin: stdin,
		});

		return response.data;
	}

	const handleRun = async () => {
		const response = await fetchResponse(input);
		console.log(response);

		setOutput(response.run.output);
	};

	const handleSubmit = async () => {
		
	};

	return (
		<Split className="split-row code-editor" direction="vertical">
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
				<button className="submit-button" onClick={handleSubmit}>
					Submit
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
			<Split className="split-col">
				<div className="input">
					<div className="input-header">
						<h2>Input</h2>
					</div>
				<textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Enter input here..."
					style={{ width: "100%" }}
				/>
				</div>
				<div className="output">
					<div className="output-header">
						<h2>Output</h2>
						<button onClick={() => setOutput("")}>Clear</button>
					</div>
					{<pre>{output}</pre>}
				</div>
			</Split>
		</Split>
	);
};

export default CodeEditorComponent;
