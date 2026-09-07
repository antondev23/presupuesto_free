import { Smartphone, Globe, ShoppingCart, Laptop, Code2, Sparkles } from 'lucide-react'

const TIPOS = [
  { value: 'app_movil', label: 'App Móvil', icon: Smartphone },
  { value: 'aplicacion_web', label: 'Aplicación Web', icon: Globe },
  { value: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
  { value: 'landing_page', label: 'Landing Page', icon: Laptop },
  { value: 'software_medida', label: 'Software a Medida', icon: Code2 },
  { value: 'otro', label: 'Otro', icon: Sparkles },
]

function ProjectTypeSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {TIPOS.map(({ value: tipoValue, label, icon: Icon }) => {
        const selected = value === tipoValue
        return (
          <button
            key={tipoValue}
            type="button"
            onClick={() => onChange(tipoValue)}
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-medium transition-colors ${
              selected
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default ProjectTypeSelector