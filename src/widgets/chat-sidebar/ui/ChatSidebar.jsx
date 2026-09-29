import { Button } from "../../../shared/ui";
import { CreateChatForm } from "../../../features/create-chat";
import "./ChatSidebar.css";
export function ChatSidebar({
  activeChatId,
  chats,
  credentials,
  onCreateChat,
  onDisconnect,
  onSelectChat,
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand__mark">M</span>
        <div>
          <strong>Messenger</strong>
          <small>GREEN-API · Telegram</small>
        </div>
      </div>
      <CreateChatForm onCreateChat={onCreateChat} />
      <nav className="chat-list" aria-label="Список чатов">
        {chats.map((chat) => (
          <button
            className={`chat-list__item ${chat.id === activeChatId ? "chat-list__item--active" : ""}`}
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            type="button"
          >
            <span>{chat.title}</span>
            <small>{chat.id}</small>
          </button>
        ))}
      </nav>
      <div className="instance-card">
        <span>Инстанс</span>
        <strong>#{credentials.idInstance}</strong>
        <Button variant="secondary" onClick={onDisconnect}>
          Сменить данные
        </Button>
      </div>
    </aside>
  );
}
