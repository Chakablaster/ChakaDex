import type { Pokemon } from '../types/pokemon'

export type NumberComparison = 'higher' | 'lower' | 'match'
export type TypeComparison = 'match' | 'partial' | 'none'

export type ComparisonResult = {
  id: NumberComparison
  height: NumberComparison
  weight: NumberComparison
  types: TypeComparison
}

export type GuessResult = {
  pokemon: Pokemon
  comparison: ComparisonResult
}

export function compareNumber(
  guessedValue: number,
  targetValue: number,
): NumberComparison {
  if (guessedValue === targetValue) {
    return 'match'
  }

  return targetValue > guessedValue ? 'higher' : 'lower'
}

export function compareTypes(
  guessedTypes: string[],
  targetTypes: string[],
): TypeComparison {
  const exactMatch =
    guessedTypes.length === targetTypes.length &&
    guessedTypes.every((type) => targetTypes.includes(type))

  if (exactMatch) {
    return 'match'
  }

  const partialMatch = guessedTypes.some((type) =>
    targetTypes.includes(type),
  )

  return partialMatch ? 'partial' : 'none'
}

export function comparePokemon(
  guessedPokemon: Pokemon,
  targetPokemon: Pokemon,
): ComparisonResult {
  return {
    id: compareNumber(guessedPokemon.id, targetPokemon.id),
    height: compareNumber(guessedPokemon.height, targetPokemon.height),
    weight: compareNumber(guessedPokemon.weight, targetPokemon.weight),
    types: compareTypes(guessedPokemon.types, targetPokemon.types),
  }
}