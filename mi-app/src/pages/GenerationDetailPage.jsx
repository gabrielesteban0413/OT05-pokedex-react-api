import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getByGeneration } from '../services/pokemon.service';
import { extractIdFromUrl, capitalize, getSpriteUrl } from '../utils/pokemon';
import { GENERATION_DATA } from '../utils/constants';
import { useDebounce } from '../hooks/useDebounce';
import PokemonCard from '../components/ui/PokemonCard';
import SearchBar from '../components/ui/SearchBar';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

export default function GenerationDetailPage() {
  const { genId } = useParams();
  const { data, loading, error } = useFetch(() => getByGeneration(genId), [genId]);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query);

  const all = useMemo(
    () =>
      (data?.pokemon_species ?? []).map((s) => ({
        id: extractIdFromUrl(s.url),
        name: s.name,
      })),
    [data],
  );

  const list = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return all;
    return all.filter((p) => p.name.includes(q) || String(p.id).includes(q));
  }, [all, debounced]);

  if (loading) return <Spinner label="Cargando generacion..." />;
  if (error)   return <ErrorState message="Generacion no encontrada" />;

  const meta = GENERATION_DATA[Number(genId)] ?? {};

  return (
    <div>
      <Link to="/pokedex/generations" className="btn btn--ghost">
        Volver a generaciones
      </Link>

      <header className="gen-hero">
        <div className="gen-hero__info">
          <span className="gen-hero__roman">Gen {meta.roman ?? genId}</span>
          <h2 className="gen-hero__region">{meta.region ?? capitalize(data?.name ?? '')}</h2>
          <p className="gen-hero__years">{meta.years ?? ''}</p>
          <p className="gen-hero__games">{meta.games ?? ''}</p>
          <p className="gen-hero__stats">
            <strong>{all.length}</strong> especies registradas
          </p>
        </div>

        {meta.mascot && (
          <img
            className="gen-hero__mascot"
            src={getSpriteUrl(meta.mascot)}
            alt=""
            onError={(e) => {
              e.currentTarget.src =
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
            }}
          />
        )}
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Filtrar especies..."
      />

      {list.length === 0 ? (
        <EmptyState message="Ninguna especie coincide" />
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
