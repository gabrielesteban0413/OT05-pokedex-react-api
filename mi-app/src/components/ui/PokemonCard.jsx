import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { getSpriteUrl, capitalize, formatId } from '../../utils/pokemon';

export default function PokemonCard({ pokemon }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(pokemon.id);

  return (
    <div className="poke-card">
      <Link to={`/pokedex/${pokemon.id}`} className="poke-card__link">
        <span className="poke-card__id">{formatId(pokemon.id)}</span>
        <img
          src={getSpriteUrl(pokemon.id)}
          alt={pokemon.name}
          className="poke-card__img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
          }}
        />
        <h3 className="poke-card__name">{capitalize(pokemon.name)}</h3>
      </Link>
      <button
        className={`poke-card__fav ${fav ? 'is-fav' : ''}`}
        onClick={() => toggleFavorite({ id: pokemon.id, name: pokemon.name })}
        aria-label={fav ? 'Quitar de favoritos' : 'Anadir a favoritos'}
      >
        <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}
