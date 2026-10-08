import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getByGeneration } from '../services/pokemon.service';
import { extractIdFromUrl, capitalize } from '../utils/pokemon';
import PokemonCard from '../components/ui/PokemonCard';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';

export default function GenerationDetailPage() {
  const { genId } = useParams();
  const { data, loading, error } = useFetch(() => getByGeneration(genId), [genId]);

  if (loading) return <Spinner label="Cargando generacion..." />;
  if (error)   return <ErrorState message="Generacion no encontrada" />;

  const list = (data?.pokemon_species ?? []).map((s) => ({
    id: extractIdFromUrl(s.url),
    name: s.name,
  }));

  return (
    <div>
      <Link to="/pokedex/generations" className="btn btn--ghost">
        Volver a generaciones
      </Link>
      <h2 className="section-title">
        {capitalize(data?.name ?? '')} - {list.length} especies
      </h2>
      <div className="grid">
        {list.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}
