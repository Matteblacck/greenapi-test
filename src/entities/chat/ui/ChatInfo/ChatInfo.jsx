import { Avatar } from "../../../../shared/ui";
import "./ChatInfo.css";
export function ChatInfo({ chat, onOpenChats }) {
  return (
    <header className="chat-info">
      <button
        aria-label="Открыть список чатов"
        className="chat-info__back"
        onClick={onOpenChats}
        type="button"
      >
        ←
      </button>
      <Avatar name={chat.title} />
      <div>
        <strong>{chat.title}</strong>
        <span>Telegram · GREEN-API</span>
      </div>
    </header>
  );
}
