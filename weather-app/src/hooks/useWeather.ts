import { useCallback, useState } from 'react';
import { fetchWeather, reverseGeocode } from '../services/weatherApi';
import { AppError, type GeoLocation, type WeatherData } from '../types/Weather';
import { getCurrentPosition } from '../utils/location';

interface WeatherState {
  data: WeatherData | null;
  location: GeoLocation | null;
  loading: boolean;
  error: string | null;
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    data: null,
    location: null,
    loading: false,
    error: null,
  });

  const loadByLocation = useCallback(async (location: GeoLocation) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetchWeather(location.latitude, location.longitude);
      setState({ data, location, loading: false, error: null });
    } catch (e) {
      const message = e instanceof AppError ? e.message : 'Erro desconhecido. Tente novamente.';
      setState((s) => ({ ...s, loading: false, error: message }));
    }
  }, []);

  const loadByCurrentPosition = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const coords = await getCurrentPosition();
      const location = await reverseGeocode(coords.latitude, coords.longitude);
      const data = await fetchWeather(coords.latitude, coords.longitude);
      setState({ data, location, loading: false, error: null });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro desconhecido. Tente novamente.';
      setState((s) => ({ ...s, loading: false, error: message }));
    }
  }, []);

  const retry = useCallback(() => {
    if (state.location) loadByLocation(state.location);
  }, [state.location, loadByLocation]);

  return { ...state, loadByLocation, loadByCurrentPosition, retry };
}
