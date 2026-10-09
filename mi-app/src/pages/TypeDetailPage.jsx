import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getByType } from '../services/pokemon.service';
import { extractIdFromUrl, capitalize } from '../utils/pokemon';
import { TYPE_COLORS, TYPE_EMOJIS } from '../utils/constants';
import PokemonCard from '../components/ui/PokemonCard';
import SearchBar from '../components/ui/SearchBar';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import { useDebounce } from '../hooks/useDebounce';

function DamageGroup({ title, types, variant }) {
  if (!types || types.length === 0) return null;
  return (
    <div className={`damage-group damage-group--${variant}`}>
      <h4 className="damage-group__title">{title}</h4>
      <div className="chips">
        {types.map((t) => (
          <span
            key={t.name}
            className="chip chip--small"
            style={{ backgroundColor: TYPE_COLORS[t.name] || '#64748b' }}
          >
            {TYPE_EMOJIS[t.name]} {capitalize(t.name)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TypeDetailPage() {
  const { typeName } = useParams();
  const { data, loading, error } = useFetch(() => getByType(typeName), [typeName]);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query);

  const list = useMemo(() => {
    const all = (data?.pokemon ?? []).map((entry) => ({
      id: extractIdFromUrl(entry.pokemon.url),
      name: entry.pokemon.name,
    }));
    const q = debounced.trim().toLowerCase();
    if (!q) return all;
    return all.filter((p) => p.name.includes(q) || String(p.id).includes(q));
  }, [data, debounced]);

  if (loading) return <Spinner label={`Cargando tipo ${typeName}...`} />;
  if (error)   return <ErrorState message="Tipo no encontrado" />;

  const color = TYPE_COLORS[typeName] || '#64748b';
  const dr = data?.damage_relations ?? {};

  return (
    <div>
      <Link to="/pokedex/types" className="btn btn--ghost">Volver a tipos</Link>

      <header className="type-hero" style={{ '--type-color': color }}>
        <span className="type-hero__mark">{TYPE_EMOJIS[typeName]}</span>
        <div>
          <h2 className="type-hero__name">{capitalize(typeName)}</h2>
          <p className="type-hero__count">{data.pokemon.length} Pokemon</p>
        </div>
      </header>

      <section className="damage-panel">
        <h3>Efectividad defensiva</h3>
        <p className="damage-panel__hint">
          Que tan vulnerable es este tipo cuando recibe ataques.
        </p>
        <div className="damage-grid">
          <DamageGroup title="Debil contra (x2)"  types={dr.double_damage_from} variant="weak" />
          <DamageGroup title="Resistente a (x0.5)" types={dr.half_damage_from}   variant="resist" />
          <DamageGroup title="Inmune a (x0)"       types={dr.no_damage_from}     variant="immune" />
        </div>
      </section>

      <section>
        <header className="section-head">
          <h3 className="section-title">Pokemon de tipo {capitalize(typeName)}</h3>
        </header>

        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Filtrar por nombre o numero..."
        />

        {list.length === 0 ? (
          <EmptyState message="Ningun Pokemon coincide" />
        ) : (
          <div className="grid">
            {list.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
