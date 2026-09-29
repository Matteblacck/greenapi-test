const getText = (body) =>
  body.messageData?.textMessageData?.textMessage ??
  body.messageData?.extendedTextMessageData?.text ??
  body.messageData?.textMessage?.text;

export const normalizeIncomingNotification = (notification) => {
  const body = notification.body ?? notification;

  if (body.typeWebhook !== "incomingMessageReceived") {
    return null;
  }

  const text = getText(body);
  const chatId = body.senderData?.chatId ?? body.chatId;
  if (!text || !chatId) return null;
  return {
    id: body.idMessage ?? notification.receiptId ?? crypto.randomUUID(),
    chatId,
    chatTitle:
      body.senderData?.senderContactName ??
      body.senderData?.senderName ??
      body.senderData?.chatName ??
      chatId,
    text,
    direction: "incoming",
    createdAt: new Date(body.timestamp ? body.timestamp * 1000 : Date.now()),
  };
};
