#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Aplica las mejoras a las paginas de Tipos y Generaciones."""

import os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mi-app", "src")


def w(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(content)
    print("  [ok] " + path)


FILES = {}

# =====================================================
# constants.js - anadimos emojis y metadata de generaciones
# =====================================================
FILES["utils/constants.js"] = """export const TYPE_COLORS = {
  normal:   '#A8A77A',
  fire:     '#EE8130',
  water:    '#6390F0',
  electric: '#F7D02C',
  grass:    '#7AC74C',
  ice:      '#96D9D6',
  fighting: '#C22E28',
  poison:   '#A33EA1',
  ground:   '#E2BF65',
  flying:   '#A98FF3',
  psychic:  '#F95587',
  bug:      '#A6B91A',
  rock:     '#B6A136',
  ghost:    '#735797',
  dragon:   '#6F35FC',
  dark:     '#705746',
  steel:    '#B7B7CE',
  fairy:    '#D685AD',
};

export const TYPE_EMOJIS = {
  normal:   'O',
  fire:     'F',
  water:    'W',
  electric: 'E',
  grass:    'G',
  ice:      'I',
  fighting: 'L',
  poison:   'P',
  ground:   'T',
  flying:   'Y',
  psychic:  'S',
  bug:      'B',
  rock:     'R',
  ghost:    'H',
  dragon:   'D',
  dark:     'K',
  steel:    'M',
  fairy:    'X',
};

export const STAT_LABELS = {
  hp:                'HP',
  attack:            'Ataque',
  defense:           'Defensa',
  'special-attack':  'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed:             'Velocidad',
};

/** Metadata estatica de cada generacion (fuente: Pokemon oficial). */
export const GENERATION_DATA = {
  1: { region: 'Kanto',  roman: 'I',    years: '1996 - 1999', games: 'Rojo / Verde / Azul / Amarillo', mascot: 150 },
  2: { region: 'Johto',  roman: 'II',   years: '1999 - 2002', games: 'Oro / Plata / Cristal',           mascot: 249 },
  3: { region: 'Hoenn',  roman: 'III',  years: '2002 - 2006', games: 'Rubi / Zafiro / Esmeralda',       mascot: 384 },
  4: { region: 'Sinnoh', roman: 'IV',   years: '2006 - 2010', games: 'Diamante / Perla / Platino',      mascot: 493 },
  5: { region: 'Teselia',roman: 'V',    years: '2010 - 2013', games: 'Negro / Blanco',                  mascot: 646 },
  6: { region: 'Kalos',  roman: 'VI',   years: '2013 - 2016', games: 'X / Y',                           mascot: 717 },
  7: { region: 'Alola',  roman: 'VII',  years: '2016 - 2019', games: 'Sol / Luna',                      mascot: 791 },
  8: { region: 'Galar',  roman: 'VIII', years: '2019 - 2022', games: 'Espada / Escudo',                 mascot: 888 },
  9: { region: 'Paldea', roman: 'IX',   years: '2022 - hoy',  games: 'Escarlata / Purpura',             mascot: 1007 },
};
"""

# =====================================================
# TypesPage - cards enriquecidas
# =====================================================
FILES["pages/TypesPage.jsx"] = """import { useMemo } from 'react';
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

  if (location.pathname !== '/pokedex/types') {
    return <Outlet />;
  }

  if (loading) return <Spinner label="Cargando tipos..." />;
  if (error)   return <ErrorState message="No se pudieron cargar los tipos" />;

  const total = useMemo(
    () => (data ?? []).reduce((acc, t) => acc + t.count, 0),
    [data],
  );

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
"""

# =====================================================
# TypeDetailPage - con damage relations
# =====================================================
FILES["pages/TypeDetailPage.jsx"] = """import { useMemo, useState } from 'react';
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
"""

# =====================================================
# GenerationsPage - cards enriquecidas
# =====================================================
FILES["pages/GenerationsPage.jsx"] = """import { useFetch } from '../hooks/useFetch';
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
"""

# =====================================================
# GenerationDetailPage - header con info + buscador
# =====================================================
FILES["pages/GenerationDetailPage.jsx"] = """import { useMemo, useState } from 'react';
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
"""


def main():
    print("Aplicando mejoras visuales...")
    for rel, content in FILES.items():
        w(rel, content)
    print("")
    print("Listo. " + str(len(FILES)) + " archivos actualizados.")
    print("Siguiente: agrega el CSS (ver instrucciones).")


if __name__ == "__main__":
    main()