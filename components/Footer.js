export default function Footer() {
  return (
    <footer className="bg-brand-dark-blue" aria-label="Rodapé">
      <div className="h-[2px] bg-brand-gradient" />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-5">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
          {/* Left - links and info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <nav className="flex items-center gap-4 text-sm" aria-label="Links do rodapé">
              <a href="/vacinas" className="text-white/90 hover:text-brand-cyan transition-colors">Vacinas e Serviços</a>
              <span className="text-white/30" aria-hidden="true">|</span>
              <a href="/equipe" className="text-white/90 hover:text-brand-cyan transition-colors">Nossa Equipe</a>
              <span className="text-white/30" aria-hidden="true">|</span>
              <a
                href="https://wa.me/5548991895758?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-brand-cyan transition-colors"
              >
                Contato
              </a>
            </nav>
            <address className="text-white/70 text-xs not-italic text-center md:text-left">
              Alameda Gov. Heriberto Hulse, 123 — Centro, Florianópolis/SC — (48) 99189-5758
            </address>
            <p className="text-white/50 text-xs">© 2026 Saúde Livre Vacinas. Florianópolis Centro.</p>
          </div>

          {/* Right - logo */}
          <img
            src="/simbolo-branco.png"
            alt="Saúde Livre Vacinas"
            className="h-14 md:h-16 w-auto opacity-70"
            width="64"
            height="64"
          />
        </div>
      </div>
    </footer>
  )
}
