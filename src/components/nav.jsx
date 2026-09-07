function Navbar() {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500 grid grid-cols-2 gap-0.5 p-1.5">
            <span className="bg-[#0A0E1A] rounded-sm" />
            <span className="bg-[#0A0E1A] rounded-sm" />
            <span className="bg-[#0A0E1A] rounded-sm" />
            <span className="bg-[#0A0E1A] rounded-sm" />
          </div>
          <span className="text-white font-bold text-lg">PresupuestoApp</span>
        </div>

        {/* Links */}
        

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a href="#project-form" className="text-sm font-medium text-[#0A0E1A] bg-green-500 hover:bg-green-400 px-5 py-2 rounded-full transition-colors">
            Calcular gratis
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
