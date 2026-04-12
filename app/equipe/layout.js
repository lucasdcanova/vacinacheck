export const metadata = {
  title: 'Nossa Equipe - Saúde Livre Vacinas Florianópolis Centro',
  description: 'Conheça a equipe técnica da Saúde Livre Florianópolis Centro. Enfermeira Sophia Francy lidera nosso time com foco em atendimento humanizado e segurança na vacinação.',
  alternates: {
    canonical: 'https://saudelivrefloripa.com.br/equipe',
  },
  openGraph: {
    title: 'Nossa Equipe - Saúde Livre Vacinas Florianópolis',
    description: 'Equipe técnica especializada em vacinação com atendimento humanizado. Conheça os profissionais da Saúde Livre Florianópolis Centro.',
    url: 'https://saudelivrefloripa.com.br/equipe',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sophia Francy da Silva Mendes',
  jobTitle: 'Enfermeira Responsável Técnica',
  description: 'Enfermeira graduada responsável técnica da Saúde Livre Vacinas Florianópolis Centro. Especialista em atendimento humanizado e vacinação segura.',
  image: 'https://saudelivrefloripa.com.br/equipe/sophia.jpg',
  worksFor: {
    '@type': 'MedicalClinic',
    name: 'Saúde Livre Vacinas - Florianópolis Centro',
    url: 'https://saudelivrefloripa.com.br',
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'Graduação em Enfermagem - Centro Universitário Estácio',
    },
  ],
  knowsAbout: [
    'Vacinação Infantil',
    'Vacinação para Adultos',
    'Atendimento Humanizado',
    'Vigilância Epidemiológica',
    'Gerontologia',
    'Enfermagem do Trabalho',
  ],
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
      name: 'Nossa Equipe',
      item: 'https://saudelivrefloripa.com.br/equipe',
    },
  ],
}

export default function EquipeLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
