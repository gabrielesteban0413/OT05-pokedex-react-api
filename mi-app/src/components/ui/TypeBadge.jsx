import { TYPE_COLORS } from '../../utils/constants';
import { capitalize } from '../../utils/pokemon';

export default function TypeBadge({ type }) {
  const bg = TYPE_COLORS[type] || '#64748b';
  return (
    <span className="type-badge" style={{ backgroundColor: bg }}>
      {capitalize(type)}
    </span>
  );
}
