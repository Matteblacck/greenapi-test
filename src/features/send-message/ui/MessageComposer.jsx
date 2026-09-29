import { useState } from "react";
import { Button } from "../../../shared/ui";
import "./MessageComposer.css";
export function MessageComposer({ onSend }) {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    const message = text.trim();
    if (!message || isSending) return;
    setIsSending(true);
    setError("");
    try {
      await onSend(message);
      setText("");
    } catch (reason) {
      setError(reason.message || "Не удалось отправить сообщение.");
    } finally {
      setIsSending(false);
    }
  };
  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form.requestSubmit();
    }
  };
  return (
    <form className="composer" onSubmit={submit}>
      <textarea
        aria-label="Текст сообщения"
        maxLength="4000"
        value={text}
        onKeyDown={onKeyDown}
        onChange={(event) => setText(event.target.value)}
        placeholder="Напишите сообщение…"
        rows="1"
      />
      <Button type="submit" disabled={!text.trim() || isSending}>
        {isSending ? "Отправка…" : "Отправить"}
      </Button>
      {error && <span className="composer__error">{error}</span>}
    </form>
  );
}
