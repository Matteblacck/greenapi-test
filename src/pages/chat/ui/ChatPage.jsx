import { useState } from "react";
import { ChatSidebar } from "../../../widgets/chat-sidebar";
import { Conversation } from "../../../widgets/conversation";
export function ChatPage(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    activeChat,
    chats,
    credentials,
    messages,
    onCreateChat,
    onDisconnect,
    onSendMessage,
    onSelectChat,
  } = props;
  const createChat = (chat) => {
    onCreateChat(chat);
    setIsSidebarOpen(false);
  };

  const selectChat = (chat) => {
    onSelectChat(chat);
    setIsSidebarOpen(false);
  };

  return (
    <main className="app-shell">
      <div
        className={`chat-layout ${isSidebarOpen ? "chat-layout--sidebar-open" : ""}`}
      >
        <ChatSidebar
          activeChatId={activeChat?.id}
          chats={chats}
          credentials={credentials}
          onCreateChat={createChat}
          onDisconnect={onDisconnect}
          onSelectChat={selectChat}
        />
        {activeChat ? (
          <Conversation
            chat={activeChat}
            messages={messages}
            onOpenChats={() => setIsSidebarOpen(true)}
            onSendMessage={onSendMessage}
          />
        ) : (
          <section className="empty-chat">
            <div>
              <div className="empty-chat__icon">✦</div>
              <strong>Создайте новый чат</strong>
              <p>Напишите сообщение</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
