export const metadata = {
  title: 'Nossa Equipe - Saúde Livre Vacinas Florianópolis Centro',
  description: 'Conheça a equipe técnica da Saúde Livre Florianópolis Centro. Enfermeira Thais Alves lidera nosso time com foco em atendimento humanizado e segurança na vacinação.',
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
  name: 'Thais Aparecida Campos Rodrigues Alves',
  jobTitle: 'Enfermeira Responsável Técnica',
  description: 'Enfermeira graduada responsável técnica da Saúde Livre Vacinas Florianópolis Centro. Experiência em vacinação, SCIH, Núcleo de Segurança do Paciente e atendimento humanizado.',
  image: 'https://saudelivrefloripa.com.br/equipe/thais.jpg',
  worksFor: {
    '@type': 'MedicalClinic',
    name: 'Saúde Livre Vacinas - Florianópolis Centro',
    url: 'https://saudelivrefloripa.com.br',
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'Bacharelado em Enfermagem - Centro Universitário Estácio (UNIMETA)',
    },
  ],
  knowsAbout: [
    'Vacinação Infantil',
    'Vacinação para Adultos',
    'Sala de Vacina e Imunobiológicos (PNI)',
    'Atendimento Humanizado',
    'Segurança do Paciente',
    'SCIH - Serviço de Controle de Infecção Hospitalar',
    'Cuidados Clínicos e Home Care',
    'Classificação de Risco',
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
