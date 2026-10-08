export default function Spinner({ label = 'Cargando...' }) {
  return (
    <div className="spinner-wrap">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
