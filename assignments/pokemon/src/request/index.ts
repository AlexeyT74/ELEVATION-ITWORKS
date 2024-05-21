import axios from 'axios';
import type { PokemonURLData } from '../types';

export const fetchAllPokemon = async (): Promise<PokemonURLData[]> => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
      return response.data.results.map((poke: any) => {
        const id = parseInt(poke.url.split('/').filter(Boolean).pop(), 10);
        return { ...poke, id };
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export const fetchOnePokemon = async (id: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(error)
    return null
  }
};