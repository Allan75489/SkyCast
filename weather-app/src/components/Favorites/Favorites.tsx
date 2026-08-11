import type { GeoLocation } from '../../types/Weather';
import './Favorites.css';

interface Props {
  favorites: GeoLocation[];
  onSelect: (location: GeoLocation) => void;
}

export function Favorites({ favorites, onSelect }: Props) {
  if (favorites.length === 0) return null;

  return (
    <div className="fav-wrap">
      <p className="fav-title">Favoritos</p>
      <div className="fav-list">
        {favorites.map((city, i) => (
          <button
            key={`${city.name}-${i}`}
            type="button"
            className="fav-chip"
            onClick={() => onSelect(city)}
          >
            ⭐ {city.name}
          </button>
        ))}
      </div>
    </div>
  );
}
