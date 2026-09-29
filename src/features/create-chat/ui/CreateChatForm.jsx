import { useState } from "react";
import { Button, TextField } from "../../../shared/ui";
import { createChatFromRecipient } from "../../../entities/chat";
import "./CreateChatForm.css";
export function CreateChatForm({ onCreateChat }) {
  const [recipient, setRecipient] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!recipient.trim()) return;
    onCreateChat(createChatFromRecipient(recipient));
    setRecipient("");
  };
  return (
    <form className="create-chat" onSubmit={submit}>
      <TextField
        label="Новый чат"
        placeholder="Номер или Chat ID"
        value={recipient}
        onChange={(event) => setRecipient(event.target.value)}
      />
      <Button type="submit">Создать чат</Button>
      <p>
        Используйте Chat ID из GREEN-API или номер в формате, который
        поддерживает ваш инстанс.
      </p>
    </form>
  );
}
