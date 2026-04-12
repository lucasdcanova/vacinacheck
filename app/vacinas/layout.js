import { VACINAS } from '@/lib/vacinas-data'

export const metadata = {
  title: 'Vacinas e Serviços em Florianópolis - Saúde Livre Vacinas Centro',
  description: 'Catálogo completo de vacinas em Florianópolis Centro: bebês, crianças, gestantes, adultos, idosos e viajantes. Dengue, gripe, HPV, meningite, febre amarela e mais. Agende pelo WhatsApp.',
  keywords: 'vacinas florianópolis, clínica vacinas centro florianópolis, vacina dengue, vacina gripe, vacina HPV, vacina meningite, vacina bebê, saúde livre vacinas',
  alternates: {
    canonical: 'https://saudelivrefloripa.com.br/vacinas',
  },
  openGraph: {
    title: 'Vacinas e Serviços - Saúde Livre Vacinas Florianópolis Centro',
    description: 'Mais de 30 vacinas disponíveis para todas as idades. Dengue, gripe, HPV, meningite, febre amarela e muito mais. Clínica de vacinação no Centro de Florianópolis.',
    url: 'https://saudelivrefloripa.com.br/vacinas',
  },
}

// Schema ItemList para listagem de vacinas
const vacinasOnly = VACINAS.filter(v => v.tipo === 'vacina')
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Vacinas disponíveis na Saúde Livre Florianópolis',
  numberOfItems: vacinasOnly.length,
  itemListElement: vacinasOnly.map((vacina, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: vacina.nomeCompleto || vacina.nome,
    url: `https://saudelivrefloripa.com.br/vacinas/${vacina.slug}`,
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Início',
      item: 'https://saudelivrefloripa.com.br',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Vacinas e Serviços',
      item: 'https://saudelivrefloripa.com.br/vacinas',
    },
  ],
}

export default function VacinasLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
