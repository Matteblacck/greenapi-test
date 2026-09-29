import { useCallback, useMemo, useState } from "react";
import { ChatPage } from "../pages/chat";
import { CredentialsPage } from "../pages/credentials";
import { createGreenApiClient } from "../shared/api/green-api";
import {
  clearCredentials,
  loadCredentials,
  saveCredentials,
} from "../shared/lib/credentials-storage";
import { useNotificationPolling } from "../features/receive-message";

export function App() {
  const [credentials, setCredentials] = useState(loadCredentials);
  const [messagesByChat, setMessagesByChat] = useState({});
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const client = useMemo(
    () => credentials && createGreenApiClient(credentials),
    [credentials],
  );

  const appendMessage = useCallback((chatId, message) => {
    setChats((current) => {
      const knownChat = current.find((chat) => chat.id === chatId);

      if (knownChat) {
        if (knownChat.title !== knownChat.id || !message.chatTitle) {
          return current;
        }

        return current.map((chat) =>
          chat.id === chatId ? { ...chat, title: message.chatTitle } : chat,
        );
      }

      return [...current, { id: chatId, title: message.chatTitle ?? chatId }];
    });

    setMessagesByChat((current) => ({
      ...current,
      [chatId]: [...(current[chatId] ?? []), message],
    }));
  }, []);

  useNotificationPolling({
    client,
    onMessage: appendMessage,
  });

  const connect = (nextCredentials) => {
    saveCredentials(nextCredentials);
    setCredentials(nextCredentials);
  };

  const createChat = (chat) => {
    setChats((current) => {
      if (current.some((item) => item.id === chat.id)) return current;
      return [...current, chat];
    });
    setActiveChat(chat);
    setMessagesByChat((current) => ({
      ...current,
      [chat.id]: current[chat.id] ?? [],
    }));
  };

  const sendMessage = async (text) => {
    if (!client || !activeChat) return;
    const response = await client.sendMessage(activeChat.id, text);
    appendMessage(activeChat.id, {
      id: response.idMessage ?? crypto.randomUUID(),
      text,
      direction: "outgoing",
      createdAt: new Date(),
    });
  };

  if (!credentials) return <CredentialsPage onConnect={connect} />;

  return (
    <ChatPage
      activeChat={activeChat}
      chats={chats}
      credentials={credentials}
      messages={activeChat ? (messagesByChat[activeChat.id] ?? []) : []}
      onCreateChat={createChat}
      onSelectChat={setActiveChat}
      onDisconnect={() => {
        clearCredentials();
        setCredentials(null);
      }}
      onSendMessage={sendMessage}
    />
  );
}
