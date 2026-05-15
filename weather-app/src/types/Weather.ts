export interface Location {
  name: string;
  admin1?: string;
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

export interface WeatherData {
  timezone: string;

  current: CurrentWeather;

  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };

  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  };
}

export interface WeatherCondition {
  label: string;
  icon: string;
}

    
    export const WMO_CODES: Record<number, WeatherCondition> = {
    0:  { label: 'Céu limpo', icon: '☀️' },
    1:  { label: 'Predominantemente limpo', icon: '🌤️' },
    2:  { label: 'Parcialmente nublado', icon: '⛅' },
    3:  { label: 'Nublado', icon: '☁️' },
    45: { label: 'Névoa', icon: '🌫️' },
    48: { label: 'Névoa com geada', icon: '🌫️' },
    51: { label: 'Garoa leve', icon: '🌦️' },
    53: { label: 'Garoa moderada', icon: '🌦️' },
    55: { label: 'Garoa intensa', icon: '🌧️' },
    61: { label: 'Chuva fraca', icon: '🌧️' },
    63: { label: 'Chuva moderada', icon: '🌧️' },
    65: { label: 'Chuva forte', icon: '🌧️' },
    71: { label: 'Neve leve', icon: '🌨️' },
    73: { label: 'Neve moderada', icon: '❄️' },
    75: { label: 'Neve intensa', icon: '❄️' },
    80: { label: 'Pancadas leves', icon: '🌦️' },
    81: { label: 'Pancadas moderadas', icon: '⛈️' },
    82: { label: 'Pancadas violentas', icon: '⛈️' },
    95: { label: 'Tempestade', icon: '⛈️' },
    96: { label: 'Tempestade com granizo', icon: '⛈️' },
    99: { label: 'Tempestade forte com granizo', icon: '🌩️' },
    };

    export const getCondition = (code: number): WeatherCondition =>
    WMO_CODES[code] ?? { label: 'Desconhecido', icon: '🌡️' };