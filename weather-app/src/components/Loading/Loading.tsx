    import './Loading.css';

    export function Loading() {
    return (
        <div className="loading-wrap">
        <span className="loading-icon">🌍</span>
        <p className="loading-text">Buscando dados climáticos...</p>
        </div>
    );
    }