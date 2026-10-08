import { NavLink, Outlet } from 'react-router-dom';
import { ListOrdered, Flame, Dna } from 'lucide-react';

const tabs = [
  { to: 'all',         label: 'Todos',        icon: ListOrdered },
  { to: 'types',       label: 'Tipos',        icon: Flame },
  { to: 'generations', label: 'Generaciones', icon: Dna },
];

export default function Tabs() {
  return (
    <div className="tabs">
      <nav className="tabs__bar" role="tablist">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            role="tab"
            className={({ isActive }) =>
              `tabs__item ${isActive ? 'is-active' : ''}`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="tabs__content">
        <Outlet />
      </div>
    </div>
  );
}
