import './Loading.css';

export function Loading() {
  return (
    <div className="skeleton-wrap" aria-busy="true" aria-label="Carregando dados climáticos">
      <div className="skeleton skeleton-main">
        <div className="skeleton-row">
          <div>
            <div className="skeleton-line skeleton-city" />
            <div className="skeleton-line skeleton-time" />
          </div>
          <div className="skeleton-circle" />
        </div>
        <div className="skeleton-line skeleton-temp" />
        <div className="skeleton-row">
          <div className="skeleton-circle skeleton-icon" />
          <div>
            <div className="skeleton-line skeleton-cond" />
            <div className="skeleton-line skeleton-feels" />
          </div>
        </div>
        <div className="skeleton-stats">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      </div>
      <div className="skeleton-bottom">
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
      </div>
    </div>
  );
}
