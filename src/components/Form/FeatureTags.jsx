const FUNCIONALIDADES = [
  'Autenticación de usuarios',
  'Panel de administración',
  'Pasarela de pagos',
  'API / Integraciones',
  'Notificaciones',
  'Multiidioma',
  'Analíticas',
  'Diseño responsivo',
]

function FeatureTags({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FUNCIONALIDADES.map((item) => {
        const isSelected = selected.includes(item)
        return (
          <button
            key={item}
            type="button"
            onClick={() => onToggle(item)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              isSelected
                ? 'border-green-500 bg-green-500 text-white'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export default FeatureTags