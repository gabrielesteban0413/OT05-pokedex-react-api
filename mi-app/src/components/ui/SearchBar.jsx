import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div className="searchbar">
      <Search size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
