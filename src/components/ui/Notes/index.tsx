import { FC, useState } from "react";
import Draggable from "react-draggable";
import { useSpring, animated } from "react-spring";

import "./style.css";
import AppEditor from "../Editor";

const Notes: FC = () => {
	const [isDraggable] = useState(false);

	const animation = useSpring({
		config: { tension: 300, friction: 20 },
	});

	// const toggleDraggable = () => setIsDraggable((prev) => !prev);

	return (
		<>
			<Draggable disabled={!isDraggable}>
				<animated.div style={animation}>
					<AppEditor />
				</animated.div>
			</Draggable>
		</>
	);
};

export default Notes;
