import type { GuessResult } from '../utils/comparePokemon'

type GuessResultCardProps = {
  guessResult: GuessResult
}

function GuessResultCard({ guessResult }: GuessResultCardProps) {
  const { pokemon, comparison } = guessResult

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <div className="flex items-center gap-4">
        <img src={pokemon.image} alt={pokemon.name} className="h-24 w-24" />

        <div>
          <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>

          <p className="text-slate-400">Pokédex #{pokemon.id}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <p>Pokédex number: {comparison.id}</p>
        <p>Height: {comparison.height}</p>
        <p>Weight: {comparison.weight}</p>
        <p>Type: {comparison.types}</p>
      </div>
    </div>
  )
}

export default GuessResultCard