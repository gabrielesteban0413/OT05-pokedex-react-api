export const getSpriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const getMiniSpriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const extractIdFromUrl = (url) => {
  const parts = String(url).split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
};

export const capitalize = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');

export const formatId = (id) => `#${String(id).padStart(4, '0')}`;
