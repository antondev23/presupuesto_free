import { useEffect } from 'react'
import { CoreSpinLoader } from '../ui/core-spin-loader'

const ResultsPanel = ({ results, loading, onClose }) => {
  const isLoading = loading || !results
  const presupuesto = results?.presupuesto || {}
  const tiempoEstimado = results?.tiempoEstimado || {}
  const incluye = results?.incluye?.length
    ? results.incluye
    : ['Revisión del alcance del proyecto']
  const consejos = results?.consejos?.length
    ? results.consejos
    : ['Confirma el alcance y los entregables antes de comenzar.']

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isLoading) onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isLoading, onClose])

  const closeOnBackdrop = (event) => {
    if (!isLoading && event.target === event.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={closeOnBackdrop}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="results-title"
        className="relative w-full max-w-xl rounded-3xl bg-white p-8 text-left shadow-2xl"
      >
        {isLoading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-6 text-center">
            <CoreSpinLoader />
            <div>
              <h2 id="results-title" className="text-2xl font-bold text-gray-800">Calculando tu presupuesto</h2>
              <p className="mt-2 text-sm text-gray-500">
                Estamos analizando los datos de tu proyecto.
              </p>
            </div>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar resultados"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-2xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              &times;
            </button>
            <h2 id="results-title" className="mb-4 pr-10 text-2xl font-bold text-gray-800">
              {results.titulo || '✨ Estimación del proyecto'}
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              {results.resumen || 'Basado en la información proporcionada, esta es la estimación de tu proyecto.'}
            </p>
            <div className="space-y-4">
              <p className="text-xl font-semibold text-gray-700">💰 Desde: <span className="text-green-600">${presupuesto.minimo}</span></p>
              <p className="text-xl font-semibold text-gray-700">⭐ Recomendado: <span className="text-green-600">${presupuesto.recomendado}</span></p>
              <p className="text-xl font-semibold text-gray-700">📈 Hasta: <span className="text-green-600">${presupuesto.maximo}</span></p>
              <p className="text-xl font-semibold text-gray-700">⏱️ Tiempo estimado: <span className="text-blue-600">{tiempoEstimado.horas} horas</span></p>
              <p className="text-sm text-gray-600">{tiempoEstimado.descripcion || 'Tiempo sujeto al alcance final.'}</p>
              <p className="text-sm text-gray-600"><strong>Justificación:</strong> {results.justificacion || 'Estimación basada en los datos indicados.'}</p>
              <div className="text-sm text-gray-600">
                <strong>✅ Incluye:</strong>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {incluye.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="text-sm text-gray-600">
                <strong>💡 Consejos:</strong>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {consejos.map((consejo) => <li key={consejo}>{consejo}</li>)}
                </ul>
              </div>
              <p className="text-sm text-gray-600"><strong>🚀 Siguiente paso:</strong> {results.siguientePaso || 'Define el alcance final y confirma los entregables.'}</p>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                Cerrar
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default ResultsPanel
