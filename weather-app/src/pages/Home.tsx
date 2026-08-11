import { CurrentWeather } from '../components/CurrentWeather/CurrentWeather';
import { DailyForecast } from '../components/DailyForecast/DailyForecast';
import { ErrorState } from '../components/ErrorState/ErrorState';
import { Favorites } from '../components/Favorites/Favorites';
import { History } from '../components/History/History';
import { HourlyForecast } from '../components/HourlyForecast/HourlyForecast';
import { Loading } from '../components/Loading/Loading';
import { LocationButton } from '../components/LocationButton/LocationButton';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { ThemeToggle } from '../components/ThemeToggle/ThemeToggle';
import { useFavorites } from '../hooks/useFavorites';
import { useHistory } from '../hooks/useHistory';
import { useTheme } from '../hooks/useTheme';
import { useWeather } from '../hooks/useWeather';
import type { GeoLocation } from '../types/Weather';
import '../styles/variables.css';
import './Home.css';

export function Home() {
  const { data, location, loading, error, loadByLocation, loadByCurrentPosition, retry } =
    useWeather();
  const { theme, toggle } = useTheme();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { history, addToHistory } = useHistory();

  const handleSelectLocation = (selected: GeoLocation) => {
    addToHistory(selected);
    loadByLocation(selected);
  };

  return (
    <div className="home">
      <div className="home-orb home-orb1" />
      <div className="home-orb home-orb2" />

      <div className="home-content">
        <div className="home-header">
          <div>
            <h1 className="home-title">
              Sky<em>Cast</em>
            </h1>
            <p className="home-subtitle">Previsão do tempo em tempo real via Open-Meteo</p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>

        <SearchBar onSelect={handleSelectLocation} loading={loading} />

        <LocationButton onClick={loadByCurrentPosition} loading={loading} />

        <Favorites favorites={favorites} onSelect={handleSelectLocation} />
        <History history={history} onSelect={handleSelectLocation} />

        {error && <ErrorState message={error} onRetry={retry} />}

        {loading && <Loading />}

        {!loading && !error && !data && (
          <div className="home-empty">
            <p className="home-empty-icon">🌤️</p>
            <p className="home-empty-text">Digite uma cidade para ver o clima atual</p>
          </div>
        )}

        {!loading && !error && data && location && (
          <div className="home-weather">
            <CurrentWeather
              current={data.current}
              location={location}
              timezone={data.timezone}
              sunrise={data.daily.sunrise[0]}
              sunset={data.daily.sunset[0]}
              isFavorite={isFavorite(location)}
              onToggleFavorite={() => toggleFavorite(location)}
            />

            <div className="home-bottom">
              <DailyForecast daily={data.daily} />
              <HourlyForecast hourly={data.hourly} timezone={data.timezone} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
