import { useEffect, useRef, useState } from 'react';
import { searchCities } from '../../services/weatherApi';
import type { GeoLocation } from '../../types/Weather';
import { getCountryFlag } from '../../utils/weather';
import './SearchBar.css';

interface Props {
  onSelect: (location: GeoLocation) => void;
  loading: boolean;
}

const DEBOUNCE_MS = 400;

export function SearchBar({ onSelect, loading }: Props) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const query = value.trim();

    debounceRef.current = setTimeout(async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setSearching(true);
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  const handleSelect = (location: GeoLocation) => {
    setValue('');
    setSuggestions([]);
    setOpen(false);
    onSelect(location);
  };

  return (
    <div className="searchbar-wrap" ref={wrapRef}>
      <div className="searchbar-input-row">
        <input
          className="searchbar-input"
          placeholder="Buscar cidade... ex: São Paulo, Tokyo, London"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          aria-label="Pesquisar cidade"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
        />
        {(loading || searching) && <span className="searchbar-spinner" aria-hidden="true" />}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="searchbar-suggestions" role="listbox">
          {suggestions.map((city, i) => (
            <li key={`${city.name}-${city.latitude}-${i}`}>
              <button
                type="button"
                className="searchbar-suggestion"
                onClick={() => handleSelect(city)}
                role="option"
              >
                <span className="suggestion-flag">{getCountryFlag(city.country_code)}</span>
                <span className="suggestion-text">
                  <span className="suggestion-name">{city.name}</span>
                  <span className="suggestion-meta">
                    {[city.admin1, city.country].filter(Boolean).join(', ')}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
