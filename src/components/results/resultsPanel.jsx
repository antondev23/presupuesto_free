import { useEffect } from 'react'
import { CoreSpinLoader } from '../ui/core-spin-loader'

const ResultsPanel = ({ results, loading, onClose }) => {
  const isLoading = loading || !results

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
            <h2 id="results-title" className="mb-4 pr-10 text-2xl font-bold text-gray-700">Resultados del presupuesto</h2>
            <p className="mb-6 text-sm text-gray-500">
              Basado en la información proporcionada, esta es la estimación de tu proyecto.
            </p>
            <div className="space-y-4">
              <p className="text-xl font-semibold text-gray-700">Precio mínimo: <span className="text-green-600">${results.precioMinimo}</span></p>
              <p className="text-xl font-semibold text-gray-700">Precio recomendado: <span className="text-green-600">${results.precioRecomendado}</span></p>
              <p className="text-xl font-semibold text-gray-700">Precio máximo: <span className="text-green-600">${results.precioMaximo}</span></p>
              <p className="text-xl font-semibold text-gray-700">Tiempo estimado: <span className="text-blue-600">{results.horasEstimadas} horas</span></p>
              <p className="text-sm text-gray-600"><strong>Justificación:</strong> {results.justificacion}</p>
              <p className="text-sm text-gray-600"><strong>Detalles:</strong> {results.detallesAdicionales}</p>
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
