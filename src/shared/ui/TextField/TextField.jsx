import "./TextField.css";
export function TextField({ label, error, className = "", ...props }) {
  return (
    <label className={`text-field ${className}`}>
      <span>{label}</span>
      <input {...props} />
      {error && <small>{error}</small>}
    </label>
  );
}
