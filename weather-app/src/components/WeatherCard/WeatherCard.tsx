    import type { WeatherData, Location } from '../../types/Weather';
    import { getCondition } from '../../types/Weather';

    interface Props {
    data: WeatherData;
    location: Location;
    }

    const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    export function WeatherCard({ data, location }: Props) {
    const cur = data.current;
    const cond = getCondition(cur.weather_code);

    const timezone = (data as { timezone: string }).timezone ?? 'auto';

    const timeStr = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,
    });

    const dateStr = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        timeZone: timezone,
    });

    const country = location.country_code ? ` · ${location.country_code}` : '';
    const fullName = location.admin1
        ? `${location.name}, ${location.admin1}${country}`
        : `${location.name}${country}`;

    const now = new Date();
    const hourly: { hour: string; icon: string; temp: number; rain: number }[] = [];
    for (let i = 0; i < data.hourly.time.length && hourly.length < 8; i++) {
        if (new Date(data.hourly.time[i]) > now) {
        hourly.push({
            hour: new Date(data.hourly.time[i]).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: timezone,
            }),
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
        <div className="flex flex-col gap-4">
        {/* Card principal */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-9 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />

            <div className="flex items-start justify-between mb-2">
            <div>
                <h2 className="font-['DM_Serif_Display'] text-3xl text-slate-100">{fullName}</h2>
                <p className="font-['DM_Mono'] text-sm text-slate-500 mt-1">
                {timeStr} · {dateStr}
                </p>
                <p className="font-['DM_Mono'] text-xs text-slate-600 mt-0.5">{timezone}</p>
            </div>
            </div>

            <div className="flex items-end gap-4 my-6">
            <span className="font-['DM_Serif_Display'] text-9xl text-slate-100 leading-none tracking-tighter">
                {Math.round(cur.temperature_2m)}
            </span>
            <span className="font-['DM_Serif_Display'] text-3xl text-slate-500 pb-4">°C</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{cond.icon}</span>
            <div>
                <p className="text-lg text-blue-300 font-light">{cond.label}</p>
                <p className="text-sm text-slate-500">Sensação térmica {Math.round(cur.apparent_temperature)}°C</p>
            </div>
            </div>

            <div className="h-px bg-white/[0.06] my-6" />

            <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Vento</p>
                <p className="font-['DM_Mono'] text-xl text-slate-300">{Math.round(cur.wind_speed_10m)}</p>
                <p className="text-xs text-slate-500">km/h</p>
            </div>
            <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Umidade</p>
                <p className="font-['DM_Mono'] text-xl text-slate-300">{Math.round(cur.relative_humidity_2m)}</p>
                <p className="text-xs text-slate-500">%</p>
            </div>
            <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Precipitação</p>
                <p className="font-['DM_Mono'] text-xl text-slate-300">{cur.precipitation.toFixed(1)}</p>
                <p className="text-xs text-slate-500">mm</p>
            </div>
            </div>
        </div>

        {/* Cards inferiores */}
        <div className="grid grid-cols-2 gap-4">
            {/* Previsão 7 dias */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">📅 Próximos 7 dias</p>
            <div className="flex flex-col gap-2">
                {forecast.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-slate-400 w-14">{d.label}</span>
                    <span className="text-lg">{d.icon}</span>
                    <div className="flex gap-2">
                    <span className="font-['DM_Mono'] text-sm text-slate-200">{d.max}°</span>
                    <span className="font-['DM_Mono'] text-sm text-slate-500">{d.min}°</span>
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* Próximas horas */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">🕐 Próximas horas</p>
            <div className="flex flex-col gap-2">
                {hourly.map((h, i) => (
                <div key={i} className="flex items-center justify-between">
                    <span className="font-['DM_Mono'] text-xs text-slate-500 w-12">{h.hour}</span>
                    <span className="text-base">{h.icon}</span>
                    <span className="font-['DM_Mono'] text-sm text-slate-300">{h.temp}°C</span>
                    <span className="text-xs text-blue-400">{h.rain}%</span>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
    }