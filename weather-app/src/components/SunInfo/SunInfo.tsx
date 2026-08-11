import './SunInfo.css';

interface Props {
  sunrise: string;
  sunset: string;
}

export function SunInfo({ sunrise, sunset }: Props) {
  return (
    <div className="sun-info">
      <span>🌅 {sunrise}</span>
      <span>🌇 {sunset}</span>
    </div>
  );
}
