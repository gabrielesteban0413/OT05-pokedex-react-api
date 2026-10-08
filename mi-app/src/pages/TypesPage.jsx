import { useFetch } from '../hooks/useFetch';
import { getAllTypes } from '../services/pokemon.service';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { TYPE_COLORS } from '../utils/constants';
import { capitalize } from '../utils/pokemon';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';

export default function TypesPage() {
  const location = useLocation();
  const { data, loading, error } = useFetch(() => getAllTypes(), []);

  if (location.pathname !== '/pokedex/types') {
    return <Outlet />;
  }

  if (loading) return <Spinner label="Cargando tipos..." />;
  if (error)   return <ErrorState message="No se pudieron cargar los tipos" />;

  const types = (data?.results ?? []).filter(
    (t) => !['unknown', 'shadow'].includes(t.name),
  );

  return (
    <div>
      <h2 className="section-title">Tipos de Pokemon</h2>
      <div className="chips">
        {types.map((t) => (
          <Link
            key={t.name}
            to={`/pokedex/types/${t.name}`}
            className="chip"
            style={{ backgroundColor: TYPE_COLORS[t.name] || '#64748b' }}
          >
            {capitalize(t.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
