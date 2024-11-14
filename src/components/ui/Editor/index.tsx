// AppEditor.tsx
import React, { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";

const AppEditor: FC = () => {
	return (
		<Editor
			apiKey="9ebo80culi0cf3ymzrhkcr2hrrv6cqplma5bpvvilw7pr2tu"
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
				height: 300,
			}}
		/>
	);
};

export default AppEditor;
