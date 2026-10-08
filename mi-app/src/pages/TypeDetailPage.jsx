import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getByType } from '../services/pokemon.service';
import { extractIdFromUrl, capitalize } from '../utils/pokemon';
import { TYPE_COLORS } from '../utils/constants';
import PokemonCard from '../components/ui/PokemonCard';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

export default function TypeDetailPage() {
  const { typeName } = useParams();
  const { data, loading, error } = useFetch(() => getByType(typeName), [typeName]);

  if (loading) return <Spinner label={`Cargando tipo ${typeName}...`} />;
  if (error)   return <ErrorState message="Tipo no encontrado" />;

  const list = (data?.pokemon ?? []).map((entry) => ({
    id: extractIdFromUrl(entry.pokemon.url),
    name: entry.pokemon.name,
  }));

  const color = TYPE_COLORS[typeName] || '#64748b';

  return (
    <div>
      <Link to="/pokedex/types" className="btn btn--ghost">
        Volver a tipos
      </Link>
      <h2 className="section-title" style={{ color }}>
        {capitalize(typeName)} - {list.length} Pokemon
      </h2>

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid">
          {list.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  );
}
