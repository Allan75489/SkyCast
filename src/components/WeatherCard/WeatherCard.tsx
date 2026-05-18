    import type { WeatherData, Location } from '../../types/Weather';
    import { getCondition } from '../../types/Weather';
    import './WeatherCard.css';

    interface Props {
    data: WeatherData;
    location: Location;
    }

    const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    function getFlag(code: string) {
    if (!code) return '';
    return code.toUpperCase().replace(/./g, c =>
        String.fromCodePoint(127397 + c.charCodeAt(0))
    );
    }

    function fmtTime(iso: string, tz: string) {
    return new Date(iso).toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit', timeZone: tz,
    });
    }

    export function WeatherCard({ data, location }: Props) {
    const cur = data.current;
    const cond = getCondition(cur.weather_code);
    const tz = ((data as { timezone?: string }).timezone) ?? 'UTC';

    const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: tz });
    const dateStr = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', timeZone: tz });

    const flag = location.country_code ? getFlag(location.country_code) : '';
    const cityLine = location.admin1
        ? `${location.name}, ${location.admin1}`
        : location.name;

    const sunrise = fmtTime(data.daily.sunrise[0], tz);
    const sunset  = fmtTime(data.daily.sunset[0], tz);

    const now = new Date();
    const hourly: { hour: string; icon: string; temp: number; rain: number }[] = [];
    for (let i = 0; i < data.hourly.time.length && hourly.length < 8; i++) {
        if (new Date(data.hourly.time[i]) > now) {
        hourly.push({
            hour: new Date(data.hourly.time[i]).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: tz }),
            icon: getCondition(data.hourly.weather_code[i]).icon,
            temp: Math.round(data.hourly.temperature_2m[i]),
            rain: data.hourly.precipitation_probability[i],
        });
        }
    }

    const forecast = data.daily.time.map((t: string, i: number) => {
        const d = new Date(t + 'T12:00:00');
        return {
        label: i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : DAYS[d.getDay()],
        icon: getCondition(data.daily.weather_code[i]).icon,
        max: Math.round(data.daily.temperature_2m_max[i]),
        min: Math.round(data.daily.temperature_2m_min[i]),
        };
    });

    return (
        <div className="wc-wrap">
        {/* Card principal */}
        <div className="wc-main">
            <div className="wc-gradient-line" />

            <div className="wc-header">
            <div>
                <h2 className="wc-city">{cityLine} <span className="wc-flag">{flag}</span></h2>
                <p className="wc-time">{timeStr} · {dateStr}</p>
            </div>
            <div className="wc-sun">
                <span>🌅 {sunrise}</span>
                <span>🌇 {sunset}</span>
            </div>
            </div>

            <div className="wc-temp-row">
            <span className="wc-temp">{Math.round(cur.temperature_2m)}</span>
            <span className="wc-unit">°C</span>
            </div>

            <div className="wc-cond">
            <span className="wc-cond-icon">{cond.icon}</span>
            <div>
                <p className="wc-cond-label">{cond.label}</p>
                <p className="wc-feels">Sensação térmica {Math.round(cur.apparent_temperature)}°C</p>
            </div>
            </div>

            <div className="wc-divider" />

            <div className="wc-stats">
            <div className="wc-stat">
                <p className="wc-stat-label">Vento</p>
                <p className="wc-stat-value">{Math.round(cur.wind_speed_10m)}</p>
                <p className="wc-stat-unit">km/h</p>
            </div>
            <div className="wc-stat">
                <p className="wc-stat-label">Umidade</p>
                <p className="wc-stat-value">{Math.round(cur.relative_humidity_2m)}</p>
                <p className="wc-stat-unit">%</p>
            </div>
            <div className="wc-stat">
                <p className="wc-stat-label">Precipitação</p>
                <p className="wc-stat-value">{cur.precipitation.toFixed(1)}</p>
                <p className="wc-stat-unit">mm</p>
            </div>
            </div>
        </div>

        {/* Cards inferiores */}
        <div className="wc-bottom">
            <div className="wc-card">
            <p className="wc-card-title">📅 Próximos 7 dias</p>
            <div className="wc-forecast">
                {forecast.map((d, i) => (
                <div key={i} className="wc-forecast-item">
                    <span className="wc-forecast-day">{d.label}</span>
                    <span className="wc-forecast-icon">{d.icon}</span>
                    <div className="wc-forecast-temps">
                    <span className="wc-temp-max">{d.max}°</span>
                    <span className="wc-temp-min">{d.min}°</span>
                    </div>
                </div>
                ))}
            </div>
            </div>

            <div className="wc-card">
            <p className="wc-card-title">🕐 Próximas horas</p>
            <div className="wc-hourly">
                {hourly.map((h, i) => (
                <div key={i} className="wc-hourly-item">
                    <span className="wc-hourly-time">{h.hour}</span>
                    <span className="wc-hourly-icon">{h.icon}</span>
                    <span className="wc-hourly-temp">{h.temp}°C</span>
                    <span className="wc-hourly-rain">{h.rain}%</span>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
    }