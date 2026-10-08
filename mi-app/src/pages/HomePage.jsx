import { Link } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <section className="page">
      <header className="hero">
        <h1>Pokedex</h1>
        <p>
          Explora mas de 1300 Pokemon usando Drawer, Tabs y Stack en una sola app.
        </p>
        <div className="hero__actions">
          <Link to="/pokedex" className="btn">
            <BookOpen size={18} /> Abrir Pokedex
          </Link>
          <Link to="/favorites" className="btn btn--ghost">
            <Heart size={18} /> Ver favoritos
          </Link>
        </div>
      </header>
    </section>
  );
}
