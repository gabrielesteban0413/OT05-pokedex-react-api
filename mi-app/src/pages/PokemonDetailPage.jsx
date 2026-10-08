import { Link, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { getPokemonById } from '../services/pokemon.service';
import { useFavorites } from '../context/FavoritesContext';
import { getSpriteUrl, capitalize, formatId } from '../utils/pokemon';
import { STAT_LABELS } from '../utils/constants';
import TypeBadge from '../components/ui/TypeBadge';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';

const MAX_STAT = 255;

export default function PokemonDetailPage() {
  const { id } = useParams();
  const { data: p, loading, error } = useFetch(() => getPokemonById(id), [id]);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) return <Spinner label="Cargando Pokemon..." />;
  if (error)   return <ErrorState message="Pokemon no encontrado" />;

  const fav = isFavorite(p.id);

  return (
    <section className="page detail">
      <Link to="/pokedex/all" className="btn btn--ghost">
        Volver
      </Link>

      <header className="detail__header">
        <span className="detail__id">{formatId(p.id)}</span>
        <h1>{capitalize(p.name)}</h1>
        <button
          className={`btn ${fav ? 'btn--danger' : ''}`}
          onClick={() => toggleFavorite({ id: p.id, name: p.name })}
        >
          <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
          {fav ? 'Quitar de favoritos' : 'Anadir a favoritos'}
        </button>
      </header>

      <div className="detail__body">
        <div className="detail__art">
          <img src={getSpriteUrl(p.id)} alt={p.name} />
        </div>

        <div className="detail__info">
          <div className="detail__types">
            {p.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          <ul className="detail__metrics">
            <li><strong>Altura:</strong> {p.height / 10} m</li>
            <li><strong>Peso:</strong> {p.weight / 10} kg</li>
            <li>
              <strong>Habilidades:</strong>{' '}
              {p.abilities.map((a) => capitalize(a.ability.name)).join(', ')}
            </li>
          </ul>

          <h3>Estadisticas base</h3>
          <ul className="stats">
            {p.stats.map((s) => (
              <li key={s.stat.name} className="stats__row">
                <span className="stats__label">
                  {STAT_LABELS[s.stat.name] ?? s.stat.name}
                </span>
                <div className="stats__bar">
                  <div
                    className="stats__fill"
                    style={{ width: `${Math.min(100, (s.base_stat / MAX_STAT) * 100)}%` }}
                  />
                </div>
                <span className="stats__value">{s.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
