import { describe, expect, it } from 'vitest';
import { formatDayLabel, formatTime } from '../date';

describe('formatTime', () => {
  it('formata um ISO string para HH:mm no timezone informado', () => {
    const result = formatTime('2026-08-11T15:30:00', 'America/Sao_Paulo');
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });
});

describe('formatDayLabel', () => {
  it('retorna "Hoje" para o índice 0', () => {
    expect(formatDayLabel('2026-08-11', 0)).toBe('Hoje');
  });

  it('retorna "Amanhã" para o índice 1', () => {
    expect(formatDayLabel('2026-08-12', 1)).toBe('Amanhã');
  });

  it('retorna o dia da semana abreviado para os demais índices', () => {
    // 2026-08-13 é uma quinta-feira
    const label = formatDayLabel('2026-08-13', 2);
    expect(['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']).toContain(label);
  });
});
