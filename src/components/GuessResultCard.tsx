import type {
  NumberComparison,
  TypeComparison,
  GuessResult,
} from '../utils/comparePokemon'

type GuessResultCardProps = {
  guessResult: GuessResult
}

type StatTileProps = {
  label: string
  value: string
  icon: string
  tone: string
}

function formatDexNumber(id: number) {
  return `#${id.toString().padStart(3, '0')}`
}

function getNumberValue(
  comparison: NumberComparison,
  label: 'dex' | 'height' | 'weight',
) {
  if (comparison === 'match') {
    return 'Match'
  }

  if (label === 'height') {
    return comparison === 'higher' ? 'Taller' : 'Shorter'
  }

  if (label === 'weight') {
    return comparison === 'higher' ? 'Heavier' : 'Lighter'
  }

  return comparison === 'higher' ? 'Higher' : 'Lower'
}

function getTypeValue(comparison: TypeComparison) {
  if (comparison === 'match') {
    return 'Match'
  }

  if (comparison === 'partial') {
    return 'Partial'
  }

  return 'Miss'
}

function getNumberIcon(comparison: NumberComparison) {
  if (comparison === 'match') {
    return '✓'
  }

  return comparison === 'higher' ? '↑' : '↓'
}

function getTypeIcon(comparison: TypeComparison) {
  if (comparison === 'match') {
    return '✓'
  }

  if (comparison === 'partial') {
    return '◐'
  }

  return '✕'
}

function getTileTone(comparison: NumberComparison | TypeComparison) {
  if (comparison === 'match') {
    return 'border-emerald-400/30 bg-gradient-to-br from-emerald-500/18 to-emerald-900/30 text-emerald-100'
  }

  if (comparison === 'partial') {
    return 'border-amber-400/30 bg-gradient-to-br from-amber-500/18 to-amber-900/30 text-amber-100'
  }

  if (comparison === 'none') {
    return 'border-rose-400/30 bg-gradient-to-br from-rose-500/18 to-rose-900/30 text-rose-100'
  }

  return 'border-cyan-400/30 bg-gradient-to-br from-cyan-500/18 to-sky-900/30 text-cyan-100'
}

function StatTile({ label, value, icon, tone }: StatTileProps) {
  return (
    <div
      className={`relative flex min-h-24 flex-col overflow-hidden rounded-xl border px-4 py-3 ${tone}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="flex h-9 items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
          {label}
        </p>

        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-bold text-white">
          {icon}
        </span>
      </div>

      <p className="mt-3 text-center text-xl font-bold leading-none">{value}</p>
    </div>
  )
}

function GuessResultCard({ guessResult }: GuessResultCardProps) {
  const { pokemon, comparison } = guessResult

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-lg shadow-black/20">
      <div className="grid grid-cols-[2.1fr_repeat(4,1fr)] gap-2">
        <div className="flex min-h-24 items-center gap-4 px-4 py-3">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="h-18 w-18 shrink-0"
          />

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold capitalize text-white">
              {pokemon.name}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {formatDexNumber(pokemon.id)}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-semibold capitalize text-slate-200"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        <StatTile
          label="Dex No."
          value={getNumberValue(comparison.id, 'dex')}
          icon={getNumberIcon(comparison.id)}
          tone={getTileTone(comparison.id)}
        />

        <StatTile
          label="Height"
          value={getNumberValue(comparison.height, 'height')}
          icon={getNumberIcon(comparison.height)}
          tone={getTileTone(comparison.height)}
        />

        <StatTile
          label="Weight"
          value={getNumberValue(comparison.weight, 'weight')}
          icon={getNumberIcon(comparison.weight)}
          tone={getTileTone(comparison.weight)}
        />

        <StatTile
          label="Type"
          value={getTypeValue(comparison.types)}
          icon={getTypeIcon(comparison.types)}
          tone={getTileTone(comparison.types)}
        />
      </div>
    </div>
  )
}

export default GuessResultCard