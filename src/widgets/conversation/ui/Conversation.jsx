import { ChatInfo } from "../../../entities/chat";
import { MessageBubble } from "../../../entities/message";
import { MessageComposer } from "../../../features/send-message";
import "./Conversation.css";
export function Conversation({ chat, messages, onOpenChats, onSendMessage }) {
  return (
    <section className="chat-area">
      <ChatInfo chat={chat} onOpenChats={onOpenChats} />
      <div className="messages" aria-live="polite">
        {messages.length ? (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        ) : (
          <div className="messages__empty">
            Начните диалог
          </div>
        )}
      </div>
      <MessageComposer onSend={onSendMessage} />
    </section>
  );
}
