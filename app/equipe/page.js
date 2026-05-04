'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Award, Shield, Stethoscope, GraduationCap, Star } from 'lucide-react';
import Footer from '@/components/Footer';

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
                                    <img src="/equipe/thais.jpg" alt="Enfermeira Thais Alves - Responsável Técnica da Saúde Livre Vacinas Florianópolis" className="w-full h-full object-cover" width="256" height="256" />
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-4 left-4 w-20 h-20 bg-brand-cyan/10 rounded-full blur-2xl" />
                                <div className="absolute bottom-4 right-4 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl" />
                            </div>

                            {/* Content Section */}
                            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-brand-dark-blue mb-2">Thais Aparecida Campos Rodrigues Alves</h2>
                                    <p className="text-brand-blue font-medium text-lg flex items-center gap-2">
                                        <Award className="w-5 h-5" />
                                        Enfermeira Responsável Técnica
                                    </p>
                                    <p className="text-brand-medium-gray text-sm mt-1">Enfermeira Graduada · COREN ativo</p>
                                </div>

                                <div className="space-y-6 text-brand-dark-gray leading-relaxed">
                                    <p>
                                        Enfermeira com experiência sólida na assistência direta ao paciente em ambientes <strong>hospitalares, ambulatoriais e domiciliares</strong>. Sua atuação reúne cuidados clínicos, pré e pós-operatórios, classificação de risco, administração segura de medicamentos, vacinação e curativos simples e complexos.
                                    </p>

                                    <p>
                                        Com vivência em ambientes de alta demanda e postura ética, organizada e acolhedora, Thais traz experiência prévia em rotinas de <strong>Sala de Vacina</strong>, <strong>SCIH</strong> e <strong>Núcleo de Segurança do Paciente</strong>, priorizando o atendimento humanizado e a segurança em cada procedimento.
                                    </p>

                                    <div className="bg-brand-light/50 rounded-xl p-6 border border-brand-blue/10 mt-6">
                                        <h3 className="font-bold text-brand-dark-blue mb-4 flex items-center gap-2">
                                            <Star className="w-5 h-5 text-brand-blue" />
                                            Diferenciais e Formação
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <GraduationCap className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Bacharelado em Enfermagem – Centro Universitário Estácio (UNIMETA)</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Shield className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Experiência em Sala de Vacina e administração de imunobiológicos conforme PNI</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Heart className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Atuação em SCIH e Núcleo de Segurança do Paciente, com foco em protocolos e POPs</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Stethoscope className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                                                <span className="text-sm">Cuidados clínicos pré e pós-operatórios, Home Care e classificação de risco</span>
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

            <Footer />
        </div>
    );
}
