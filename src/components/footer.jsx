const LEGAL_LINKS = ['Política de privacidad', 'Contacto']

function Footer() {
  return (
    <footer className="bg-[#0A0E1A] border-t border-white/5 ">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        {/* Logo + tagline */}
        <div className="md:col-span-3 flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500 grid grid-cols-2 gap-0.5 p-1.5">
              <span className="bg-[#0A0E1A] rounded-sm" />
              <span className="bg-[#0A0E1A] rounded-sm" />
              <span className="bg-[#0A0E1A] rounded-sm" />
              <span className="bg-[#0A0E1A] rounded-sm" />
            </div>

            <span className="text-white font-bold text-lg">
              PresupuestoApp
            </span>
          </div>

          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            La herramienta líder para calcular presupuestos de proyectos
            digitales de forma rápida y precisa.
          </p>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PresupuestoApp. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/anton.ort03/" className="text-slate-400 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/antonio-ortega-43b3952b4" className="text-slate-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://www.tiktok.com/@antonort23" className="text-slate-400 hover:text-white transition-colors">
              tiktok
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer