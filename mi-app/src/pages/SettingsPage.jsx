import { useFavorites } from '../context/FavoritesContext';
import { Trash2, Database } from 'lucide-react';

export default function SettingsPage() {
  const { favorites } = useFavorites();

  const resetFavorites = () => {
    localStorage.removeItem('pokedex:favorites');
    window.location.reload();
  };

  return (
    <section className="page">
      <h1 className="section-title">Ajustes</h1>

      <div className="settings__card">
        <div>
          <Database size={20} />
          <p>
            <strong>Favoritos guardados:</strong> {favorites.length}
          </p>
        </div>
        <button className="btn btn--danger" onClick={resetFavorites}>
          <Trash2 size={16} /> Vaciar favoritos
        </button>
      </div>

      <p className="settings__note">
        Los datos se guardan en <code>localStorage</code> bajo la clave{' '}
        <code>pokedex:favorites</code>.
      </p>
    </section>
  );
}
