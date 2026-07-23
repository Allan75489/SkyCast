    import type { Location, WeatherData } from '../types/Weather';

        export async function geocode(city: string): Promise<Location> {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            throw new Error('Cidade não encontrada');
        }

        return data.results[0] as Location;
        }

        export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
        const url = `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${lat}&longitude=${lon}` +
            `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,precipitation` +
            `&hourly=temperature_2m,weather_code,precipitation_probability` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
            `&wind_speed_unit=kmh&timezone=auto&forecast_days=7`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Erro ao buscar dados do clima');
        }

        return res.json() as Promise<WeatherData>;
        }