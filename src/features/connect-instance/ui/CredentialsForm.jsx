import { useState } from "react";
import { Button, TextField } from "../../../shared/ui";
export function CredentialsForm({ onSubmit }) {
  const [form, setForm] = useState({
    idInstance: "",
    apiTokenInstance: "",
    apiUrl: "https://api.green-api.com",
  });
  const [error, setError] = useState("");
  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    if (!form.idInstance.trim() || !form.apiTokenInstance.trim())
      return setError("Заполните ID инстанса и токен.");
    setError("");
    onSubmit(
      Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, value.trim()]),
      ),
    );
  };
  return (
    <form className="form-stack" onSubmit={submit}>
      <TextField
        label="ID инстанса"
        placeholder="1101000001"
        value={form.idInstance}
        onChange={update("idInstance")}
      />
      <TextField
        label="API token"
        type="password"
        placeholder="Введите apiTokenInstance"
        value={form.apiTokenInstance}
        onChange={update("apiTokenInstance")}
      />
      <TextField
        label="API URL"
        type="url"
        value={form.apiUrl}
        onChange={update("apiUrl")}
      />
      {error && <div className="form-error">{error}</div>}
      <Button type="submit">Подключить</Button>
    </form>
  );
}
