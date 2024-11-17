import { FC, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";

const AppEditor: FC = () => {
	const [editorContent, setEditorContent] = useState<string>("");

	const { problemId } = useParams();

	useEffect(() => {
		const savedContent = localStorage.getItem(`${problemId}_notes`);
		if (savedContent) {
			setEditorContent(savedContent);
		}
	}, []);

	const handleEditorChange = (content: string) => {
		setEditorContent(content);
		localStorage.setItem(`${problemId}_notes`, content);
	};

	return (
		<Editor
			apiKey="9ebo80culi0cf3ymzrhkcr2hrrv6cqplma5bpvvilw7pr2tu"
			value={editorContent}
			init={{
				plugins: [
					"anchor",
					"autolink",
					"charmap",
					"codesample",
					"emoticons",
					"image",
					"link",
					"lists",
					"media",
					"searchreplace",
					"table",
					"visualblocks",
					"wordcount",
				],
				toolbar:
					"undo redo | bold italic underline strikethrough | link image media table",
				placeholder: "Type Here...(Markdown Supported)",
				height: "38rem",
				width: "100%",
				skin: "oxide-dark",
				content_css: "dark",
				resize: false,
			}}
			onEditorChange={handleEditorChange}
		/>
	);
};

export default AppEditor;
