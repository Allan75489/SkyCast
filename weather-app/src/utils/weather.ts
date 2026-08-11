import { getCondition, getUvLabel, type WeatherCondition } from '../types/Weather';

/** Retorna ícone + label para um código meteorológico WMO. */
export function getWeatherCondition(code: number): WeatherCondition {
  return getCondition(code);
}

/** Converte um código de país (ISO 3166-1 alpha-2) em emoji de bandeira. */
export function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return '';
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export { getUvLabel };
