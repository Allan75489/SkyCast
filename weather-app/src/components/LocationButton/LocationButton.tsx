import './LocationButton.css';

interface Props {
  onClick: () => void;
  loading: boolean;
}

export function LocationButton({ onClick, loading }: Props) {
  return (
    <button
      type="button"
      className="location-btn"
      onClick={onClick}
      disabled={loading}
      aria-label="Usar minha localização"
      title="Usar minha localização"
    >
      <span aria-hidden="true">📍</span>
      <span>{loading ? 'Localizando...' : 'Usar minha localização'}</span>
    </button>
  );
}
