'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Award, Shield, Stethoscope, GraduationCap, Star } from 'lucide-react';

export default function EquipePage() {
    return (
        <div className="min-h-screen min-h-screen-ios bg-slate-50 font-sans text-brand-dark-gray selection:bg-brand-cyan/20 pb-safe">
            {/* Header */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 pt-safe" aria-label="Navegação">
                <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2 group" aria-label="Voltar à página inicial">
                        <ArrowLeft className="w-5 h-5 text-brand-medium-gray group-hover:text-brand-blue transition-colors" aria-hidden="true" />
                        <span className="text-sm font-medium text-brand-medium-gray group-hover:text-brand-blue transition-colors">Voltar ao início</span>
                    </a>
                    <div className="flex items-center gap-2">
                        <img src="/simbolo.png" alt="Símbolo Saúde Livre Vacinas" className="h-8 md:h-10 w-auto" width="40" height="40" />
                    </div>
                </div>
                <div className="h-[2px] bg-brand-gradient" />
            </nav>

            <main className="pt-32 pb-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <span className="inline-block py-2 px-4 rounded-full bg-brand-soft-blue text-brand-medium-blue text-sm font-bold tracking-wide mb-4 uppercase border border-brand-cyan/20">
                            Quem cuida de você
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue mb-6">
                            Conheça nossa <span className="text-brand-blue">Equipe Técnica</span>
                        </h1>
                        <p className="text-lg text-brand-dark-gray max-w-2xl mx-auto leading-relaxed">
                            Excelência técnica aliada ao calor humano. Nossa equipe é liderada por profissionais apaixonados pelo cuidado e pela vida.
                        </p>
                    </div>

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden"
                    >
                        <div className="grid md:grid-cols-12 gap-0">
                            {/* Photo Section */}
                            <div className="md:col-span-5 bg-brand-light/30 relative min-h-[400px] md:min-h-full flex items-center justify-center p-8">
                                <div className="w-64 h-64 rounded-full bg-brand-blue/10 border-4 border-white shadow-lg flex items-center justify-center relative overflow-hidden group">
                                    <img src="/equipe/sophia.jpg" alt="Enfermeira Sophia Francy - Responsável Técnica da Saúde Livre Vacinas Florianópolis" className="w-full h-full object-cover" width="256" height="256" />
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-4 left-4 w-20 h-20 bg-brand-cyan/10 rounded-full blur-2xl" />
                                <div className="absolute bottom-4 right-4 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl" />
                            </div>

                            {/* Content Section */}
                            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-brand-dark-blue mb-2">Sophia Francy da Silva Mendes</h2>
                                    <p className="text-brand-blue font-medium text-lg flex items-center gap-2">
                                        <Award className="w-5 h-5" />
                                        Enfermeira Responsável Técnica
                                    </p>
                                    <p className="text-brand-medium-gray text-sm mt-1">Enfermeira Graduada</p>
                                </div>

                                <div className="space-y-6 text-brand-dark-gray leading-relaxed">
                                    <p>
                                        Com uma trajetória marcada pela dedicação ao próximo, Sophia lidera nossa equipe com um olhar voltado para o <strong>atendimento humanizado</strong> e a segurança do paciente. Sua formação sólida e experiência diversificada garantem um cuidado de excelência.
                                    </p>

                                    <p>
                                        Sua experiência inclui atuação na <strong>Rede de Atenção Básica à Saúde</strong> e como <strong>Enfermeira Responsável Técnica</strong> em instituição de longa permanência para idosos, demonstrando versatilidade e comprometimento com diferentes públicos e necessidades.
                                    </p>

                                    <div className="bg-brand-light/50 rounded-xl p-6 border border-brand-blue/10 mt-6">
                                        <h3 className="font-bold text-brand-dark-blue mb-4 flex items-center gap-2">
                                            <Star className="w-5 h-5 text-brand-blue" />
                                            Diferenciais e Formação
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <GraduationCap className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Graduação em Enfermagem – Centro Universitário Estácio</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Shield className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Especializações em andamento: Gerontologia, Enfermagem do Trabalho, Atenção Primária e Saúde da Mulher</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Heart className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Capacitação em Primeiros Socorros e Gestão do Cuidado na Atenção Domiciliar</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Stethoscope className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Experiência em Vigilância Epidemiológica e Saúde Pública</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Values Section */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        {[
                            {
                                title: "Cuidado Humanizado",
                                desc: "Cada paciente é único. Respeitamos seu tempo, suas dores e sua história.",
                                icon: Heart
                            },
                            {
                                title: "Segurança Técnica",
                                desc: "Protocolos rigorosos baseados nas melhores práticas de imunização.",
                                icon: Shield
                            },
                            {
                                title: "Acolhimento",
                                desc: "Um ambiente preparado para receber você e sua família com carinho.",
                                icon: Star
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center"
                            >
                                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center text-brand-blue mx-auto mb-4">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-brand-dark-blue mb-2">{item.title}</h3>
                                <p className="text-sm text-brand-medium-gray">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
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
        </div>
    );
}
