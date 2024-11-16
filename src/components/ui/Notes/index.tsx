import { FC, useState } from "react";
import Draggable from "react-draggable";
import { useSpring, animated } from "react-spring";

import "./style.css";
import AppEditor from "../Editor";

const Notes: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDraggable, setIsDraggable] = useState(false);

	const animation = useSpring({
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? `scale(1)` : `scale(0.9)`,
		config: { tension: 300, friction: 20 },
	});

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		setIsOpen(false);
		setIsDraggable(false); // Reset draggable state on close
	};

	const toggleDraggable = () => setIsDraggable((prev) => !prev);

	return (
		<>
			<button onClick={openModal} className="open-button">
				Open Notes
			</button>

			{isOpen && (
				<Draggable disabled={!isDraggable} handle=".modal-header">
					<animated.div style={animation} className="modal-overlay">
						<div className="modal-content">
							<div className="modal-header">
								<h2>Draggable Notes</h2>
								<div>
									<button
										onClick={toggleDraggable}
										className="toggle-drag-button"
									>
										{isDraggable
											? "Disable Dragging"
											: "Enable Dragging"}
									</button>
									<button
										onClick={closeModal}
										className="close-button"
									>
										&times;
									</button>
								</div>
							</div>
							<div className="modal-body">
								<AppEditor />
							</div>
						</div>
					</animated.div>
				</Draggable>
			)}
		</>
	);
};

export default Notes;
