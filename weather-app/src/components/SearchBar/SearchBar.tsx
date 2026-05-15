    import { useState } from 'react';

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
        <div className="flex gap-3 mb-8">
        <input
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-base text-slate-100 placeholder-slate-500 outline-none focus:border-blue-400/40 focus:bg-white/8 transition-all font-['Outfit']"
            placeholder="Buscar cidade... ex: São Paulo, Tokyo, London"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <button
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium rounded-2xl px-6 py-4 transition-all active:scale-95 whitespace-nowrap"
            onClick={submit}
            disabled={loading}
        >
            {loading ? '...' : 'Buscar'}
        </button>
        </div>
    );
    }