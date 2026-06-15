import type { Pokemon } from '../types/pokemon'

type PokeApiPokemon = {
  id: number
  name: string
  height: number
  weight: number
  types: {
    type: {
      name: string
    }
  }[]
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null
      }
    }
  }
}

export async function getPokemon(
  idOrName: number | string,
): Promise<Pokemon> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${idOrName}`,
  )

  if (!response.ok) {
    throw new Error(`Pokémon "${idOrName}" could not be found`)
  }

  const data: PokeApiPokemon = await response.json()

  const image = data.sprites.other['official-artwork'].front_default

  if (!image) {
    throw new Error(`No image found for ${data.name}`)
  }

  return {
    id: data.id,
    name: data.name,
    image,
    types: data.types.map((entry) => entry.type.name),
    height: data.height,
    weight: data.weight,
  }
}