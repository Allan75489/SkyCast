import { AppError } from '../../types/Weather';
import './ErrorState.css';

interface Props {
  message: string;
  onRetry: () => void;
}

function resolveContent(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes('não encontr')) {
    return { icon: '🔍', title: 'Cidade não encontrada' };
  }
  if (lower.includes('conexão') || lower.includes('offline')) {
    return { icon: '📡', title: 'Sem conexão' };
  }
  if (lower.includes('indispon') || lower.includes('atualizar')) {
    return { icon: '☁️', title: 'Serviço indisponível' };
  }
  return { icon: '⚠️', title: 'Algo deu errado' };
}

export function ErrorState({ message, onRetry }: Props) {
  const { icon, title } = resolveContent(message);

  return (
    <div className="error-state" role="alert">
      <span className="error-icon" aria-hidden="true">
        {icon}
      </span>
      <p className="error-title">{title}</p>
      <p className="error-message">{message}</p>
      <button type="button" className="error-retry" onClick={onRetry}>
        Tentar novamente
      </button>
    </div>
  );
}

export { AppError };
