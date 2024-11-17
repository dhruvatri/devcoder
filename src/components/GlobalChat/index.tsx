import { useState, useRef, FormEvent } from "react";
import {
	collection,
	query,
	orderBy,
	limit,
	addDoc,
	serverTimestamp,
	FirestoreDataConverter,
	where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./style.css";
import { db, auth } from "../../utils/firebase";
import { useAuth } from "../../contexts/AuthProvider";
import { User } from "firebase/auth";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Editor } from "@tinymce/tinymce-react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FaTelegramPlane } from "react-icons/fa";

interface Message {
	id: string;
	text: string;
	createdAt: any;
	uid: string;
	photoURL: string | null;
	problemId: string;
}

const messageConverter: FirestoreDataConverter<Message> = {
	toFirestore(message: Message) {
		return {
			text: message.text,
			createdAt: message.createdAt,
			uid: message.uid,
			photoURL: message.photoURL,
			problemId: message.problemId,
		};
	},
	fromFirestore(snapshot, options) {
		const data = snapshot.data(options);
		return {
			id: snapshot.id,
			text: data.text,
			createdAt: data.createdAt,
			uid: data.uid,
			photoURL: data.photoURL,
			problemId: data.problemId,
		} as Message;
	},
};

function GlobalChat() {
	const { user } = useAuth();
	const { problemId } = useParams();
	const dummy = useRef<HTMLDivElement | null>(null);

	if (!problemId) {
		return <div>Error getting problemId</div>;
	}

	const messagesRef = collection(db, "messages").withConverter(
		messageConverter
	);

	const messagesQuery = query(
		messagesRef,
		where("problemId", "==", problemId),
		orderBy("createdAt", "asc"),
		limit(50)
	);

	const [messages, loading, error] = useCollectionData(messagesQuery);
	const [formValue, setFormValue] = useState<string>("");

	const sendMessage = async (e: FormEvent) => {
		e.preventDefault();
		if (!formValue.trim()) return;

		const { uid } = auth.currentUser!;

		try {
			await addDoc(messagesRef, {
				id: "",
				text: formValue.trim(),
				createdAt: serverTimestamp(),
				uid,
				photoURL: user?.photoURL || null,
				problemId,
			});

			setFormValue("");
			dummy.current?.scrollIntoView({ behavior: "smooth" });
		} catch (err) {
			console.error("Error sending message:", err);
		}
	};

	if (loading) {
		return <div>Loading messages...</div>;
	}

	if (error) {
		return <div>Error loading messages: {error.message}</div>;
	}

	return (
		<div className="chat-component">
			<div className="chat-messages">
				{messages ? (
					messages.length === 0 ? (
						<div>Start the conversation</div>
					) : (
						messages.map((msg) => (
							<ChatMessage
								key={msg.id}
								message={msg}
								user={user!}
							/>
						))
					)
				) : null}
				<div ref={dummy}></div>
			</div>
			<form onSubmit={sendMessage} className="chat-form">
				<Editor
					apiKey="9ebo80culi0cf3ymzrhkcr2hrrv6cqplma5bpvvilw7pr2tu"
					value={formValue}
					onEditorChange={(content) => setFormValue(content)}
					init={{
						height: 200,
						menubar: false,
						plugins: [
							"lists",
							"link",
							"image",
							"preview",
							"codesample",
						],
						toolbar:
							"undo redo | bold italic | bullist numlist | link image | preview",
						content_style:
							"body { font-family:Arial,sans-serif; font-size:14px }",
						skin: "oxide-dark",
						content_css: "dark",
						resize: false,
					}}
				/>
				<button
					type="submit"
					disabled={!formValue.trim()}
					className="chat-submit"
				>
					<FaTelegramPlane />
				</button>
			</form>
		</div>
	);
}

interface ChatMessageProps {
	message: Message;
	user: User;
}

function ChatMessage({ message, user }: ChatMessageProps) {
	const { text, uid, photoURL } = message;
	const isSentByCurrentUser = uid === auth.currentUser?.uid;
	const messageClass = isSentByCurrentUser ? "sent" : "received";

	return (
		<div className={`chat-message ${messageClass}`}>
			<div className="chat-header">
				<div
					style={{
						display: "flex",
						gap: "var(--spacing-md)",
						alignItems: "center",
						fontWeight: "var(--font-weight-medium)",
					}}
				>
					<img
						src={photoURL || "https://avatar.iran.liara.run/public"}
						alt="User Avatar"
						className="chat-avatar"
					/>
					<h3>{user.displayName || "User"}</h3>
				</div>
				<p className="time" style={{ marginBottom: "0" }}>
					{message.createdAt
						? new Date(
								message.createdAt.seconds * 1000
						  ).toLocaleString()
						: ""}
				</p>
			</div>
			<div className="chat-text">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					className="markdown"
				>
					{text}
				</ReactMarkdown>
			</div>
		</div>
	);
}

export default GlobalChat;
