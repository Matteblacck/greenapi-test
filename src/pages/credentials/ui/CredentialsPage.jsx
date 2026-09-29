import { CredentialsForm } from "../../../features/connect-instance";
export function CredentialsPage({ onConnect }) {
  return (
    <main className="credentials-page">
      <section className="credentials-card">
        <h1>Подключите GREEN-API</h1>
        <p>
          Введите данные инстанса, чтобы отправлять и получать текстовые
          сообщения в Telegram.
        </p>
        <CredentialsForm onSubmit={onConnect} />
      </section>
    </main>
  );
}
