import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { PokemonURLData, PokemonCardType, PokemonFull } from '../../types';

type PokemonState = {
  shortList: PokemonURLData[];
  currentPokemon: PokemonURLData | null;
  fullList: PokemonCardType[];
};

const initialState: PokemonState = {
  shortList: [],
  currentPokemon: null,
  fullList: [],
};

const mapper=(p:PokemonFull):PokemonCardType=>{
  return {
    name:p.name,
    id: p.id.toString(),
    picture_url: p.sprites.other?.dream_world.front_default!, // `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
    type: p.types[0].type.name,
    HP: p.stats.filter( elem => elem.stat.name === 'HP')[0]?.base_stat,
    height: p.height,
    weight: p.weight,
  }
}

const PokemonSlice = createSlice({
  name: 'Pokemon',
  initialState,
  reducers: {
    setShortList(state, action) {
      state.shortList = action.payload;
    },
    setFullList(state: PokemonState, action: PayloadAction<PokemonFull[]>) {
      state.fullList = action.payload.map(mapper)
    },
    addToFullList(state, action) {
      state.fullList.push(action.payload);
    },
  },
});

export const { setShortList, setFullList, addToFullList } = PokemonSlice.actions;
export default PokemonSlice.reducer;
