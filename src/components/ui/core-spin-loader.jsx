export function CoreSpinLoader() {
  return (
    <div
      role="status"
      aria-label="Calculando presupuesto"
      className="relative grid h-20 w-20 place-items-center"
    >
      <span className="absolute inset-0 rounded-full border-4 border-violet-100" />
      <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-violet-600 border-r-violet-400" />
      <span className="h-4 w-4 rounded-full bg-violet-600 shadow-[0_0_22px_5px_rgba(124,58,237,0.45)]" />
      <span className="sr-only">Calculando presupuesto</span>
    </div>
  )
}
