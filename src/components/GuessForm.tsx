import type React from 'react'

type GuessFormProps = {
  guess: string
  onGuessChange: (guess: string) => void
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
  disabled: boolean
}

function GuessForm({
  guess,
  onGuessChange,
  onSubmit,
  disabled,
}: GuessFormProps) {
  return (
    <form onSubmit={onSubmit} className="mt-6 flex gap-3">
      <input
        type="text"
        value={guess}
        onChange={(event) => onGuessChange(event.target.value)}
        placeholder="Enter a Pokémon name"
        disabled={disabled}
        className="flex-1 rounded-lg bg-slate-800 px-4 py-3 outline-none disabled:cursor-not-allowed disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={disabled}
        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
      >
        Guess
      </button>
    </form>
  )
}

export default GuessForm