import { useState, useRef, FormEvent } from "react";
import {
	collection,
	query,
	orderBy,
	limit,
	addDoc,
	serverTimestamp,
	FirestoreDataConverter,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./style.css";
import { db, auth } from "../../utils/firebase";

const messageConverter: FirestoreDataConverter<Message> = {
	toFirestore(message: Message) {
		return {
			text: message.text,
			createdAt: message.createdAt,
			uid: message.uid,
			photoURL: message.photoURL,
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
		} as Message;
	},
};

function GlobalChat() {
	const dummy = useRef<HTMLDivElement | null>(null);
	const messagesRef = collection(db, "messages").withConverter(
		messageConverter
	);
	const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(50));
	const [messages] = useCollectionData(messagesQuery);
	const [formValue, setFormValue] = useState<string>("");

	const sendMessage = async (e: FormEvent) => {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser!;

		await addDoc(messagesRef, {
			id: serverTimestamp().toString(),
			text: formValue,
			createdAt: serverTimestamp(),
			uid,
			photoURL,
		});

		setFormValue("");
		dummy.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="container chat-room">
			<div className="chat-messages">
				{messages &&
					messages.map((msg) => (
						<ChatMessage key={msg.id} message={msg} />
					))}
				<div ref={dummy}></div>
			</div>
			<form onSubmit={sendMessage} className="chat-form">
				<input
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
					placeholder="Type your message here..."
					className="chat-input"
				/>
				<button
					type="submit"
					disabled={!formValue}
					className="chat-submit"
				>
					Send
				</button>
			</form>
		</div>
	);
}

interface ChatMessageProps {
	message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
	const { text, uid, photoURL } = message;
	const isSentByCurrentUser = uid === auth.currentUser?.uid;

	console.log(auth.currentUser);

	const messageClass = isSentByCurrentUser ? "sent" : "received";

	return (
		<div className={`chat-message ${messageClass}`}>
			<img
				src={
					photoURL ||
					"https://api.adorable.io/avatars/50/anonymous.png"
				}
				alt="User Avatar"
				className="chat-avatar"
			/>
			<p className="chat-text">{text}</p>
		</div>
	);
}

export default GlobalChat;
