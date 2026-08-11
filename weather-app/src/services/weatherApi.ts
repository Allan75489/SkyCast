import { AppError, type GeoLocation, type WeatherData } from '../types/Weather';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const CURRENT_PARAMS =
  'temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,precipitation';
const HOURLY_PARAMS = 'temperature_2m,weather_code,precipitation_probability';
const DAILY_PARAMS =
  'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max';

/** Faz fetch tratando erros de rede (offline) e HTTP de forma padronizada. */
async function safeFetch(url: string): Promise<Response> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new AppError('offline', 'Verifique sua conexão e tente novamente.');
  }

  if (!response.ok) {
    throw new AppError(
      'unavailable',
      'Não conseguimos atualizar os dados agora. Tente novamente em instantes.'
    );
  }

  return response;
}

/**
 * Pesquisa cidades pelo nome, retornando múltiplos resultados
 * (o usuário escolhe qual localização carregar).
 */
export async function searchCities(query: string, count = 6): Promise<GeoLocation[]> {
  const url =
    `${GEOCODING_BASE_URL}/search?name=${encodeURIComponent(query)}` +
    `&count=${count}&language=pt&format=json`;

  const response = await safeFetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new AppError('not-found', 'Não encontramos essa cidade. Tente pesquisar novamente.');
  }

  return data.results as GeoLocation[];
}

/** Geocodificação reversa: converte coordenadas em um nome de local legível. */
export async function reverseGeocode(latitude: number, longitude: number): Promise<GeoLocation> {
  const url =
    `${GEOCODING_BASE_URL}/search?latitude=${latitude}&longitude=${longitude}` +
    `&count=1&language=pt&format=json`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0] as GeoLocation;
      }
    }
  } catch {
    // Reverse geocoding é best-effort: se falhar, caímos no fallback abaixo.
  }

  // Fallback: sem nome de cidade disponível, ainda assim mostramos o clima.
  return {
    name: 'Minha localização',
    latitude,
    longitude,
  };
}

/** Busca o clima atual, previsão horária (24h) e diária (7 dias) para uma coordenada. */
export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherData> {
  const url =
    `${FORECAST_BASE_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&current=${CURRENT_PARAMS}` +
    `&hourly=${HOURLY_PARAMS}` +
    `&daily=${DAILY_PARAMS}` +
    `&wind_speed_unit=kmh&timezone=auto&forecast_days=7`;

  const response = await safeFetch(url);
  return response.json() as Promise<WeatherData>;
}
