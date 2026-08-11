const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/** Formata um ISO string para HH:mm no timezone informado pela API. */
export function formatTime(iso: string, timezone: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  });
}

/** Formata a data/hora atual no timezone do local pesquisado. */
export function formatCurrentTime(timezone: string): string {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  });
}

export function formatCurrentDate(timezone: string): string {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    timeZone: timezone,
  });
}

/**
 * Rótulo de dia (Hoje / Amanhã / dia da semana) para um item da previsão diária.
 * Usa meio-dia local (T12:00:00) para evitar que o fuso do navegador
 * empurre a data para o dia anterior/seguinte.
 */
export function formatDayLabel(dateStr: string, index: number): string {
  if (index === 0) return 'Hoje';
  if (index === 1) return 'Amanhã';
  const d = new Date(`${dateStr}T12:00:00`);
  return WEEKDAYS_SHORT[d.getDay()];
}

/**
 * Retorna apenas os horários futuros (a partir de "agora" no timezone do local)
 * de um array hourly.time da API, junto com seus índices originais.
 * Comparação feita via epoch (ISO da API já é aware o suficiente para isso),
 * não via `new Date()` bruto comparado a uma string sem timezone.
 */
export function getUpcomingHourIndices(hourlyTimes: string[], timezone: string, limit = 24): number[] {
  const nowInTz = new Date(
    new Date().toLocaleString('en-US', { timeZone: timezone })
  );
  const indices: number[] = [];
  for (let i = 0; i < hourlyTimes.length && indices.length < limit; i++) {
    const slot = new Date(hourlyTimes[i]);
    if (slot >= nowInTz) indices.push(i);
  }
  return indices;
}
