export interface GeoLocation {
  id?: number;
  name: string;
  admin1?: string;
  country?: string;
  country_code?: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  precipitation: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max?: number[];
  precipitation_probability_max?: number[];
}

export interface WeatherData {
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

export interface WeatherCondition {
  label: string;
  icon: string;
}

export const WMO_CODES: Record<number, WeatherCondition> = {
  0: { label: 'Céu limpo', icon: '☀️' },
  1: { label: 'Predominantemente limpo', icon: '🌤️' },
  2: { label: 'Parcialmente nublado', icon: '⛅' },
  3: { label: 'Nublado', icon: '☁️' },
  45: { label: 'Névoa', icon: '🌫️' },
  48: { label: 'Névoa com geada', icon: '🌫️' },
  51: { label: 'Garoa leve', icon: '🌦️' },
  53: { label: 'Garoa moderada', icon: '🌦️' },
  55: { label: 'Garoa intensa', icon: '🌧️' },
  56: { label: 'Garoa congelante leve', icon: '🌧️' },
  57: { label: 'Garoa congelante intensa', icon: '🌧️' },
  61: { label: 'Chuva fraca', icon: '🌧️' },
  63: { label: 'Chuva moderada', icon: '🌧️' },
  65: { label: 'Chuva forte', icon: '🌧️' },
  66: { label: 'Chuva congelante leve', icon: '🌧️' },
  67: { label: 'Chuva congelante forte', icon: '🌧️' },
  71: { label: 'Neve leve', icon: '🌨️' },
  73: { label: 'Neve moderada', icon: '❄️' },
  75: { label: 'Neve intensa', icon: '❄️' },
  77: { label: 'Grãos de neve', icon: '❄️' },
  80: { label: 'Pancadas leves', icon: '🌦️' },
  81: { label: 'Pancadas moderadas', icon: '⛈️' },
  82: { label: 'Pancadas violentas', icon: '⛈️' },
  85: { label: 'Pancadas de neve leves', icon: '🌨️' },
  86: { label: 'Pancadas de neve fortes', icon: '❄️' },
  95: { label: 'Tempestade', icon: '⛈️' },
  96: { label: 'Tempestade com granizo', icon: '⛈️' },
  99: { label: 'Tempestade forte com granizo', icon: '🌩️' },
};

export const getCondition = (code: number): WeatherCondition =>
  WMO_CODES[code] ?? { label: 'Desconhecido', icon: '🌡️' };

export function getUvLabel(uv: number): string {
  if (uv < 3) return 'Baixo';
  if (uv < 6) return 'Moderado';
  if (uv < 8) return 'Alto';
  if (uv < 11) return 'Muito alto';
  return 'Extremo';
}

export type AppErrorKind = 'not-found' | 'offline' | 'unavailable' | 'unknown';

export class AppError extends Error {
  kind: AppErrorKind;
  constructor(kind: AppErrorKind, message: string) {
    super(message);
    this.kind = kind;
    this.name = 'AppError';
  }
}
