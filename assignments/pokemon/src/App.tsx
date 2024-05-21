import { useDispatch } from 'react-redux';
import { fetchAllPokemon, fetchOnePokemon } from './request';
import { PokemonCardType, PokemonURLData } from './types';
import { addToFullList, setFullList, setShortList } from './store/slices/pokemon.slice';
import { useEffect } from 'react';
import PokemonCard from './components/pokemoncard';
import { useAppSelector } from './store';

async function GetData() {
  const shortList = await fetchAllPokemon();

  const pokemons = await Promise.all(
    shortList.map(async (item) => {
      return await fetchOnePokemon(item.id);
    })
  );

  return { pokemons, shortList };
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetchAllPokemon().then((result) => {
    //   dispatch(setShortList(result));
    //   const tempArray = []
    //   result.map((p: PokemonURLData) => {

    //     fetchOnePokemon(p.id).then((data) => {
    //       dispatch(addToFullList(data));
    //     });
    //   });
    // });

    GetData().then(({ pokemons, shortList }) => {
      // store all
      dispatch(setShortList(shortList));
      dispatch(setFullList(pokemons));
    });
  }, []);

  const cardsList = useAppSelector((state) => state.Pokemon.fullList);

  return (
    <>
      <h1 className="bg-blue-500 text-center justify-center">Hello Pokemon</h1>
      <div>
        {cardsList.map((pokemon)=><PokemonCard key={pokemon.id} pokemon={pokemon} />)}
      </div>
    </>
  );
}

export default App;
