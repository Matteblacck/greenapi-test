const STORAGE_KEY = "green-api-credentials";
export const loadCredentials = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};
export const saveCredentials = (credentials) =>
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
export const clearCredentials = () => sessionStorage.removeItem(STORAGE_KEY);
