import { useEffect } from "react";
import { normalizeIncomingNotification } from "../../../entities/message";

const POLLING_INTERVAL = 3000;
export function useNotificationPolling({ client, onMessage }) {
  useEffect(() => {
    if (!client) return undefined;
    let disposed = false;
    let timeoutId;

    const poll = async () => {
      try {
        const notification = await client.receiveNotification();
        if (!notification?.receiptId) return;
        const message = normalizeIncomingNotification(notification);
        await client.deleteNotification(notification.receiptId);
        if (!disposed && message) onMessage(message.chatId, message);
      } catch {
        /* The next poll retries transient API/network errors. */
      } finally {
        if (!disposed) {
          timeoutId = window.setTimeout(poll, POLLING_INTERVAL);
        }
      }
    };

    poll();

    return () => {
      disposed = true;
      window.clearTimeout(timeoutId);
    };
  }, [client, onMessage]);
}
