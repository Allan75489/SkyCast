import { useCallback, useState } from 'react';
import { getCurrentPosition, type Coordinates } from '../utils/location';

interface LocationState {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook fino sobre a API de geolocalização do navegador.
 * Usado pelo LocationButton para pedir permissão e obter coordenadas;
 * a busca de clima em si é orquestrada por useWeather.loadByCurrentPosition.
 */
export function useLocation() {
  const [state, setState] = useState<LocationState>({
    coordinates: null,
    loading: false,
    error: null,
  });

  const requestLocation = useCallback(async () => {
    setState({ coordinates: null, loading: true, error: null });
    try {
      const coordinates = await getCurrentPosition();
      setState({ coordinates, loading: false, error: null });
      return coordinates;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Não foi possível obter sua localização.';
      setState({ coordinates: null, loading: false, error: message });
      return null;
    }
  }, []);

  return { ...state, requestLocation };
}
