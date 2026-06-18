import type { Pokemon } from '../types/pokemon'

type PokemonSilhouetteProps = {
  pokemon: Pokemon
  revealed: boolean
}

function PokemonSilhouette({ pokemon, revealed }: PokemonSilhouetteProps) {
  return (
    <img
      src={pokemon.image}
      alt={revealed ? pokemon.name : 'Hidden Pokémon silhouette'}
      className={`mx-auto h-64 w-64 transition ${
        revealed ? '' : 'brightness-0'
      }`}
    />
  )
}

export default PokemonSilhouette