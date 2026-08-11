import type { DailyWeather } from '../../types/Weather';
import { formatDayLabel } from '../../utils/date';
import { getWeatherCondition } from '../../utils/weather';
import './DailyForecast.css';

interface Props {
  daily: DailyWeather;
}

export function DailyForecast({ daily }: Props) {
  const items = daily.time.map((date, i) => ({
    label: formatDayLabel(date, i),
    icon: getWeatherCondition(daily.weather_code[i]).icon,
    max: Math.round(daily.temperature_2m_max[i]),
    min: Math.round(daily.temperature_2m_min[i]),
    rain: daily.precipitation_probability_max?.[i],
  }));

  return (
    <div className="df-card">
      <p className="df-title">📅 Próximos 7 dias</p>
      <div className="df-list">
        {items.map((day, i) => (
          <div key={i} className="df-item">
            <span className="df-day">{day.label}</span>
            <span className="df-icon" aria-hidden="true">
              {day.icon}
            </span>
            {day.rain !== undefined && <span className="df-rain">{day.rain}%</span>}
            <div className="df-temps">
              <span className="df-temp-max">{day.max}°</span>
              <span className="df-temp-min">{day.min}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
