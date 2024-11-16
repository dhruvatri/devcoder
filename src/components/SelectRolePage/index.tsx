import React, { useState, useEffect } from "react";
import { auth, db } from "../../utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserGraduate, FaPencilRuler } from "react-icons/fa";
import { Code } from "lucide-react";
import "./style.css";

const SelectRolePage = () => {
	const [selectedRole, setSelectedRole] = useState("");
	const [modalMessage, setModalMessage] = useState("");
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const checkRole = async () => {
			const user = auth.currentUser;
			if (!user) {
				navigate("/login");
				return;
			}

			const userDoc = doc(db, "users", user.uid);
			const userSnapshot = await getDoc(userDoc);

			if (userSnapshot.exists()) {
				const userData = userSnapshot.data();
				if (userData.role) {
					if (userData.role === "Student") {
						navigate("/dashboard");
					} else if (userData.role === "Creator") {
						setModalMessage(
							"Thanks for registering as Creator. Please wait for admin approval."
						);
						setShowModal(true);
					}
				}
			}
		};

		checkRole();
	}, [navigate]);

	const handleRoleSelection = async (role: string) => {
		setSelectedRole(role);
		const user = auth.currentUser;
		if (user) {
			const userDoc = doc(db, "users", user.uid);
			await updateDoc(userDoc, { role: role });

			if (role === "Student") {
				setModalMessage(
					"Successfully registered as Student! Redirecting to login..."
				);
			} else if (role === "Creator") {
				setModalMessage(
					"Thanks for registering as Creator. Please wait for admin approval."
				);
			}
			setShowModal(true);
			setTimeout(() => {
				setShowModal(false);
				navigate("/login");
			}, 2000);
		}
	};

	return (
		<div className="select-role-page">
			<motion.div
				className="role-selection-container"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="code-editor-header">
					<Code className="code-icon" />
					<h1>Code Editor</h1>
				</div>
				<h2 className="choose-path">Choose Your Path</h2>
				<div className="role-cards">
					<motion.div
						className={`role-card ${
							selectedRole === "Student" ? "selected" : ""
						}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => handleRoleSelection("Student")}
					>
						<FaUserGraduate className="role-icon" />
						<h2>Student</h2>
						<p>Learn and grow with our courses</p>
					</motion.div>
					<motion.div
						className={`role-card ${
							selectedRole === "Creator" ? "selected" : ""
						}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => handleRoleSelection("Creator")}
					>
						<FaPencilRuler className="role-icon" />
						<h2>Creator</h2>
						<p>Share your knowledge and create courses</p>
					</motion.div>
				</div>
			</motion.div>

			{showModal && (
				<motion.div
					className="modal-overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className={`modal-content ${
							selectedRole === "Student" ? "success" : "warning"
						}`}
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						<p>{modalMessage}</p>
					</motion.div>
				</motion.div>
			)}
		</div>
	);
};

export default SelectRolePage;
