    import { useWeather } from '../hooks/useWeather';
    import { SearchBar } from '../components/SearchBar/SearchBar';
    import { WeatherCard } from '../components/WeatherCard/WeatherCard';
    import { Loading } from '../components/Loading/Loading';

    export function Home() {
    const { data, location, loading, error, search } = useWeather();

    return (
        <div className="min-h-screen flex flex-col items-center px-5 py-10 relative overflow-hidden">
        {/* Orbs de fundo */}
        <div className="fixed w-[500px] h-[500px] -top-36 -left-24 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="fixed w-[400px] h-[400px] -bottom-24 -right-24 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-9">
            <h1 className="font-['DM_Serif_Display'] text-5xl text-slate-100 leading-tight tracking-tight">
                Tempo <em className="text-blue-300">agora</em>
            </h1>
            <p className="text-sm text-slate-500 mt-2 font-light tracking-wide">
                Dados em tempo real via Open-Meteo
            </p>
            </div>

            <SearchBar onSearch={search} loading={loading} />

            {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-center text-red-300 text-sm mb-4">
                ⚠️ {error}
            </div>
            )}

            {loading && <Loading />}

            {!loading && !data && !error && (
            <div className="text-center py-16">
                <p className="text-6xl mb-4 opacity-30">🌤️</p>
                <p className="text-slate-500 font-light">Digite uma cidade para ver o clima atual</p>
            </div>
            )}

            {!loading && data && location && (
            <WeatherCard data={data} location={location} />
            )}

            <p className="text-center text-xs text-slate-700 mt-6">
            Open-Meteo API · Gratuita, sem API key
            </p>
        </div>
        </div>
    );
    }