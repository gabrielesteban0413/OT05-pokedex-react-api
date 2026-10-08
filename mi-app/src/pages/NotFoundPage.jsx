import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="page state state--error">
      <h1>404</h1>
      <p>Pagina no encontrada.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </section>
  );
}
