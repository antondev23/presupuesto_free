
import { useState } from 'react'
import './App.css'
import Hero from './components/hero'
import Nav from './components/nav'
import ProjectForm from './components/Form/ProjectForm'
import ResultsPanel from './components/results/resultsPanel'
import Footer from './components/footer'

function normalizeBudgetResponse(data) {
  const source = data.resultado || data.data || data
  const presupuesto = source.presupuesto || {}
  const tiempoEstimado = source.tiempoEstimado || {}
  const toNumber = (value) => {
    const number = Number(String(value ?? '').replace(/[^0-9.-]/g, ''))
    return Number.isFinite(number) ? number : null
  }

  const normalized = {
    ...source,
    presupuesto: {
      ...presupuesto,
      minimo: toNumber(
        presupuesto.minimo ?? presupuesto.precioMinimo ?? source.precioMinimo,
      ),
      recomendado: toNumber(
        presupuesto.recomendado ?? presupuesto.precioRecomendado ?? source.precioRecomendado,
      ),
      maximo: toNumber(
        presupuesto.maximo ?? presupuesto.precioMaximo ?? source.precioMaximo,
      ),
    },
    tiempoEstimado: {
      ...tiempoEstimado,
      horas: toNumber(tiempoEstimado.horas ?? tiempoEstimado.horasEstimadas ?? source.horasEstimadas),
    },
  }

  const esValido = [
    normalized.presupuesto.minimo,
    normalized.presupuesto.recomendado,
    normalized.presupuesto.maximo,
    normalized.tiempoEstimado.horas,
  ].every((campo) => campo !== null)

  if (!esValido) {
    console.error('Estructura recibida del backend:', source)
    throw new Error('La respuesta de la IA no contiene un presupuesto válido')
  }

  return normalized
}

function App() {
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formResetKey, setFormResetKey] = useState(0)
  const API_URL = import.meta.env.VITE_API_URL 

  const handleCloseResults = () => {
    setResultado(null)
    setError('')
    setFormResetKey((key) => key + 1)
  }

  const handleSubmit = (formData) => {
    console.log('Enviando datos del formulario:', formData)
    setLoading(true)
    setError('')
    setResultado(null)

    fetch(`${API_URL}/api/calcular`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        console.log('Respuesta del backend. Estado:', response.status)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'No se pudo calcular el presupuesto')
        }

        return data
      })
      .then((data) => {
        const resultadoNormalizado = normalizeBudgetResponse(data)
        console.log('Resultado del presupuesto:', resultadoNormalizado)
        setResultado(resultadoNormalizado)
        // Aquí puedes manejar la respuesta del backend, como mostrar el resultado al usuario
      })
      .catch((error) => {
        console.error('Error al calcular el presupuesto:', error)
        setError(error.message || 'No se pudo conectar con el servidor')
        // Aquí puedes manejar errores, como mostrar un mensaje al usuario
      })
      .finally(() => setLoading(false))
  }

  return (
    <>

      <Nav />
      <Hero />
      <section id="project-form" className="scroll-mt-6 px-6 pb-24">
        <ProjectForm key={formResetKey} onSubmit={handleSubmit} loading={loading} />
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        {(loading || resultado) && (
          <ResultsPanel
            results={resultado}
            loading={loading}
            onClose={handleCloseResults}
          />
        )}
      </section>
      <Footer />
    </>
  )
}

export default App
