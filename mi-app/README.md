
## Patrones de navegacion
y la API publica de PokeAPI (https://pokeapi.co).
- Tabs: filtros dentro de la Pokedex (Todos / Tipos / Generaciones).
- Stack: lista -> detalle del Pokemon.

## Comandos
    npm install
    npm run dev
    npm run build

## Estructura
    src/
      api/          -> cliente HTTP
      services/     -> endpoints PokeAPI
      hooks/        -> hooks reutilizables
      context/      -> estado global (favoritos)
      components/   -> UI y layouts de navegacion
      pages/        -> vistas por ruta
      routes/       -> arbol de rutas
      utils/        -> constantes y helpers
