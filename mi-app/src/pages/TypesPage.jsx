import { useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getAllTypes, getByType } from '../services/pokemon.service';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { TYPE_COLORS, TYPE_EMOJIS } from '../utils/constants';
import { capitalize, extractIdFromUrl, getSpriteUrl } from '../utils/pokemon';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';

async function fetchAllTypesWithData() {
  const list = await getAllTypes();
  const names = list.results
    .map((t) => t.name)
    .filter((n) => !['unknown', 'shadow'].includes(n));

  const details = await Promise.all(names.map((n) => getByType(n)));

  return details.map((d) => ({
    name: d.name,
    count: d.pokemon.length,
    samples: d.pokemon.slice(0, 3).map((p) => extractIdFromUrl(p.pokemon.url)),
  }));
}

export default function TypesPage() {
  const location = useLocation();
  const { data, loading, error } = useFetch(fetchAllTypesWithData, []);

  // TODOS los hooks primero, antes de cualquier return
  const total = useMemo(
    () => (data ?? []).reduce((acc, t) => acc + t.count, 0),
    [data],
  );

  // Ahora sí, los returns condicionales
  if (location.pathname !== '/pokedex/types') {
    return <Outlet />;
  }

  if (loading) return <Spinner label="Cargando tipos..." />;
  if (error)   return <ErrorState message="No se pudieron cargar los tipos" />;

  return (
    <div>
      <header className="section-head">
        <h2 className="section-title">Tipos de Pokemon</h2>
        <p className="section-sub">
          {data.length} tipos · {total} entradas
        </p>
      </header>

      <div className="type-grid">
        {data.map((t) => {
          const color = TYPE_COLORS[t.name] || '#64748b';
          return (
            <Link
              key={t.name}
              to={`/pokedex/types/${t.name}`}
              className="type-card"
              style={{ '--type-color': color }}
            >
              <span className="type-card__mark">{TYPE_EMOJIS[t.name]}</span>
              <h3 className="type-card__name">{capitalize(t.name)}</h3>
              <span className="type-card__count">{t.count} Pokemon</span>

              <div className="type-card__samples">
                {t.samples.map((id) => (
                  <img
                    key={id}
                    src={getSpriteUrl(id)}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
                    }}
                  />
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}