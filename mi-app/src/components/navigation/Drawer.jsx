import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Home, BookOpen, Heart, Settings } from 'lucide-react';

const links = [
  { to: '/',          label: 'Inicio',    icon: Home },
  { to: '/pokedex',   label: 'Pokedex',   icon: BookOpen },
  { to: '/favorites', label: 'Favoritos', icon: Heart },
  { to: '/settings',  label: 'Ajustes',   icon: Settings },
];

export default function Drawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div className="drawer">
      <button
        className="drawer__toggle"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div
          className="drawer__overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`drawer__panel ${open ? 'is-open' : ''}`}>
        <div className="drawer__header">
          <span>Pokedex</span>
          <button onClick={() => setOpen(false)} aria-label="Cerrar menu">
            <X size={20} />
          </button>
        </div>

        <nav className="drawer__nav">
          {links.map(({ to, label, icon: Icon }) => {
            const active =
              to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <button
                key={to}
                className={`drawer__item ${active ? 'is-active' : ''}`}
                onClick={() => navigate(to)}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <footer className="drawer__footer">
          <small>PokeAPI - v2</small>
        </footer>
      </aside>

      <main className="drawer__content">
        <Outlet />
      </main>
    </div>
  );
}
