import type { GeoLocation } from '../../types/Weather';
import './History.css';

interface Props {
  history: GeoLocation[];
  onSelect: (location: GeoLocation) => void;
}

export function History({ history, onSelect }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="hist-wrap">
      <p className="hist-title">Histórico</p>
      <div className="hist-list">
        {history.map((city, i) => (
          <button
            key={`${city.name}-${i}`}
            type="button"
            className="hist-chip"
            onClick={() => onSelect(city)}
          >
            🕘 {city.name}
          </button>
        ))}
      </div>
    </div>
  );
}
