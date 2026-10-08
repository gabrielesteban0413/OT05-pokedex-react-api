# Pokedex - Stack + Tabs + Drawer

App de practica con arquitectura limpia usando React 19 + Vite + React Router 7
y la API publica de PokeAPI (https://pokeapi.co).

## Patrones de navegacion
- Drawer: menu lateral global.
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
