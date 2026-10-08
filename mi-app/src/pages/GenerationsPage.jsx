import { useFetch } from '../hooks/useFetch';
import { getAllGenerations } from '../services/pokemon.service';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { extractIdFromUrl, capitalize } from '../utils/pokemon';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';

export default function GenerationsPage() {
  const location = useLocation();
  const { data, loading, error } = useFetch(() => getAllGenerations(), []);

  if (location.pathname !== '/pokedex/generations') {
    return <Outlet />;
  }

  if (loading) return <Spinner label="Cargando generaciones..." />;
  if (error)   return <ErrorState message="No se pudieron cargar las generaciones" />;

  const gens = (data?.results ?? []).map((g) => ({
    name: g.name,
    id: extractIdFromUrl(g.url),
  }));

  return (
    <div>
      <h2 className="section-title">Generaciones</h2>
      <div className="chips">
        {gens.map((g) => (
          <Link
            key={g.id}
            to={`/pokedex/generations/${g.id}`}
            className="chip chip--neutral"
          >
            {capitalize(g.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
