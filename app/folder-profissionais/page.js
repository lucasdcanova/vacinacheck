'use client'

import React from 'react';
import { Stethoscope, Phone, Mail, Globe, Clock, MapPin, Check, X, Star, Plane, Baby, Users, Heart, Shield, Award, MessageCircle } from 'lucide-react';

// Badge component for exclusive vaccines
const ExclusiveBadge = () => (
  <span className="text-[9px] text-amber-700 font-semibold flex items-center gap-0.5">
    <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
    EXCLUSIVA REDE PRIVADA
  </span>
);

const NewBadge = () => (
  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full ml-1 shadow-sm">NOVO</span>
);

// Age badge component
const AgeBadge = ({ ages }) => (
  <div className="flex flex-wrap gap-1.5 mt-0.5">
    {ages.map((age, i) => (
      <span key={i} className="bg-gradient-to-r from-[#0072a2] to-[#17497e] text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-sm">
        {age}
      </span>
    ))}
  </div>
);

// Vaccine item component
const VaccineItem = ({ name, description, ages, isExclusive, isNew }) => (
  <div className={`mb-2 p-2.5 rounded-lg break-inside-avoid shadow-sm border ${isExclusive ? 'bg-gradient-to-r from-amber-50/50 to-white border-amber-100' : 'bg-white border-gray-100'}`}>
    <div className="flex items-start gap-2">
      <div className={`mt-0.5 p-1.5 rounded-md shrink-0 shadow-sm ${isExclusive ? 'bg-gradient-to-br from-amber-400 to-amber-500' : 'bg-gradient-to-br from-[#0072a2] to-[#17497e]'}`}>
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5">
          <span className="font-bold text-[11px] text-[#15335e] uppercase tracking-tight leading-tight">{name}</span>
          <div className="flex items-center gap-1">
            {isNew && <NewBadge />}
            {isExclusive && (
              <span className="flex items-center gap-0.5 text-[8px] font-bold text-amber-600 bg-gradient-to-r from-amber-100 to-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200 leading-none shadow-sm">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                PRIVADA
              </span>
            )}
          </div>
        </div>
        {description && <p className="text-[10px] text-gray-600 leading-snug mt-1 font-medium">{description}</p>}
        {ages && (
          <div className="mt-1.5">
            <AgeBadge ages={ages} />
          </div>
        )}
      </div>
    </div>
  </div>
);

// Simple item for Verso lists
const SimpleVaccineItem = ({ name, detail, isExclusive }) => (
  <div className={`flex items-start gap-2 py-2 px-2.5 mb-1.5 rounded-lg ${isExclusive ? 'bg-gradient-to-r from-amber-50/70 to-white shadow-sm border border-amber-100/50' : 'bg-white/60 shadow-sm border border-gray-100/50'}`}>
    <div className={`mt-0.5 p-1 rounded shrink-0 ${isExclusive ? 'bg-amber-400' : 'bg-[#0072a2]'}`}>
      <div className="w-1.5 h-1.5 bg-white rounded-full" />
    </div>
    <div className="flex-1 leading-snug text-[10px]">
      <span className="font-bold text-[#15335e]">{name}</span>
      {detail && <span className="text-gray-600"> - {detail}</span>}
    </div>
    {isExclusive && (
      <span className="text-[8px] font-bold text-amber-600 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full whitespace-nowrap h-fit shadow-sm">
        PRIVADA
      </span>
    )}
  </div>
);

// Section header component
const SectionHeader = ({ icon: Icon, title, color = "#0072a2" }) => (
  <div className="flex items-center gap-2.5 mb-3 p-2.5 rounded-lg shadow-md relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}30 100%)` }}>
    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent pointer-events-none" />
    <div className="p-2 rounded-lg bg-white shadow-md relative z-10" style={{ boxShadow: `0 2px 8px ${color}40` }}>
      <Icon className="w-4 h-4" style={{ color }} />
    </div>
    <h3 className="font-bold text-[12px] uppercase tracking-wide relative z-10" style={{ color, textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>{title}</h3>
  </div>
);

// Comparison table component
const ComparisonTable = () => {
  const items = [
    { vaccine: "Rotavírus", sus: false, privada: true },
    { vaccine: "Pneumocócica", sus: false, privada: true },
    { vaccine: "Meningocócica", sus: false, privada: true },
    { vaccine: "DTP", sus: false, privada: true },
    { vaccine: "HPV", sus: false, privada: true },
    { vaccine: "Influenza", sus: false, privada: true },
    { vaccine: "Hepatite A", sus: false, privada: true },
    { vaccine: "Dengue", sus: false, privada: true },
  ];

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-white/50 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none z-10" />
      <table className="w-full text-[10px] relative">
        <thead>
          <tr className="bg-gradient-to-r from-[#15335e] to-[#0072a2] text-white">
            <th className="text-left px-3 py-2 font-bold">Vacina</th>
            <th className="text-center px-2 py-2 font-bold">SUS</th>
            <th className="text-center px-2 py-2 font-bold">Privada</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f0f9ff]'}>
              <td className="px-3 py-2 text-gray-700 font-medium">{item.vaccine}</td>
              <td className="text-center px-2 py-2">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </div>
              </td>
              <td className="text-center px-2 py-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function FolderProfissionais() {
  return (
    <div className="min-h-screen bg-gray-100 py-4 print:py-0 print:bg-white">
      {/* FRENTE DO FOLDER */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-gradient-to-br from-[#e8f4f8] to-[#d4eef6] shadow-lg print:shadow-none print:w-full print:min-h-0 print:page-break-after-always">
        <div className="p-5 print:p-4 min-h-[297mm] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4 p-4 rounded-xl bg-gradient-to-r from-[#15335e] via-[#17497e] to-[#0072a2] shadow-xl relative overflow-hidden">
            {/* Efeito de brilho */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg shadow-lg p-2 relative z-10">
              <img
                src="/logo-header.png"
                alt="Saúde Livre"
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-gray-100 rounded items-center justify-center text-gray-400 text-xs">
                LOGO
              </div>
            </div>
            <div className="flex-1 relative z-10">
              <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(109,224,228,0.3)' }}>
                SAÚDE LIVRE VACINAS
              </h1>
              <p className="text-sm font-semibold text-[#6de0e4] drop-shadow">Unidade Florianópolis Centro</p>
              <p className="text-xs text-white/80 italic">Prevenção é um ato de amor</p>
            </div>
          </div>

          {/* Intro message */}
          <div className="bg-gradient-to-r from-white to-[#f0f9ff] rounded-xl p-4 mb-4 flex items-start gap-3 shadow-lg border border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0072a2]/5 via-transparent to-[#6de0e4]/10 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6de0e4]/50 to-transparent" />
            <div className="p-2 bg-gradient-to-br from-[#0072a2] to-[#17497e] rounded-lg shadow-md relative z-10">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <p className="text-[11px] text-gray-700 leading-relaxed relative z-10">
              <strong className="text-[#15335e]">Caro(a) Colega Profissional de Saúde,</strong> a <strong className="text-[#0072a2]">Saúde Livre Florianópolis Centro</strong> oferece o calendário vacinal completo da rede privada, seguindo as recomendações da <strong>SBIm 2024/2025</strong>. Encaminhe seus pacientes com confiança.
            </p>
          </div>

          {/* VACINAS PEDIÁTRICAS */}
          <SectionHeader icon={Baby} title="Vacinas Pediátricas (0-10 anos)" color="#0072a2" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-3 flex-1">
            {/* Coluna 1 */}
            <div>
              <VaccineItem
                name="BCG ID"
                description="Proteção contra tuberculose (formas graves)"
                ages={["Ao nascer"]}
              />
              <VaccineItem
                name="Hepatite B"
                description="Proteção contra hepatite B"
                ages={["2", "4", "6 meses"]}
              />
              <VaccineItem
                name="Rotavírus Pentavalente"
                description="Proteção contra gastroenterite"
                ages={["2", "4", "6 meses"]}
                isExclusive
              />
              <VaccineItem
                name="Hexavalente Acelular"
                description="Proteção DTPa-Hib-HB-VIP"
                ages={["2", "4", "6 meses"]}
                isExclusive
              />
              <VaccineItem
                name="Pentavalente Acelular"
                description="Proteção DTPa-Hib-VIP"
                ages={["2", "4", "6 meses"]}
                isExclusive
              />
              <VaccineItem
                name="Pneumocócica Conjugada 13/15/20V"
                description="Proteção pneumocócica ampliada"
                ages={["2", "4", "6 meses"]}
                isExclusive
              />
              <VaccineItem
                name="Meningocócica ACWY"
                description="Proteção meningocócica 4 sorogrupos"
                ages={["3", "5", "12 meses"]}
                isExclusive
              />
              <VaccineItem
                name="Meningocócica B"
                description="Proteção meningocócica B"
                ages={["3", "5", "12 meses"]}
                isExclusive
              />
            </div>

            {/* Coluna 2 */}
            <div>
              <VaccineItem
                name="Poliomielite Inativada (VIP)"
                description="Proteção contra paralisia infantil"
                ages={["2", "4", "6 meses"]}
              />
              <VaccineItem
                name="Influenza Tetravalente"
                description="Proteção contra 4 cepas de gripe"
                ages={["6-12 meses"]}
                isExclusive
              />
              <VaccineItem
                name="Febre Amarela"
                description="Proteção contra febre amarela"
                ages={["9 meses"]}
                isNew
              />
              <VaccineItem
                name="Tríplice Viral (SCR)"
                description="Proteção sarampo, caxumba, rubéola"
                ages={["12", "15 meses"]}
              />
              <VaccineItem
                name="Tetraviral"
                description="Proteção SCR + varicela"
                ages={["15 meses"]}
              />
              <VaccineItem
                name="Varicela"
                description="Proteção contra catapora"
                ages={["12", "15 meses"]}
              />
              <VaccineItem
                name="Hepatite A"
                description="Proteção contra hepatite A"
                ages={["12", "18 meses"]}
              />
              <VaccineItem
                name="HPV 9-valente"
                description="Proteção contra 9 tipos de HPV"
                ages={["9-14 anos"]}
                isExclusive
              />
              <VaccineItem
                name="Dengue (Qdenga)"
                description="Proteção contra 4 sorotipos"
                ages={["4-10 anos"]}
                isExclusive
              />
            </div>
          </div>

          {/* PROTEÇÃO ESPECIAL - LACTENTES */}
          <SectionHeader icon={Shield} title="Proteção Especial - Lactentes" color="#dc2626" />

          <div className="bg-gradient-to-r from-red-50 to-rose-100 rounded-xl p-3 mb-3 shadow-lg border border-red-200/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
            <div className="relative z-10 flex items-start gap-2">
              <div className="mt-0.5 p-1 rounded-md shrink-0 shadow-sm bg-gradient-to-br from-amber-400 to-amber-500">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5">
                  <span className="font-bold text-[10px] text-[#15335e] uppercase tracking-tight leading-tight">Nirsevimabe (Anticorpo Anti-VSR)</span>
                  <div className="flex items-center gap-1">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">NOVO</span>
                    <span className="flex items-center gap-0.5 text-[7px] font-bold text-amber-600 bg-gradient-to-r from-amber-100 to-amber-50 px-1 py-0.5 rounded-full border border-amber-200 leading-none shadow-sm">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      PRIVADA
                    </span>
                  </div>
                </div>
                <p className="text-[9px] text-gray-600 leading-snug mt-0.5 font-medium">Proteção contra bronquiolite grave por VSR</p>
                <div className="mt-1">
                  <span className="bg-gradient-to-r from-[#0072a2] to-[#17497e] text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-sm">0-12 meses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Frente */}
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-[#15335e] via-[#17497e] to-[#0072a2] rounded-xl p-4 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6de0e4]/30 to-transparent" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-start gap-4">
                  <div>
                    <p className="font-bold text-[12px] text-white">Saúde Livre Vacinas - Florianópolis Centro</p>
                    <div className="flex items-center gap-1 text-[10px] text-white/80 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#6de0e4]" />
                      <span>Al. Gov. Heriberto Hulse, 123 - Centro, Florianópolis</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white/80">
                      <Phone className="w-3.5 h-3.5 text-[#6de0e4]" />
                      <span>(48) 99189-5758</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg shadow-lg">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[11px] font-bold">WhatsApp</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-[10px] text-white/80">
                    <Mail className="w-3.5 h-3.5 text-[#6de0e4]" />
                    <span>contato@saudelivrefloripa.com.br</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-white/80">
                    <Globe className="w-3.5 h-3.5 text-[#6de0e4]" />
                    <span>saudelivrefloripa.com.br</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-white/80">
                    <Clock className="w-3.5 h-3.5 text-[#6de0e4]" />
                    <span>Seg a Sex: 08h às 18h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VERSO DO FOLDER */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-gradient-to-br from-[#e8f4f8] to-[#d4eef6] shadow-lg mt-8 print:shadow-none print:w-full print:min-h-0 print:mt-0">
        <div className="p-5 print:p-4 min-h-[297mm] flex flex-col">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 flex-1">
            {/* Coluna 1 - Gestantes, Adultos, Viajantes */}
            <div>
              {/* GESTANTES */}
              <SectionHeader icon={Heart} title="Gestantes" color="#ec4899" />
              <div className="mb-3 flex flex-col">
                <SimpleVaccineItem name="dTpa" detail="A cada gestação (20-36 sem)" />
                <SimpleVaccineItem name="Influenza" detail="Qualquer trimestre" />
                <SimpleVaccineItem name="VSR - Abrysvo" detail="32-36 semanas" isExclusive />
                <SimpleVaccineItem name="Hepatite B" detail="Se não vacinada" />
              </div>

              {/* ADULTOS */}
              <SectionHeader icon={Users} title="Adultos (20-59 anos)" color="#3b82f6" />
              <div className="mb-3 flex flex-col">
                <SimpleVaccineItem name="dTpa ou dT" detail="Reforço a cada 10 anos" />
                <SimpleVaccineItem name="Hepatite B" detail="3 doses se não vacinado" />
                <SimpleVaccineItem name="Hepatite A" detail="2 doses" />
                <SimpleVaccineItem name="Tríplice Viral" detail="Conforme idade" />
                <SimpleVaccineItem name="Varicela" detail="2 doses se suscetível" />
                <SimpleVaccineItem name="HPV 9-valente" detail="3 doses" isExclusive />
                <SimpleVaccineItem name="Influenza" detail="Anual" />
                <SimpleVaccineItem name="Febre Amarela" detail="Conforme indicação" />
                <SimpleVaccineItem name="Herpes Zóster (Shingrix)" detail="≥50 anos" isExclusive />
                <SimpleVaccineItem name="Dengue" detail="4-60 anos" />
              </div>

              {/* VIAJANTES */}
              <SectionHeader icon={Plane} title="Viajantes" color="#f59e0b" />
              <div className="flex flex-col mb-4">
                <SimpleVaccineItem name="Febre Tifoide" isExclusive />
                <SimpleVaccineItem name="Cólera" isExclusive />
                <SimpleVaccineItem name="Raiva" />
                <SimpleVaccineItem name="Febre Amarela" />
                <SimpleVaccineItem name="Meningocócica ACWY" />
              </div>
            </div>

            {/* Coluna 2 - Idosos, Tabela, Diferenciais */}
            <div>
              {/* IDOSOS */}
              <SectionHeader icon={Award} title="Idosos (≥60 anos)" color="#8b5cf6" />
              <div className="mb-3 flex flex-col">
                <SimpleVaccineItem name="Influenza Tetravalente HD" detail="Alta dose (>60a)" isExclusive />
                <SimpleVaccineItem name="Pneumocócica Conjugada (VPC15/20)" />
                <SimpleVaccineItem name="Pneumocócica 23-valente" />
                <SimpleVaccineItem name="Herpes Zóster (Shingrix)" isExclusive />
                <SimpleVaccineItem name="VSR (Arexvy/Abrysvo)" isExclusive />
                <SimpleVaccineItem name="dTpa" detail="Reforço a cada 10 anos" />
                <SimpleVaccineItem name="Hepatite A+B" isExclusive />
              </div>

              {/* TABELA COMPARATIVA */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-gradient-to-br from-[#15335e] to-[#0072a2] rounded-lg shadow-md">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <h4 className="font-bold text-[11px] text-[#15335e] uppercase" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Vantagens da Rede Privada</h4>
                </div>
                <ComparisonTable />
              </div>

              {/* POR QUE INDICAR */}
              <div className="bg-gradient-to-br from-[#15335e] via-[#17497e] to-[#0072a2] text-white rounded-xl p-4 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6de0e4]/50 to-transparent" />
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#6de0e4]/10 rounded-full blur-xl" />

                <h4 className="font-bold text-[11px] mb-3 uppercase flex items-center gap-2 relative z-10">
                  <div className="p-1 bg-[#6de0e4]/20 rounded-lg">
                    <Star className="w-4 h-4 fill-[#6de0e4] text-[#6de0e4]" />
                  </div>
                  <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Por que indicar a Saúde Livre?</span>
                </h4>
                <ul className="text-[10px] space-y-1.5 relative z-10">
                  <li className="flex items-start gap-2 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm">
                    <div className="p-0.5 bg-[#6de0e4]/30 rounded">
                      <Check className="w-2.5 h-2.5 text-[#6de0e4]" />
                    </div>
                    <span>Calendário completo SBIm 2024/2025</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm">
                    <div className="p-0.5 bg-[#6de0e4]/30 rounded">
                      <Check className="w-2.5 h-2.5 text-[#6de0e4]" />
                    </div>
                    <span>Cuidados humanizados e técnicas de alívio da dor</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm">
                    <div className="p-0.5 bg-[#6de0e4]/30 rounded">
                      <Check className="w-2.5 h-2.5 text-[#6de0e4]" />
                    </div>
                    <span>Ambiente family friendly e lúdico para crianças</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm">
                    <div className="p-0.5 bg-[#6de0e4]/30 rounded">
                      <Check className="w-2.5 h-2.5 text-[#6de0e4]" />
                    </div>
                    <span>Equipe especializada liderada pela Enf. Sophia</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm">
                    <div className="p-0.5 bg-[#6de0e4]/30 rounded">
                      <Check className="w-2.5 h-2.5 text-[#6de0e4]" />
                    </div>
                    <span>Agendamento fácil via WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm">
                    <div className="p-0.5 bg-[#6de0e4]/30 rounded">
                      <Check className="w-2.5 h-2.5 text-[#6de0e4]" />
                    </div>
                    <span>Horário: Segunda a Sexta, 08h às 18h</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer - Verso */}
          <div className="mt-auto pt-4">
            <div className="bg-gradient-to-r from-[#15335e] via-[#17497e] to-[#0072a2] rounded-xl p-4 text-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6de0e4]/50 to-transparent" />

              <p className="text-[11px] text-white leading-relaxed relative z-10">
                A <strong className="text-[#6de0e4]">Saúde Livre Florianópolis Centro</strong> trabalha em parceria com você para garantir a proteção integral dos seus pacientes. <strong className="text-[#6de0e4]">Encaminhamentos são bem-vindos!</strong>
              </p>
              <div className="flex justify-center gap-3 mt-3 relative z-10">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-semibold text-white">Calendário completo SBIm</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-semibold text-white">Todas as idades</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-semibold text-white">Cuidado humanizado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print instructions - hidden when printing */}
      <div className="max-w-4xl mx-auto mt-8 px-4 print:hidden">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h2 className="font-semibold text-amber-800 mb-2 text-base">Instruções para impressão:</h2>
          <ul className="text-sm text-amber-700 space-y-1.5">
            <li>• Use <strong>Ctrl+P</strong> (Windows) ou <strong>Cmd+P</strong> (Mac) para imprimir</li>
            <li>• Selecione a opção "Imprimir em ambos os lados" ou "Frente e verso"</li>
            <li>• Recomendado: Papel A4 ou A5, couché 150g</li>
            <li>• Marque a opção "Gráficos de fundo" nas configurações de impressão</li>
          </ul>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:page-break-after-always {
            page-break-after: always;
          }

          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
