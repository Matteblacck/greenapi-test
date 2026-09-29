import "./Avatar.css";
export function Avatar({ name }) {
  return (
    <div className="avatar" aria-hidden="true">
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}
