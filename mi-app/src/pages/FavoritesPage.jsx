import { useFavorites } from '../context/FavoritesContext';
import PokemonCard from '../components/ui/PokemonCard';
import EmptyState from '../components/ui/EmptyState';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <section className="page">
      <h1 className="section-title">Favoritos</h1>

      {favorites.length === 0 ? (
        <EmptyState message="Aun no tienes Pokemon favoritos" />
      ) : (
        <div className="grid">
          {favorites.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </section>
  );
}
