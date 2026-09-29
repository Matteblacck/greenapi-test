import { formatTime } from "../../../../shared/lib/format-time";
import "./MessageBubble.css";
export function MessageBubble({ message }) {
  return (
    <article className={`message-bubble message-bubble--${message.direction}`}>
      <p>{message.text}</p>
      <time>{formatTime(message.createdAt)}</time>
    </article>
  );
}
