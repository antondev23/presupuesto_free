const FUNCIONALIDADES = [
  'Autenticación de usuarios',
  'Panel de administración',
  'Pasarela de pagos',
  'API / Integraciones',
  'Notificaciones',
  'Multiidioma',
  'Analíticas',
  'Diseño responsivo',
  'Otros',
]

function FeatureTags({ selected, onToggle, otroValue, onOtroChange, onOtroConfirm }) {
  const isOtroSelected = selected.includes('Otros')
  const customFeatures = selected.filter((item) => !FUNCIONALIDADES.includes(item))

  const handleOtherKeyDown = (event) => {
    if (event.key !== 'Enter') return

    event.preventDefault()
    onOtroConfirm(otroValue)
    onOtroChange('')
  }

  return (
    <div>
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
        {customFeatures.map((item) => (
          <span
            key={item}
            className="rounded-full border border-green-500 bg-green-500 px-4 py-1.5 text-sm text-white"
          >
            {item}
          </span>
        ))}
      </div>

      {isOtroSelected && (
        <input
          type="text"
          value={otroValue}
          onChange={(e) => onOtroChange(e.target.value)}
          onKeyDown={handleOtherKeyDown}
          placeholder="Especifica cuál..."
          className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-green-500 focus:outline-none"
        />
      )}
    </div>
  )
}

export default FeatureTags