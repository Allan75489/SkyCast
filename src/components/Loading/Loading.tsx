    export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
        <span className="text-5xl animate-pulse">🌍</span>
        <p className="text-slate-500 text-sm font-light">Buscando dados climáticos...</p>
        </div>
    );
    }