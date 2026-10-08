import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AppRouter />
      </FavoritesProvider>
    </BrowserRouter>
  );
}
