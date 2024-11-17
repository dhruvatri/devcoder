import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [showModal, setShowModal] = useState<boolean>(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log("Login Success");
			navigate("/problemset");
			/* eslint-disable-next-line */
		} catch (error: any) {
			console.error("Error:", error.message);
			setError(
				"Your password may be incorrect or if you are a new user, please register."
			);
			setShowModal(true);

			setTimeout(() => {
				setShowModal(false);
				setError("");
			}, 2000);
		}
	};

	return (
		<div className="login-page">
			<header className="login-header">
				<h1>Welcome To Code Editor</h1>
			</header>
			<div className="login-container">
				<div className="login-form-container">
					<form className="login-form" onSubmit={handleSubmit}>
						<h2>Login</h2>
						<label htmlFor="email">
							Email:
							<input
								type="text"
								id="email"
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>
						<label htmlFor="password">
							Password:
							<input
								type="password"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
						<button type="submit">Login</button>
						<p>
							Don't Have Account?{" "}
							<Link to="/signup">Register</Link>
						</p>
					</form>
				</div>
			</div>
			{showModal && (
				<div className="modal-overlay active">
					<div className="modal-content">
						<p>{error}</p>
						<span
							className="modal-close"
							onClick={() => setShowModal(false)}
						>
							&times;
						</span>
					</div>
				</div>
			)}
			<footer className="login-footer">
				<p>&copy; 2023 Code Editor. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default Login;
