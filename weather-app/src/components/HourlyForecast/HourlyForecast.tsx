import type { HourlyWeather } from '../../types/Weather';
import { formatTime, getUpcomingHourIndices } from '../../utils/date';
import { getWeatherCondition } from '../../utils/weather';
import './HourlyForecast.css';

interface Props {
  hourly: HourlyWeather;
  timezone: string;
}

export function HourlyForecast({ hourly, timezone }: Props) {
  const indices = getUpcomingHourIndices(hourly.time, timezone, 8);

  const items = indices.map((i) => ({
    hour: formatTime(hourly.time[i], timezone),
    icon: getWeatherCondition(hourly.weather_code[i]).icon,
    temp: Math.round(hourly.temperature_2m[i]),
    rain: hourly.precipitation_probability[i],
  }));

  return (
    <div className="hf-card">
      <p className="hf-title">🕐 Próximas horas</p>
      <div className="hf-list">
        {items.map((h, i) => (
          <div key={i} className="hf-item">
            <span className="hf-time">{h.hour}</span>
            <span className="hf-icon" aria-hidden="true">
              {h.icon}
            </span>
            <span className="hf-temp">{h.temp}°C</span>
            <span className="hf-rain">{h.rain}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
