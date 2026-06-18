import { useEffect, useState } from 'react'
import type React from 'react'
import GuessForm from './components/GuessForm'
import GuessHistory from './components/GuessHistory'
import PokemonSilhouette from './components/PokemonSilhouette'
import { getPokemon } from './services/pokeApi'
import type { Pokemon } from './types/pokemon'
import {
  comparePokemon,
  type GuessResult,
} from './utils/comparePokemon'

function App() {
  const [targetPokemon, setTargetPokemon] = useState<Pokemon | null>(null)
  const [guessHistory, setGuessHistory] = useState<GuessResult[]>([])
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [isCorrect, setIsCorrect] = useState(false)

  async function startNewGame() {
    setLoading(true)
    setTargetPokemon(null)
    setGuessHistory([])
    setGuess('')
    setMessage('')
    setIsCorrect(false)

    const randomId = Math.floor(Math.random() * 151) + 1

    try {
      const pokemon = await getPokemon(randomId)
      setTargetPokemon(pokemon)
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Failed to load a Pokémon',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    startNewGame()
  }, [])

  async function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!targetPokemon || !guess.trim() || isCorrect) {
      return
    }

    setMessage('')

    try {
      const pokemon = await getPokemon(guess.trim().toLowerCase())

      if (pokemon.id > 151) {
        setMessage('For now, only Pokémon from the original 151 are allowed.')
        return
      }

      const alreadyGuessed = guessHistory.some(
        (guessResult) => guessResult.pokemon.id === pokemon.id,
      )

      if (alreadyGuessed) {
        setMessage(`You already guessed ${pokemon.name}. Try another Pokémon.`)
        setGuess('')
        return
      }      

      if (pokemon.id === targetPokemon.id) {
        setIsCorrect(true)
        setMessage(`Correct! The Pokémon was ${targetPokemon.name}.`)
        setGuess('')
        return
      }

      const comparisonResult = comparePokemon(pokemon, targetPokemon)

      setGuessHistory((previousGuesses) => [
        {
          pokemon,
          comparison: comparisonResult,
        },
        ...previousGuesses,
      ])

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

        <p className="mt-4 text-sm text-slate-400">
          Attempts: {guessHistory.length}
        </p>        

        <div className="mt-8 rounded-2xl bg-slate-900 p-6">
          <PokemonSilhouette pokemon={targetPokemon} revealed={isCorrect} />

          <GuessForm
            guess={guess}
            onGuessChange={setGuess}
            onSubmit={handleSubmit}
            disabled={isCorrect}
          />

          {message && <p className="mt-4">{message}</p>}

          {isCorrect && (
            <button
              type="button"
              onClick={startNewGame}
              className="mt-4 rounded-lg bg-emerald-600 px-5 py-3 font-semibold"
            >
              New Game
            </button>
          )}
        </div>

        <GuessHistory guessHistory={guessHistory} />
      </div>
    </main>
  )
}

export default App