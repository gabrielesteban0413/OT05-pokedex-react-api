import { Navigate, Route, Routes } from 'react-router-dom';

import Drawer from '../components/navigation/Drawer';
import Tabs from '../components/navigation/Tabs';

import HomePage             from '../pages/HomePage';
import AllPokemonPage       from '../pages/AllPokemonPage';
import TypesPage            from '../pages/TypesPage';
import TypeDetailPage       from '../pages/TypeDetailPage';
import GenerationsPage      from '../pages/GenerationsPage';
import GenerationDetailPage from '../pages/GenerationDetailPage';
import PokemonDetailPage    from '../pages/PokemonDetailPage';
import FavoritesPage        from '../pages/FavoritesPage';
import SettingsPage         from '../pages/SettingsPage';
import NotFoundPage         from '../pages/NotFoundPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Drawer />}>
        <Route index element={<HomePage />} />

        <Route path="pokedex" element={<Tabs />}>
          <Route index element={<Navigate to="all" replace />} />
          <Route path="all" element={<AllPokemonPage />} />

          <Route path="types" element={<TypesPage />}>
            <Route path=":typeName" element={<TypeDetailPage />} />
          </Route>

          <Route path="generations" element={<GenerationsPage />}>
            <Route path=":genId" element={<GenerationDetailPage />} />
          </Route>

          <Route path=":id" element={<PokemonDetailPage />} />
        </Route>

        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="settings"  element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
