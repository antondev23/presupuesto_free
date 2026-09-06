function Hero() {
  const checks = ['Sin registro', 'Exporta en PDF', '+5,000 proyectos calculados']

  return (
    <section className="relative overflow-hidden">
      {/* glows laterales */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-400 uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            PresupuestoApp — Estimación al instante
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Calcula el presupuesto de tu proyecto en{' '}
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">
              segundos
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Describe tu proyecto, elige sus funcionalidades y obtén una estimación precisa lista para presentar a tus clientes.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
            {checks.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
