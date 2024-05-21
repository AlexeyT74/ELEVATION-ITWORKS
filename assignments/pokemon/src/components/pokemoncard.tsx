import type { PokemonCardType } from '../types';

const PokemonCard = ({ pokemon }: { pokemon: PokemonCardType }) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover object-center" src={pokemon.picture_url} />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-900">{pokemon.name}</h2>
        <p className="text-gray-700 mt-2">{pokemon.type}</p>
        <p className="text-gray-700 mt-2">{pokemon.weight}</p>
        <p className="text-gray-700 mt-2">{pokemon.height}</p>
        <p className="text-gray-700 mt-2">{pokemon.HP}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
