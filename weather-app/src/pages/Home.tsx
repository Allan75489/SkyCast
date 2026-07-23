    import { useWeather } from '../hooks/useWeather';
    import { useTheme } from '../hooks/useTheme';
    import { SearchBar } from '../components/SearchBar/SearchBar';
    import { WeatherCard } from '../components/WeatherCard/WeatherCard';
    import { Loading } from '../components/Loading/Loading';
    import '../styles/variables.css';
    import './Home.css';

    export function Home() {
    const { data, location, loading, error, search } = useWeather();
    const { theme, toggle } = useTheme();

    return (
        <div className="home">
        <div className="home-orb home-orb1" />
        <div className="home-orb home-orb2" />

        <div className="home-content">
            <div className="home-header">
            <div>
                <h1 className="home-title">Tempo <em>agora</em></h1>
                <p className="home-subtitle">Dados em tempo real via Open-Meteo</p>
            </div>
            <button className="theme-btn" onClick={toggle} title="Alternar tema">
                {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            </div>

            <SearchBar onSearch={search} loading={loading} />

            {error && (
            <div className="home-error">⚠️ {error}</div>
            )}

            {loading && <Loading />}

            {!loading && !data && !error && (
            <div className="home-empty">
                <p className="home-empty-icon">🌤️</p>
                <p className="home-empty-text">Digite uma cidade para ver o clima atual</p>
            </div>
            )}

            {!loading && data && location && (
            <WeatherCard data={data} location={location} />
            )}

        </div>
        </div>
    );
    }