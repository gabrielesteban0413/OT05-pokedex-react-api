import { useFetch } from '../hooks/useFetch';
import { useMemo, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { getAllPokemon } from '../services/pokemon.service';
import { extractIdFromUrl } from '../utils/pokemon';
import PokemonCard from '../components/ui/PokemonCard';
import SearchBar from '../components/ui/SearchBar';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

const PAGE_SIZE = 24;

export default function AllPokemonPage() {
  const { data, loading, error } = useFetch(() => getAllPokemon(), []);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const debounced = useDebounce(query);

  const all = useMemo(() => {
    const list = data?.results ?? [];
    return list.map((p) => ({ name: p.name, id: extractIdFromUrl(p.url) }));
  }, [data]);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return all;
    return all.filter((p) => p.name.includes(q) || String(p.id).includes(q));
  }, [all, debounced]);

  const shown = filtered.slice(0, visible);

  if (loading) return <Spinner label="Cargando Pokemon..." />;
  if (error)   return <ErrorState message="No se pudo cargar la lista" />;

  return (
    <div>
      <SearchBar
        value={query}
        onChange={(v) => { setQuery(v); setVisible(PAGE_SIZE); }}
        placeholder="Buscar por nombre o numero..."
      />

      {shown.length === 0 ? (
        <EmptyState message="Ningun Pokemon coincide" />
      ) : (
        <>
          <div className="grid">
            {shown.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>

          {visible < filtered.length && (
            <div className="load-more">
              <button
                className="btn"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
              >
                Cargar mas ({filtered.length - visible} restantes)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
