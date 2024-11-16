import { useState, useRef, useEffect, FormEvent } from "react";
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
import ReactMarkdown from "react-markdown";
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
	const [isAtBottom, setIsAtBottom] = useState(true);
	const [hasNewMessages, setHasNewMessages] = useState(false);
	const messagesRef = collection(db, "messages").withConverter(
		messageConverter
	);
	const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(50));
	const [messages] = useCollectionData(messagesQuery);
	const [formValue, setFormValue] = useState<string>("");
	const lastMessageCount = useRef(messages?.length || 0);

	useEffect(() => {
		if (messages?.length !== lastMessageCount.current) {
			if (!isAtBottom) {
				setHasNewMessages(true);
			}
			lastMessageCount.current = messages?.length || 0;
		}

		if (isAtBottom) {
			dummy.current?.scrollIntoView({ behavior: "smooth" });
			setHasNewMessages(false);
		}
	}, [messages, isAtBottom]);

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
	};

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const element = e.currentTarget;
		const atBottom =
			element.scrollHeight - element.scrollTop === element.clientHeight;
		setIsAtBottom(atBottom);
		if (atBottom) {
			setHasNewMessages(false);
		}
	};

	const scrollToBottom = () => {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
		setIsAtBottom(true);
		setHasNewMessages(false);
	};

	return (
		<div className="container chat-room">
			<div className="chat-messages" onScroll={handleScroll}>
				{messages &&
					messages.map((msg) => (
						<ChatMessage key={msg.id} message={msg} />
					))}
				<div ref={dummy}></div>
				{!isAtBottom && (
					<button
						onClick={scrollToBottom}
						className={`scroll-to-bottom ${
							hasNewMessages ? "has-new" : ""
						}`}
					>
						⬇️
					</button>
				)}
			</div>
			<form onSubmit={sendMessage} className="chat-form">
				<textarea
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
					placeholder="Type your message here... (Markdown supported)"
					className="chat-input"
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							if (formValue.trim()) {
								sendMessage(e);
							}
						}
					}}
				/>
				<button
					type="submit"
					disabled={!formValue.trim()}
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

	const avatarContent = photoURL ? (
		<img src={photoURL} alt="User Avatar" className="chat-avatar" />
	) : (
		<div className="avatar-placeholder">
			{auth.currentUser?.displayName?.[0].toUpperCase() || "U"}
		</div>
	);

	return (
		<div className={`chat-message ${messageClass}`}>
			<div className="message-content">
				<ReactMarkdown className="chat-text">{text}</ReactMarkdown>
				<div className="message-avatar">{avatarContent}</div>
			</div>
		</div>
	);
}

export default GlobalChat;
