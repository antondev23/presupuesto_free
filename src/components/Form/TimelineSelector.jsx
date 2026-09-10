import { Zap, Calendar, Clock, Hourglass } from 'lucide-react'

const TIEMPOS = [
  { value: 'menos_1_mes', label: 'Menos de 1 mes', icon: Zap },
  { value: '1_3_meses', label: '1 - 3 meses', icon: Calendar },
  { value: '3_6_meses', label: '3 - 6 meses', icon: Clock },
  { value: 'mas_6_meses', label: 'Más de 6 meses', icon: Hourglass },
]

function TimelineSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {TIEMPOS.map(({ value: tiempoValue, label, icon: Icon }) => {
        const selected = value === tiempoValue
        return (
          <button
            key={tiempoValue}
            type="button"
            onClick={() => onChange(tiempoValue)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-[11px] font-medium leading-tight text-center transition-colors ${
              selected
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
            required
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default TimelineSelector