'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Syringe, Shield, Baby, User, Heart, Briefcase, Plane, ChevronRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { VACINAS, CATEGORIAS } from '@/lib/vacinas-data';
import Footer from '@/components/Footer';

const ICON_MAP = {
    Baby, User, Shield, Heart, Briefcase, Plane, Syringe,
};

function getIcon(categoria) {
    switch (categoria) {
        case 'Bebês':
        case 'Crianças':
            return Baby;
        case 'Adolescentes':
        case 'Adultos':
            return User;
        case 'Gestantes':
            return Heart;
        case 'Serviços':
            return Heart;
        case 'Injetáveis':
            return Syringe;
        case 'Exames':
            return Shield;
        case 'Produtos':
            return Briefcase;
        default:
            return Shield;
    }
}

function getCategoriaIcon(id) {
    switch (id) {
        case 'Todos': return Shield;
        case 'Bebês': return Baby;
        case 'Adolescentes': return User;
        case 'Adultos': return Briefcase;
        case 'Gestantes': return Heart;
        case 'Serviços': return Heart;
        case 'Injetáveis': return Syringe;
        case 'Exames': return Shield;
        case 'Produtos': return Briefcase;
        default: return Shield;
    }
}

export default function VacinasPage() {
    const [filtro, setFiltro] = useState('Todos');
    const [busca, setBusca] = useState('');

    const vacinasFiltradas = VACINAS.filter(vacina => {
        const matchCategoria = filtro === 'Todos' || vacina.categoria === filtro || (filtro === 'Bebês' && vacina.categoria === 'Crianças');
        const matchBusca = vacina.nome.toLowerCase().includes(busca.toLowerCase()) ||
            vacina.descricao.toLowerCase().includes(busca.toLowerCase());
        return matchCategoria && matchBusca;
    });

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
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <span className="inline-block py-2 px-4 rounded-full bg-brand-soft-blue text-brand-medium-blue text-sm font-bold tracking-wide mb-4 uppercase border border-brand-cyan/20">
                            Catálogo de Imunização e Serviços
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue mb-4">
                            Vacinas e Serviços em <span className="text-brand-blue">Florianópolis</span>
                        </h1>
                        <p className="text-lg text-brand-dark-gray max-w-2xl mx-auto">
                            Proteção completa para todas as fases da vida. Descubra as vacinas disponíveis na Saúde Livre Florianópolis Centro.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-12 space-y-6">
                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-medium-gray w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar vacina ou doença..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-brand-dark-gray text-base"
                                aria-label="Buscar vacina ou doença"
                            />
                        </div>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                            {CATEGORIAS.map((cat) => {
                                const Icon = getCategoriaIcon(cat.id);
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFiltro(cat.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${filtro === cat.id
                                            ? 'bg-brand-dark-blue text-white shadow-lg shadow-brand-blue/20'
                                            : 'bg-white text-brand-medium-gray border border-slate-200 hover:border-brand-blue/50'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Grid de Vacinas */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {vacinasFiltradas.map((vacina) => {
                            const Icon = getIcon(vacina.categoria);
                            return (
                                <motion.a
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    key={vacina.id}
                                    href={`/vacinas/${vacina.slug}`}
                                    className="bg-white rounded-3xl border border-slate-100 p-6 shadow-lg hover:shadow-xl transition-all group block"
                                >
                                    <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-blue mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-xl font-bold text-brand-dark-blue mb-2">{vacina.nome}</h2>
                                    <p className="text-brand-medium-gray text-sm mb-4 line-clamp-2">
                                        {vacina.descricao}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                        <span className="text-xs font-semibold text-brand-blue bg-brand-light px-3 py-1 rounded-full">
                                            {vacina.indicacao}
                                        </span>
                                        <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </span>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </motion.div>

                    {vacinasFiltradas.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-brand-medium-gray text-lg">Nenhuma vacina encontrada para sua busca.</p>
                            <button
                                onClick={() => { setBusca(''); setFiltro('Todos'); }}
                                className="mt-4 text-brand-blue font-medium hover:underline"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
