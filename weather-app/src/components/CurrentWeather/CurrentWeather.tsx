import type { CurrentWeather as CurrentWeatherData, GeoLocation } from '../../types/Weather';
import { formatCurrentDate, formatCurrentTime } from '../../utils/date';
import { getCountryFlag, getWeatherCondition } from '../../utils/weather';
import { SunInfo } from '../SunInfo/SunInfo';
import { WeatherStats } from '../WeatherStats/WeatherStats';
import './CurrentWeather.css';

interface Props {
  current: CurrentWeatherData;
  location: GeoLocation;
  timezone: string;
  sunrise: string;
  sunset: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function CurrentWeather({
  current,
  location,
  timezone,
  sunrise,
  sunset,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const condition = getWeatherCondition(current.weather_code);
  const flag = getCountryFlag(location.country_code);
  const cityLine = location.admin1 ? `${location.name}, ${location.admin1}` : location.name;
  const timeStr = formatCurrentTime(timezone);
  const dateStr = formatCurrentDate(timezone);

  return (
    <div className="cw-main">
      <div className="cw-gradient-line" />

      <div className="cw-header">
        <div>
          <h2 className="cw-city">
            {cityLine} <span className="cw-flag">{flag}</span>
          </h2>
          <p className="cw-time">
            {timeStr} · {dateStr}
          </p>
        </div>

        <div className="cw-header-actions">
          <button
            type="button"
            className={`cw-fav-btn ${isFavorite ? 'is-active' : ''}`}
            onClick={onToggleFavorite}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? '⭐' : '☆'}
          </button>
          <SunInfo sunrise={sunrise} sunset={sunset} />
        </div>
      </div>

      <div className="cw-temp-row">
        <span className="cw-temp">{Math.round(current.temperature_2m)}</span>
        <span className="cw-unit">°C</span>
      </div>

      <div className="cw-cond">
        <span className="cw-cond-icon">{condition.icon}</span>
        <div>
          <p className="cw-cond-label">{condition.label}</p>
          <p className="cw-feels">Sensação térmica {Math.round(current.apparent_temperature)}°C</p>
        </div>
      </div>

      <div className="cw-divider" />

      <WeatherStats current={current} />
    </div>
  );
}
