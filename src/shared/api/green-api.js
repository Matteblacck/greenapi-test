const DEFAULT_API_URL = "https://api.green-api.com";

const request = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(
      data.message || data.error || `Ошибка API: ${response.status}`,
    );
  return data;
};

export const createGreenApiClient = ({
  idInstance,
  apiTokenInstance,
  apiUrl = DEFAULT_API_URL,
}) => {
  const base = `${apiUrl.replace(/\/$/, "")}/waInstance${idInstance}`;
  const withToken = (method) => `${base}/${method}/${apiTokenInstance}`;
  return {
    sendMessage: (chatId, message) =>
      request(withToken("sendMessage"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, message }),
      }),
    receiveNotification: () => request(withToken("receiveNotification")),
    deleteNotification: (receiptId) =>
      request(`${withToken("deleteNotification")}/${receiptId}`, {
        method: "DELETE",
      }),
  };
};
