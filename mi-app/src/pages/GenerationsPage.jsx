import { useFetch } from '../hooks/useFetch';
import { getAllGenerations } from '../services/pokemon.service';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { extractIdFromUrl, capitalize, getSpriteUrl } from '../utils/pokemon';
import { GENERATION_DATA } from '../utils/constants';
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
      <header className="section-head">
        <h2 className="section-title">Generaciones</h2>
        <p className="section-sub">{gens.length} generaciones · 1996 a hoy</p>
      </header>

      <div className="gen-grid">
        {gens.map((g) => {
          const meta = GENERATION_DATA[g.id] ?? {};
          return (
            <Link
              key={g.id}
              to={`/pokedex/generations/${g.id}`}
              className="gen-card"
            >
              <div className="gen-card__roman">{meta.roman ?? g.id}</div>

              <div className="gen-card__body">
                <h3 className="gen-card__region">{meta.region ?? capitalize(g.name)}</h3>
                <p className="gen-card__years">{meta.years ?? ''}</p>
                <p className="gen-card__games">{meta.games ?? ''}</p>
              </div>

              {meta.mascot && (
                <img
                  className="gen-card__mascot"
                  src={getSpriteUrl(meta.mascot)}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
