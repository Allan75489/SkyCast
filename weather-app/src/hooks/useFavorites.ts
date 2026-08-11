import { useCallback, useEffect, useState } from 'react';
import type { GeoLocation } from '../types/Weather';

const STORAGE_KEY = 'skycast-favorites';

function loadFavorites(): GeoLocation[] {
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

export function useFavorites() {
  const [favorites, setFavorites] = useState<GeoLocation[]>(() => loadFavorites());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (location: GeoLocation) => favorites.some((f) => isSameLocation(f, location)),
    [favorites]
  );

  const toggleFavorite = useCallback((location: GeoLocation) => {
    setFavorites((prev) =>
      prev.some((f) => isSameLocation(f, location))
        ? prev.filter((f) => !isSameLocation(f, location))
        : [...prev, location]
    );
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}
