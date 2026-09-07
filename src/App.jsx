
import { useState } from 'react'
import './App.css'
import Hero from './components/hero'
import Nav from './components/nav'
import ProjectForm from './components/Form/ProjectForm'
import ResultsPanel from './components/results/resultsPanel'
import Footer from './components/footer'

function App() {
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
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
        const esPresupuestoValido = [
          'precioMinimo',
          'precioRecomendado',
          'precioMaximo',
          'horasEstimadas',
        ].every((campo) => data[campo] !== undefined)

        if (!esPresupuestoValido) {
          throw new Error('La respuesta de la IA no contiene un presupuesto válido')
        }

        console.log('Resultado del presupuesto:', data)
        setResultado(data)
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
        <ProjectForm onSubmit={handleSubmit} loading={loading} />
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        {(loading || resultado) && (
          <ResultsPanel
            results={resultado}
            loading={loading}
            onClose={() => setResultado(null)}
          />
        )}
      </section>
      <Footer />
    </>
  )
}

export default App
