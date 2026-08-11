import type { CurrentWeather } from '../../types/Weather';
import './WeatherStats.css';

interface Props {
  current: CurrentWeather;
}

export function WeatherStats({ current }: Props) {
  return (
    <div className="ws-stats">
      <div className="ws-stat">
        <p className="ws-stat-label">Vento</p>
        <p className="ws-stat-value">{Math.round(current.wind_speed_10m)}</p>
        <p className="ws-stat-unit">km/h</p>
      </div>
      <div className="ws-stat">
        <p className="ws-stat-label">Umidade</p>
        <p className="ws-stat-value">{Math.round(current.relative_humidity_2m)}</p>
        <p className="ws-stat-unit">%</p>
      </div>
      <div className="ws-stat">
        <p className="ws-stat-label">Precipitação</p>
        <p className="ws-stat-value">{current.precipitation.toFixed(1)}</p>
        <p className="ws-stat-unit">mm</p>
      </div>
    </div>
  );
}
