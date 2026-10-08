import client from '../api/client';

export const getAllPokemon     = ()          => client.get('/pokemon?limit=1302');
export const getPokemonById    = (idOrName)  => client.get(`/pokemon/${idOrName}`);
export const getAllTypes       = ()          => client.get('/type');
export const getByType         = (typeName)  => client.get(`/type/${typeName}`);
export const getAllGenerations = ()          => client.get('/generation');
export const getByGeneration   = (genId)     => client.get(`/generation/${genId}`);
