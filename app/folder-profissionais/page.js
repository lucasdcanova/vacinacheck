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
  <span className="bg-green-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full ml-1">NOVO</span>
);

// Age badge component
const AgeBadge = ({ ages, color = "brand-blue" }) => (
  <div className="flex flex-wrap gap-1 mt-0.5">
    {ages.map((age, i) => (
      <span key={i} className={`bg-[#0072a2] text-white text-[8px] font-bold px-1.5 py-0.5 rounded`}>
        {age}
      </span>
    ))}
  </div>
);

// Vaccine item component
const VaccineItem = ({ name, description, ages, isExclusive, isNew }) => (
  <div className="mb-2">
    <div className="flex items-start gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-[#6de0e4] mt-1.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-1">
          <span className="font-semibold text-[10px] text-[#15335e]">{name}</span>
          {isNew && <NewBadge />}
        </div>
        {description && <p className="text-[8px] text-gray-600 leading-tight">{description}</p>}
        {ages && <AgeBadge ages={ages} />}
        {isExclusive && <ExclusiveBadge />}
      </div>
    </div>
  </div>
);

// Section header component
const SectionHeader = ({ icon: Icon, title, color = "#0072a2" }) => (
  <div className="flex items-center gap-2 mb-2 pb-1 border-b-2" style={{ borderColor: color }}>
    <div className="p-1 rounded-full" style={{ backgroundColor: `${color}20` }}>
      <Icon className="w-3.5 h-3.5" style={{ color }} />
    </div>
    <h3 className="font-bold text-[11px] uppercase tracking-wide" style={{ color }}>{title}</h3>
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full text-[8px]">
        <thead>
          <tr className="bg-[#15335e] text-white">
            <th className="text-left px-1.5 py-1 font-semibold">Vacina</th>
            <th className="text-center px-1 py-1 font-semibold">SUS</th>
            <th className="text-center px-1 py-1 font-semibold">Privada</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-1.5 py-0.5 text-gray-700">{item.vaccine}</td>
              <td className="text-center px-1 py-0.5">
                <X className="w-3 h-3 text-red-500 mx-auto" />
              </td>
              <td className="text-center px-1 py-0.5">
                <Check className="w-3 h-3 text-green-500 mx-auto" />
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
      {/* Print instructions - hidden when printing */}
      <div className="max-w-4xl mx-auto mb-4 px-4 print:hidden">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h2 className="font-semibold text-amber-800 mb-2">Instruções para impressão:</h2>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Use <strong>Ctrl+P</strong> (Windows) ou <strong>Cmd+P</strong> (Mac) para imprimir</li>
            <li>• Selecione a opção "Imprimir em ambos os lados" ou "Frente e verso"</li>
            <li>• Recomendado: Papel A4 ou A5, couché 150g</li>
            <li>• Marque a opção "Gráficos de fundo" nas configurações de impressão</li>
          </ul>
        </div>
      </div>

      {/* FRENTE DO FOLDER */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none print:w-full print:min-h-0 print:page-break-after-always">
        <div className="p-6 print:p-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4 pb-3 border-b-2 border-[#0072a2]">
            <div className="w-20 h-20 flex items-center justify-center">
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
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#15335e] tracking-tight">SAÚDE LIVRE VACINAS</h1>
              <p className="text-sm font-semibold text-[#0072a2]">Unidade Florianópolis Centro</p>
              <p className="text-xs text-gray-500 italic">Prevenção é um ato de amor</p>
            </div>
          </div>

          {/* Intro message */}
          <div className="bg-[#e8f4f8] rounded-lg p-3 mb-4 flex items-start gap-3">
            <Stethoscope className="w-8 h-8 text-[#0072a2] shrink-0" />
            <p className="text-[10px] text-gray-700 leading-relaxed">
              <strong>Caro(a) Colega Profissional de Saúde,</strong> a <strong>Saúde Livre Florianópolis Centro</strong> oferece o calendário vacinal completo da rede privada, seguindo as recomendações da <strong>SBIm 2024/2025</strong>. Encaminhe seus pacientes com confiança.
            </p>
          </div>

          {/* VACINAS PEDIÁTRICAS */}
          <SectionHeader icon={Baby} title="Vacinas Pediátricas (0-10 anos)" color="#0072a2" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-0 mb-4">
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

          <div className="bg-red-50 rounded-lg p-3 mb-4">
            <VaccineItem
              name="Nirsevimabe (Anticorpo Anti-VSR)"
              description="Proteção contra bronquiolite grave por VSR"
              ages={["0-12 meses"]}
              isNew
              isExclusive
            />
          </div>

          {/* Footer - Frente */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div>
                  <p className="font-bold text-[10px] text-[#15335e]">Saúde Livre Vacinas - Florianópolis Centro</p>
                  <div className="flex items-center gap-1 text-[9px] text-gray-600 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>Al. Gov. Heriberto Hulse, 123 - Centro, Florianópolis</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-gray-600">
                    <Phone className="w-3 h-3" />
                    <span>(48) 99189-5758</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-green-500 text-white px-2 py-1 rounded-lg">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-[10px] font-semibold">WhatsApp</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-[9px] text-gray-600">
                  <Mail className="w-3 h-3" />
                  <span>contato@saudelivrefloripa.com.br</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-gray-600">
                  <Globe className="w-3 h-3" />
                  <span>saudelivrefloripa.com.br</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>Seg a Sex: 08h às 18h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VERSO DO FOLDER */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg mt-8 print:shadow-none print:w-full print:min-h-0 print:mt-0">
        <div className="p-6 print:p-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {/* Coluna 1 - Gestantes, Adultos, Viajantes */}
            <div>
              {/* GESTANTES */}
              <SectionHeader icon={Heart} title="Gestantes" color="#ec4899" />
              <div className="mb-4 text-[9px] space-y-1">
                <p><span className="font-semibold text-[#15335e]">dTpa</span> - A cada gestação (20-36 sem)</p>
                <p><span className="font-semibold text-[#15335e]">Influenza</span> - Qualquer trimestre</p>
                <p><span className="font-semibold text-[#15335e]">VSR - Abrysvo</span> - 32-36 semanas <span className="text-amber-600 font-bold">★ EXCLUSIVA</span></p>
                <p><span className="font-semibold text-[#15335e]">Hepatite B</span> - Se não vacinada</p>
              </div>

              {/* ADULTOS */}
              <SectionHeader icon={Users} title="Adultos (20-59 anos)" color="#3b82f6" />
              <div className="mb-4 text-[9px] space-y-1">
                <p><span className="font-semibold text-[#15335e]">dTpa ou dT</span> - Reforço a cada 10 anos</p>
                <p><span className="font-semibold text-[#15335e]">Hepatite B</span> - 3 doses se não vacinado</p>
                <p><span className="font-semibold text-[#15335e]">Hepatite A</span> - 2 doses</p>
                <p><span className="font-semibold text-[#15335e]">Tríplice Viral</span> - Conforme idade</p>
                <p><span className="font-semibold text-[#15335e]">Varicela</span> - 2 doses se suscetível</p>
                <p><span className="font-semibold text-[#15335e]">HPV 9-valente</span> - 3 doses <span className="text-amber-600 font-bold">★ EXCLUSIVA</span></p>
                <p><span className="font-semibold text-[#15335e]">Influenza</span> - Anual</p>
                <p><span className="font-semibold text-[#15335e]">Febre Amarela</span> - Conforme indicação</p>
                <p><span className="font-semibold text-[#15335e]">Herpes Zóster (Shingrix)</span> - ≥50 anos <span className="text-amber-600 font-bold">★ EXCLUSIVA</span></p>
                <p><span className="font-semibold text-[#15335e]">Dengue</span> - 4-60 anos</p>
              </div>

              {/* VIAJANTES */}
              <SectionHeader icon={Plane} title="Viajantes" color="#f59e0b" />
              <div className="text-[9px] space-y-1">
                <p><span className="font-semibold text-[#15335e]">Febre Tifoide</span> <span className="text-amber-600 font-bold">★ EXCLUSIVA</span></p>
                <p><span className="font-semibold text-[#15335e]">Cólera</span> <span className="text-amber-600 font-bold">★ EXCLUSIVA</span></p>
                <p><span className="font-semibold text-[#15335e]">Raiva</span></p>
                <p><span className="font-semibold text-[#15335e]">Febre Amarela</span></p>
                <p><span className="font-semibold text-[#15335e]">Meningocócica ACWY</span></p>
              </div>
            </div>

            {/* Coluna 2 - Idosos, Tabela, Diferenciais */}
            <div>
              {/* IDOSOS */}
              <SectionHeader icon={Award} title="Idosos (≥60 anos)" color="#8b5cf6" />
              <div className="mb-4 text-[9px] space-y-1">
                <p><span className="font-semibold text-[#15335e]">Influenza Tetravalente HD</span> <span className="text-amber-600 font-bold">★ EXCLUSIVA</span></p>
                <p className="text-gray-500 text-[8px] ml-2">Alta dose para melhor resposta</p>
                <p><span className="font-semibold text-[#15335e]">Pneumocócica Conjugada (VPC15/20)</span></p>
                <p><span className="font-semibold text-[#15335e]">Pneumocócica 23-valente</span></p>
                <p><span className="font-semibold text-[#15335e]">Herpes Zóster (Shingrix)</span> <span className="text-amber-600 font-bold">★ EXCLUSIVA</span></p>
                <p><span className="font-semibold text-[#15335e]">VSR (Arexvy/Abrysvo)</span> <span className="text-amber-600 font-bold">★ EXCLUSIVA</span></p>
                <p><span className="font-semibold text-[#15335e]">dTpa</span> - Reforço a cada 10 anos</p>
                <p><span className="font-semibold text-[#15335e]">Hepatite A+B</span> <span className="text-amber-600 font-bold">★ EXCLUSIVA</span></p>
              </div>

              {/* TABELA COMPARATIVA */}
              <div className="mb-4">
                <h4 className="font-bold text-[10px] text-[#15335e] mb-2 uppercase">Vantagens da Rede Privada</h4>
                <ComparisonTable />
              </div>

              {/* POR QUE INDICAR */}
              <div className="bg-[#15335e] text-white rounded-lg p-3">
                <h4 className="font-bold text-[11px] mb-2 uppercase flex items-center gap-2">
                  <Star className="w-4 h-4 fill-[#6de0e4] text-[#6de0e4]" />
                  Por que indicar a Saúde Livre?
                </h4>
                <ul className="text-[9px] space-y-1.5">
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#6de0e4] shrink-0 mt-0.5" />
                    <span>Calendário completo SBIm 2024/2025</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#6de0e4] shrink-0 mt-0.5" />
                    <span>Cuidados humanizados e técnicas de alívio da dor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#6de0e4] shrink-0 mt-0.5" />
                    <span>Ambiente family friendly e lúdico para crianças</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#6de0e4] shrink-0 mt-0.5" />
                    <span>Equipe especializada liderada pela Enf. Sophia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#6de0e4] shrink-0 mt-0.5" />
                    <span>Agendamento fácil via WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#6de0e4] shrink-0 mt-0.5" />
                    <span>Horário: Segunda a Sexta, 08h às 18h</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer - Verso */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="bg-[#e8f4f8] rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-700 leading-relaxed">
                A <strong>Saúde Livre Florianópolis Centro</strong> trabalha em parceria com você para garantir a proteção integral dos seus pacientes. <strong>Encaminhamentos são bem-vindos!</strong>
              </p>
              <div className="flex justify-center gap-4 mt-2 text-[9px] font-semibold text-[#0072a2]">
                <span>Calendário completo SBIm</span>
                <span>|</span>
                <span>Todas as idades</span>
                <span>|</span>
                <span>Cuidado humanizado</span>
              </div>
            </div>
          </div>
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
