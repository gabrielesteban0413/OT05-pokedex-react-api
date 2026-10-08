import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pokedex:favorites')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('pokedex:favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon],
    );
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
