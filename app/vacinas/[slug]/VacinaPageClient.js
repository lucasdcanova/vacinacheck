'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MessageCircle, Shield, ChevronDown, AlertTriangle, Clock, Syringe, Heart, Info } from 'lucide-react'
import Footer from '@/components/Footer'

function FaqItem({ pergunta, resposta }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-brand-dark-blue text-sm md:text-base pr-4">{pergunta}</span>
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
            <p className="px-5 pb-5 text-sm text-brand-dark-gray leading-relaxed">{resposta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function VacinaPageClient({ vacina }) {
  const whatsappUrl = `https://wa.me/5548991895758?text=${encodeURIComponent(`Olá! Gostaria de agendar a vacina ${vacina.nome}.`)}`

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-brand-dark-gray selection:bg-brand-cyan/20">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50" aria-label="Navegação">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">
          <a href="/vacinas" className="flex items-center gap-2 group" aria-label="Voltar para vacinas">
            <ArrowLeft className="w-5 h-5 text-brand-medium-gray group-hover:text-brand-blue transition-colors" aria-hidden="true" />
            <span className="text-sm font-medium text-brand-medium-gray group-hover:text-brand-blue transition-colors">Vacinas e Serviços</span>
          </a>
          <a href="/" className="flex items-center gap-2" aria-label="Saúde Livre Vacinas - Página inicial">
            <img src="/simbolo.png" alt="Símbolo Saúde Livre Vacinas" className="h-8 md:h-10 w-auto" width="40" height="40" />
          </a>
        </div>
        <div className="h-[2px] bg-brand-gradient" />
      </nav>

      {/* Breadcrumb */}
      <div className="pt-20 md:pt-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-brand-medium-gray" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 flex-wrap">
              <li><a href="/" className="hover:text-brand-blue transition-colors">Início</a></li>
              <li className="text-brand-medium-gray/50">/</li>
              <li><a href="/vacinas" className="hover:text-brand-blue transition-colors">Vacinas e Serviços</a></li>
              <li className="text-brand-medium-gray/50">/</li>
              <li className="text-brand-dark-blue font-medium">{vacina.nome}</li>
            </ol>
          </nav>
        </div>
      </div>

      <main className="pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-soft-blue text-brand-medium-blue text-xs font-bold tracking-wide uppercase border border-brand-cyan/20">
                {vacina.categoria}
              </span>
              {vacina.indicacao && (
                <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-brand-medium-gray text-xs font-medium">
                  {vacina.indicacao}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-brand-dark-blue mb-4 leading-tight">
              {vacina.nomeCompleto || vacina.nome}
            </h1>
            <p className="text-lg md:text-xl text-brand-dark-gray leading-relaxed">
              {vacina.descricaoDetalhada || vacina.descricao}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gradient text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Agendar pelo WhatsApp
            </a>
            <a
              href="tel:+5548991895758"
              className="px-8 py-4 rounded-full font-medium text-brand-medium-blue border border-brand-medium-blue/20 hover:bg-brand-light transition-all flex items-center justify-center gap-2"
            >
              (48) 99189-5758
            </a>
          </motion.div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Esquema Vacinal */}
            {vacina.esquemaVacinal && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-brand-dark-blue mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-blue" aria-hidden="true" />
                  Esquema Vacinal
                </h2>
                <p className="text-sm text-brand-dark-gray leading-relaxed">{vacina.esquemaVacinal}</p>
              </motion.div>
            )}

            {/* Cuidados */}
            {vacina.cuidados && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-brand-dark-blue mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-brand-blue" aria-hidden="true" />
                  Cuidados e Orientações
                </h2>
                <p className="text-sm text-brand-dark-gray leading-relaxed">{vacina.cuidados}</p>
              </motion.div>
            )}

            {/* Contraindicações */}
            {vacina.contraindicacoes && vacina.contraindicacoes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-brand-dark-blue mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" aria-hidden="true" />
                  Contraindicações
                </h2>
                <ul className="space-y-2">
                  {vacina.contraindicacoes.map((item, i) => (
                    <li key={i} className="text-sm text-brand-dark-gray flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Efeitos Colaterais */}
            {vacina.efeitosColaterais && vacina.efeitosColaterais.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-brand-dark-blue mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-blue" aria-hidden="true" />
                  Possíveis Efeitos Colaterais
                </h2>
                <ul className="space-y-2">
                  {vacina.efeitosColaterais.map((item, i) => (
                    <li key={i} className="text-sm text-brand-dark-gray flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0 mt-1.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* FAQ */}
          {vacina.faq && vacina.faq.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mb-12"
              aria-label="Perguntas frequentes"
            >
              <h2 className="text-2xl font-bold text-brand-dark-blue mb-6">Perguntas Frequentes</h2>
              <div className="space-y-3">
                {vacina.faq.map((item, i) => (
                  <FaqItem key={i} pergunta={item.pergunta} resposta={item.resposta} />
                ))}
              </div>
            </motion.section>
          )}

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-brand-dark-blue rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Agende sua {vacina.tipo === 'vacina' ? 'vacinação' : vacina.tipo === 'exame' ? 'consulta' : 'visita'}
            </h2>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Entre em contato conosco pelo WhatsApp para agendar. Atendemos de segunda a sexta, das 08h às 18h.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-brand-dark-blue px-8 py-4 rounded-full font-medium hover:bg-brand-light transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Agendar pelo WhatsApp
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
