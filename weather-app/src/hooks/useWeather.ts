    import { useState, useCallback } from 'react';
    import { geocode, fetchWeather } from '../services/weatherApi';
    import type { Location, WeatherData } from '../types/Weather';

    interface WeatherState {
    data: WeatherData | null;
    location: Location | null;
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

    const search = useCallback(async (city: string) => {
        setState(s => ({ ...s, loading: true, error: null }));
        try {
        const location = await geocode(city);
        const data = await fetchWeather(location.latitude, location.longitude);
        setState({ data, location, loading: false, error: null });
        } catch (e) {
        const msg = e instanceof Error ? e.message : 'Erro desconhecido';
        setState(s => ({ ...s, loading: false, error: msg }));
        }
    }, []);

    return { ...state, search };
    }