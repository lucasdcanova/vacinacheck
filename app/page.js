'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Shield, Check, X, Syringe, MessageCircle, Mail, ArrowRight, ChevronDown } from 'lucide-react';
import VacinaCheck from '@/components/VacinaCheck';
import { useCapacitor } from '@/lib/capacitor';

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-brand-dark-blue text-sm md:text-base pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-brand-medium-gray shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-brand-dark-gray leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  const [showChecker, setShowChecker] = useState(false);
  const [showMapMenu, setShowMapMenu] = useState(false);
  const [isClinicOpen, setIsClinicOpen] = useState(false);

  // Capacitor integration for native features
  const { hapticSelection, openBrowser, isNative } = useCapacitor();

  useEffect(() => {
    const checkOpen = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      // Mon-Fri (1-5), 08:00 - 18:00
      const open = day >= 1 && day <= 5 && hour >= 8 && hour < 18;
      setIsClinicOpen(open);
    };

    checkOpen();
    const interval = setInterval(checkOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen min-h-screen-ios bg-slate-50 font-sans text-brand-dark-gray selection:bg-brand-cyan/20 pb-safe">
      {/* Institutional Header */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 pt-safe" aria-label="Navegação principal">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2" aria-label="Saúde Livre Vacinas - Página inicial">
            <img src="/simbolo.png" alt="Símbolo Saúde Livre Vacinas" className="h-8 md:h-10 w-auto" width="40" height="40" />
          </a>
          <a
            href="https://wa.me/5548991895758?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20vacina."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-blue hover:text-brand-dark-blue transition-colors flex items-center gap-2"
            aria-label="Agendar vacina pelo WhatsApp"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Agendar Vacina</span>
          </a>
        </div>
        <div className="h-[2px] bg-brand-gradient" />
      </nav>

      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6 md:mb-8">
                <img src="/hero-logo.png?v=4" alt="Saúde Livre - Clínica de Vacinação em Florianópolis Centro" className="h-auto max-h-32 md:max-h-[12rem] w-auto mx-auto" width="400" height="180" />
              </div>
              <span className="inline-block py-3 px-6 md:py-4 md:px-8 rounded-full bg-brand-soft-blue text-brand-medium-blue text-sm md:text-xl font-bold tracking-wide mb-6 md:mb-8 uppercase border border-brand-cyan/20">
                Unidade Florianópolis Centro
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-blue mb-6 md:mb-8 tracking-tight leading-tight">
                Clínica de Vacinação em Florianópolis.{' '}
                <motion.span
                  className="text-brand-blue inline-block"
                  animate={{ scale: [1, 1.1, 1, 1.1, 1, 1] }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.1, 0.2, 0.3, 0.4, 1],
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Prevenção é amor.
                </motion.span>
              </h1>
              <p className="text-lg md:text-xl text-brand-dark-gray mb-8 md:mb-10 leading-relaxed font-light">
                A maior rede de clínicas de vacinas do Brasil. <br className="hidden md:block" />
                Cuidado humanizado e proteção para todas as idades.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setShowChecker(true)}
                  className="w-full sm:w-auto bg-brand-gradient text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
                  aria-label="Abrir verificador de carteirinha de vacinação"
                >
                  <Shield className="w-5 h-5" aria-hidden="true" />
                  Verificar Carteirinha
                </button>
                <a
                  href="https://wa.me/5548991895758?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20vacina."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-brand-medium-blue border border-brand-medium-blue/20 hover:bg-brand-light transition-all flex items-center justify-center gap-2"
                  aria-label="Agendar vacina pelo WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  Agendar Vacina
                </a>
                <a
                  href="/vacinas"
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-brand-medium-blue border border-brand-medium-blue/20 hover:bg-brand-light transition-all flex items-center justify-center gap-2"
                >
                  <Syringe className="w-5 h-5" aria-hidden="true" />
                  Conhecer Vacinas e Serviços
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Information Grid */}
        <section className="py-12 md:py-20 bg-white border-y border-brand-light" aria-label="Informações da clínica">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-brand-dark-blue">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan" aria-hidden="true"></span>
                  Vacinas Disponíveis
                </h2>
                <ul className="space-y-3 text-brand-dark-gray">
                  {['Bebês e Crianças', 'Gestantes', 'Adultos e Idosos', 'Ocupacional', 'Viajantes'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-brand-cyan" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-brand-dark-blue">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" aria-hidden="true"></span>
                  Nossos Diferenciais
                </h2>
                <p className="text-brand-dark-gray text-sm leading-relaxed mb-4">
                  Equipe liderada pela Enf. Sophia, focada em atendimento humanizado e técnicas de alívio da dor.
                </p>
                <p className="text-brand-dark-gray text-sm leading-relaxed">
                  Ambiente acolhedor e lúdico para crianças.
                </p>
                <a href="/equipe" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-dark-blue transition-colors mt-4 group">
                  Conheça nossa equipe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>

              <div id="contato">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-brand-dark-blue">
                  <span className="w-2 h-2 rounded-full bg-brand-dark-blue" aria-hidden="true"></span>
                  Contato e Localização
                </h2>
                <address className="space-y-4 text-sm text-brand-dark-gray not-italic">
                  <div className="relative">
                    <button
                      onClick={() => setShowMapMenu(!showMapMenu)}
                      className="flex items-start gap-3 hover:text-brand-blue transition-colors text-left group"
                      aria-expanded={showMapMenu}
                      aria-label="Ver opções de mapa para o endereço da clínica"
                    >
                      <MapPin className="w-5 h-5 text-brand-medium-gray shrink-0 group-hover:text-brand-blue transition-colors" aria-hidden="true" />
                      <p>Alameda Gov. Heriberto Hulse, 123<br />Centro, Florianópolis – SC<br />CEP 88015-620</p>
                    </button>

                    <AnimatePresence>
                      {showMapMenu && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowMapMenu(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20"
                            role="menu"
                            aria-label="Opções de mapa"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Abrir com:</div>
                              <a
                                href="https://www.google.com/maps/search/?api=1&query=Alameda+Gov.+Heriberto+Hulse,+123,+Centro,+Florianópolis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark-gray hover:bg-slate-50 rounded-lg transition-colors"
                                role="menuitem"
                                onClick={() => setShowMapMenu(false)}
                              >
                                Google Maps
                              </a>
                              <a
                                href="https://waze.com/ul?q=Alameda+Gov.+Heriberto+Hulse,+123,+Centro,+Florianópolis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark-gray hover:bg-slate-50 rounded-lg transition-colors"
                                role="menuitem"
                                onClick={() => setShowMapMenu(false)}
                              >
                                Waze
                              </a>
                              <a
                                href="http://maps.apple.com/?q=Alameda+Gov.+Heriberto+Hulse,+123,+Centro,+Florianópolis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark-gray hover:bg-slate-50 rounded-lg transition-colors"
                                role="menuitem"
                                onClick={() => setShowMapMenu(false)}
                              >
                                Apple Maps
                              </a>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  <a
                    href="https://wa.me/5548991895758?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-brand-blue transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-brand-medium-gray shrink-0" aria-hidden="true" />
                    <p>(48) 99189-5758</p>
                  </a>
                  <a
                    href="mailto:contato@saudelivrefloripa.com.br"
                    className="flex items-center gap-3 hover:text-brand-blue transition-colors"
                  >
                    <Mail className="w-5 h-5 text-brand-medium-gray shrink-0" aria-hidden="true" />
                    <p>contato@saudelivrefloripa.com.br</p>
                  </a>
                  <div className="pt-2 flex items-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${isClinicOpen ? 'bg-green-500' : 'bg-red-500'}`}
                      aria-hidden="true"
                    ></span>
                    <span>{isClinicOpen ? 'Aberto agora' : 'Fechado'} — Segunda a Sexta: 08:00 - 18:00</span>
                  </div>
                </address>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 px-4 md:px-6" aria-label="Perguntas frequentes">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark-blue mb-8 text-center">
              Perguntas Frequentes
            </h2>
            <div className="space-y-3">
              <FaqItem
                question="Quais vacinas estão disponíveis na Saúde Livre Florianópolis?"
                answer="Oferecemos o calendário vacinal completo da rede privada: vacinas para bebês, crianças, adolescentes, adultos, gestantes e idosos. Inclui vacinas contra dengue, gripe, HPV, meningite, febre amarela, herpes zóster e muito mais."
              />
              <FaqItem
                question="É necessário agendar a vacinação?"
                answer="O agendamento não é obrigatório, mas recomendamos para garantir atendimento imediato. Agende facilmente pelo WhatsApp: (48) 99189-5758."
              />
              <FaqItem
                question="Qual o horário de funcionamento da clínica?"
                answer="Funcionamos de segunda a sexta-feira, das 08h às 18h. Estamos localizados na Alameda Gov. Heriberto Hulse, 123 - Centro, Florianópolis/SC, CEP 88015-620."
              />
              <FaqItem
                question="A clínica atende crianças e bebês?"
                answer="Sim! Temos ambiente acolhedor e lúdico para crianças, equipe especializada em vacinação pediátrica e técnicas de alívio da dor. Atendemos desde recém-nascidos."
              />
              <FaqItem
                question="Quais formas de pagamento são aceitas?"
                answer="Aceitamos dinheiro, cartões de crédito e débito, e PIX."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Institutional Footer */}
      <footer className="bg-brand-dark-blue" aria-label="Rodapé">
        <div className="h-[2px] bg-brand-gradient" />
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 flex flex-col items-center gap-6">
          <img src="/logo-footer-white.png" alt="Saúde Livre Vacinas - Clínica de Vacinação Florianópolis" className="h-28 md:h-36 w-auto opacity-90" width="300" height="144" />
          <nav className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/70" aria-label="Links do rodapé">
            <a href="/vacinas" className="hover:text-brand-cyan transition-colors">Vacinas e Serviços</a>
            <span className="hidden sm:inline text-white/20" aria-hidden="true">|</span>
            <a href="/equipe" className="hover:text-brand-cyan transition-colors">Nossa Equipe</a>
            <span className="hidden sm:inline text-white/20" aria-hidden="true">|</span>
            <a
              href="https://wa.me/5548991895758?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-cyan transition-colors"
            >
              Contato
            </a>
          </nav>
          <address className="text-white/50 text-xs text-center not-italic leading-relaxed">
            Alameda Gov. Heriberto Hulse, 123 — Centro, Florianópolis/SC — CEP 88015-620<br />
            (48) 99189-5758 — contato@saudelivrefloripa.com.br
          </address>
          <div className="w-16 h-[1px] bg-brand-cyan/30" aria-hidden="true" />
          <p className="text-white/40 text-xs">© 2026 Saúde Livre Vacinas. Florianópolis Centro.</p>
        </div>
      </footer>

      {/* VacinaCheck Modal */}
      <AnimatePresence>
        {showChecker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-md overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Verificador de carteirinha de vacinação"
          >
            <div className="min-h-screen p-0 md:p-8 flex items-center justify-center">
              <div className="w-full h-full md:h-auto md:max-w-5xl relative bg-slate-50 md:bg-white md:rounded-3xl shadow-2xl border-0 md:border border-slate-100 overflow-hidden flex flex-col">
                <button
                  onClick={() => setShowChecker(false)}
                  className="absolute top-6 right-6 z-50 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
                  aria-label="Fechar verificador de carteirinha"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
                <div className="max-h-[90vh] overflow-y-auto">
                  <VacinaCheck />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
