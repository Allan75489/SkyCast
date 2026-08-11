import { describe, expect, it } from 'vitest';
import { getWeatherCondition } from '../weather';
import { getCountryFlag } from '../weather';

describe('getWeatherCondition', () => {
  it('retorna a condição correta para um código conhecido', () => {
    expect(getWeatherCondition(0)).toEqual({ label: 'Céu limpo', icon: '☀️' });
    expect(getWeatherCondition(61)).toEqual({ label: 'Chuva fraca', icon: '🌧️' });
    expect(getWeatherCondition(95)).toEqual({ label: 'Tempestade', icon: '⛈️' });
  });

  it('retorna um fallback para códigos desconhecidos', () => {
    expect(getWeatherCondition(9999)).toEqual({ label: 'Desconhecido', icon: '🌡️' });
  });
});

describe('getCountryFlag', () => {
  it('converte um código de país válido em emoji de bandeira', () => {
    expect(getCountryFlag('BR')).toBe('🇧🇷');
    expect(getCountryFlag('US')).toBe('🇺🇸');
  });

  it('é case-insensitive', () => {
    expect(getCountryFlag('br')).toBe('🇧🇷');
  });

  it('retorna string vazia para entrada inválida ou ausente', () => {
    expect(getCountryFlag(undefined)).toBe('');
    expect(getCountryFlag('')).toBe('');
    expect(getCountryFlag('BRA')).toBe('');
  });
});
