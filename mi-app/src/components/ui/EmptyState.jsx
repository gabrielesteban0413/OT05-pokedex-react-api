import { SearchX } from 'lucide-react';

export default function EmptyState({ message = 'Sin resultados' }) {
  return (
    <div className="state state--empty">
      <SearchX size={28} />
      <p>{message}</p>
    </div>
  );
}
