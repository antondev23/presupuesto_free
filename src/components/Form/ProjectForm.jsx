import React from 'react'
import { useState } from 'react'
import { ArrowRight, Lock } from 'lucide-react'
import ProjectTypeSelector from './ProjectTypeSelector'
import FeatureTags from './FeatureTags'
import TimelineSelector from './TimelineSelector'

function ProjectForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    experiencia: '',
    tipoProyecto: '',
    funcionalidades: [],
    tiempoProyecto: '',
    descripcion: '',
    nombreCompleto: '',
    email: '',
  })
  const [otroValue, setOtroValue] = useState('')
  const [otroTipoProyecto, setOtroTipoProyecto] = useState('')
  const [otroTipoProyectoConfirmado, setOtroTipoProyectoConfirmado] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTipoChange = (value) => {
    setFormData((prev) => ({ ...prev, tipoProyecto: value }))
  }

  const handleOtroTipoProyecto = (value) => {
    const tipoPersonalizado = value.trim()

    if (!tipoPersonalizado) return

    setOtroTipoProyecto(tipoPersonalizado)
    setOtroTipoProyectoConfirmado(tipoPersonalizado)
  }

  const handleTiempoChange = (value) => {
    setFormData((prev) => ({ ...prev, tiempoProyecto: value }))
  }

  const handleFuncionalidadToggle = (value) => {
    setFormData((prev) => {
      const yaEsta = prev.funcionalidades.includes(value)
      return {
        ...prev,
        funcionalidades: yaEsta
          ? prev.funcionalidades.filter((f) => f !== value)
          : [...prev.funcionalidades, value],
      }
    })
  }

  const handleOtraFuncionalidad = (value) => {
    const funcionalidad = value.trim()

    if (!funcionalidad) return

    setFormData((prev) => ({
      ...prev,
      funcionalidades: prev.funcionalidades.includes(funcionalidad)
        ? prev.funcionalidades
        : [...prev.funcionalidades, funcionalidad],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const tipoProyectoFinal = formData.tipoProyecto === 'otro'
      ? otroTipoProyecto.trim()
      : formData.tipoProyecto
    const dataToSend = {
      ...formData,
      tipoProyecto: tipoProyectoFinal || 'otro',
      otraFuncionalidad: formData.funcionalidades.includes('Otros') ? otroValue : '',
      otroTipoProyecto: formData.tipoProyecto === 'otro' ? tipoProyectoFinal : '',
    }
    onSubmit(dataToSend)
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-700">Calcula tu presupuesto</span>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
          GRATIS
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Completa los datos de tu proyecto y recibe una estimación detallada.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            Experiencia en proyectos digitales
          </label>
          <div className="flex items-center gap-4 justify-around ">
            <form action="" required >
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="experiencia"
                  value="principiante"
                  className="accent-green-600"
                  checked={formData.experiencia === 'principiante'}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-700">Principiante</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="experiencia"
                  value="intermedio"
                  className="accent-green-600"
                  checked={formData.experiencia === 'intermedio'}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-700">Intermedio</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="experiencia"
                  value="avanzado"
                  className="accent-green-600"
                  checked={formData.experiencia === 'avanzado'}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-700">Avanzado</span>
              </label>
            </form>

          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            Tipo de proyecto
          </label>
          <ProjectTypeSelector
            value={formData.tipoProyecto}
            onChange={handleTipoChange}
            otroValue={otroTipoProyecto}
            onOtroChange={setOtroTipoProyecto}
            onOtroConfirm={handleOtroTipoProyecto}
            otroValueConfirmado={otroTipoProyectoConfirmado}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            Funcionalidades clave
          </label>
          <FeatureTags
            selected={formData.funcionalidades}
            onToggle={handleFuncionalidadToggle}
            otroValue={otroValue}
            onOtroChange={setOtroValue}
            onOtroConfirm={handleOtraFuncionalidad}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            Tiempo del proyecto
          </label>
          <TimelineSelector value={formData.tiempoProyecto} onChange={handleTiempoChange} />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            Dale contexto a la IA (opcional)
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            placeholder="Describe brevemente tu proyecto, objetivos o requerimientos especiales..."
            className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
          />
        </div>

        {/* <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
            />
          </div>
        </div> */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {loading ? 'Calculando...' : 'Calcular presupuesto'}
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <Lock className="w-3.5 h-3.5" />
          Tus datos están seguros
        </p>
      </form>
    </div>
  )
}

export default ProjectForm