import type { GuessResult } from '../utils/comparePokemon'
import GuessResultCard from './GuessResultCard'

type GuessHistoryProps = {
  guessHistory: GuessResult[]
}

function GuessHistory({ guessHistory }: GuessHistoryProps) {
  if (guessHistory.length === 0) {
    return null
  }

  return (
    <div className="mt-6 space-y-4">
      {guessHistory.map((guessResult) => (
        <GuessResultCard
          key={guessResult.pokemon.id}
          guessResult={guessResult}
        />
      ))}
    </div>
  )
}

export default GuessHistory