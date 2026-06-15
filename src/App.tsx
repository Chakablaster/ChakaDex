import { useEffect, useState } from 'react'
import type React from 'react'
import { getPokemon } from './services/pokeApi'
import type { Pokemon } from './types/pokemon'

type ComparisonResult = {
  id: 'higher' | 'lower' | 'match'
  height: 'higher' | 'lower' | 'match'
  weight: 'higher' | 'lower' | 'match'
  types: 'match' | 'partial' | 'none'
}

function compareNumber(
  guessedValue: number,
  targetValue: number,
): 'higher' | 'lower' | 'match' {
  if (guessedValue === targetValue) {
    return 'match'
  }

  return targetValue > guessedValue ? 'higher' : 'lower'
}

function compareTypes(
  guessedTypes: string[],
  targetTypes: string[],
): 'match' | 'partial' | 'none' {
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

function App() {
  const [targetPokemon, setTargetPokemon] = useState<Pokemon | null>(null)
  const [guessedPokemon, setGuessedPokemon] = useState<Pokemon | null>(null)
  const [comparison, setComparison] = useState<ComparisonResult | null>(null)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 151) + 1

    getPokemon(randomId)
      .then(setTargetPokemon)
      .catch((error: unknown) => {
        setMessage(
          error instanceof Error
            ? error.message
            : 'Failed to load a Pokémon',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  async function handleSubmit(
  event: React.SubmitEvent<HTMLFormElement>,
) {
    event.preventDefault()

    if (!targetPokemon || !guess.trim()) {
      return
    }

    setMessage('')

    try {
      const pokemon = await getPokemon(guess.trim().toLowerCase())

      if (pokemon.id > 151) {
        setMessage('For now, only Pokémon from the original 151 are allowed.')
        return
      }

      setGuessedPokemon(pokemon)

      if (pokemon.id === targetPokemon.id) {
        setComparison(null)
        setMessage(`Correct! The Pokémon was ${targetPokemon.name}.`)
        return
      }

      setComparison({
        id: compareNumber(pokemon.id, targetPokemon.id),
        height: compareNumber(pokemon.height, targetPokemon.height),
        weight: compareNumber(pokemon.weight, targetPokemon.weight),
        types: compareTypes(pokemon.types, targetPokemon.types),
      })

      setMessage('Not quite. Use the hints and try again.')
      setGuess('')
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : 'Something went wrong',
      )
    }
  }

  if (loading) {
    return <main className="p-8">Loading Pokémon...</main>
  }

  if (!targetPokemon) {
    return <main className="p-8">{message}</main>
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-bold">ChakaDex</h1>

        <p className="mt-2 text-slate-400">
          Guess the hidden Pokémon from the original 151.
        </p>

        <div className="mt-8 rounded-2xl bg-slate-900 p-6">
          <img
            src={targetPokemon.image}
            alt="Hidden Pokémon silhouette"
            className="mx-auto h-64 w-64 brightness-0"
          />

          <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
            <input
              type="text"
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              placeholder="Enter a Pokémon name"
              className="flex-1 rounded-lg bg-slate-800 px-4 py-3 outline-none"
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold"
            >
              Guess
            </button>
          </form>

          {message && <p className="mt-4">{message}</p>}
        </div>

        {guessedPokemon && comparison && (
          <div className="mt-6 rounded-2xl bg-slate-900 p-6">
            <div className="flex items-center gap-4">
              <img
                src={guessedPokemon.image}
                alt={guessedPokemon.name}
                className="h-24 w-24"
              />

              <div>
                <h2 className="text-xl font-semibold capitalize">
                  {guessedPokemon.name}
                </h2>

                <p className="text-slate-400">
                  Pokédex #{guessedPokemon.id}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <p>Pokédex number: {comparison.id}</p>
              <p>Height: {comparison.height}</p>
              <p>Weight: {comparison.weight}</p>
              <p>Type: {comparison.types}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App