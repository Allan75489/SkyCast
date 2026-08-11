import { useCallback, useEffect, useState } from 'react';
import type { GeoLocation } from '../types/Weather';

const STORAGE_KEY = 'skycast-history';
const MAX_ITEMS = 8;

function loadHistory(): GeoLocation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GeoLocation[]) : [];
  } catch {
    return [];
  }
}

function isSameLocation(a: GeoLocation, b: GeoLocation): boolean {
  return (
    a.name === b.name &&
    Math.abs(a.latitude - b.latitude) < 0.01 &&
    Math.abs(a.longitude - b.longitude) < 0.01
  );
}

export function useHistory() {
  const [history, setHistory] = useState<GeoLocation[]>(() => loadHistory());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((location: GeoLocation) => {
    setHistory((prev) => {
      const withoutDuplicate = prev.filter((item) => !isSameLocation(item, location));
      return [location, ...withoutDuplicate].slice(0, MAX_ITEMS);
    });
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return { history, addToHistory, clearHistory };
}
