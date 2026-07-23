    import { useState } from 'react';
    import './SearchBar.css';

    interface Props {
    onSearch: (city: string) => void;
    loading: boolean;
    }

    export function SearchBar({ onSearch, loading }: Props) {
    const [value, setValue] = useState('');

    const submit = () => {
        if (value.trim()) onSearch(value.trim());
    };

    return (
        <div className="searchbar-wrap">
        <input
            className="searchbar-input"
            placeholder="Buscar cidade... ex: São Paulo, Tokyo, London"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <button className="searchbar-btn" onClick={submit} disabled={loading}>
            {loading ? '...' : 'Buscar'}
        </button>
        </div>
    );
    }