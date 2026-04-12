import { notFound } from 'next/navigation'
import { getVacinaBySlug, getAllSlugs } from '@/lib/vacinas-data'
import VacinaPageClient from './VacinaPageClient'

// Gerar todas as páginas estáticas no build
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

// Metadata dinâmica para SEO
export async function generateMetadata({ params }) {
  const { slug } = await params
  const vacina = getVacinaBySlug(slug)
  if (!vacina) return {}

  const title = `${vacina.nome} - Saúde Livre Vacinas Florianópolis`
  const description = vacina.descricaoDetalhada
    ? vacina.descricaoDetalhada.substring(0, 155) + '...'
    : vacina.descricao

  return {
    title,
    description,
    keywords: vacina.keywords?.join(', '),
    alternates: {
      canonical: `https://saudelivrefloripa.com.br/vacinas/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://saudelivrefloripa.com.br/vacinas/${slug}`,
      type: 'article',
    },
  }
}

export default async function VacinaPage({ params }) {
  const { slug } = await params
  const vacina = getVacinaBySlug(slug)

  if (!vacina) {
    notFound()
  }

  // Schema MedicalProcedure ou Product dependendo do tipo
  const schemaType = vacina.tipo === 'produto' ? 'Product' : 'MedicalProcedure'
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: vacina.nomeCompleto || vacina.nome,
    description: vacina.descricaoDetalhada || vacina.descricao,
    ...(vacina.tipo === 'vacina' && {
      procedureType: 'http://schema.org/NoninvasiveProcedure',
      howPerformed: vacina.esquemaVacinal,
      preparation: vacina.cuidados,
      bodyLocation: 'Braço (intramuscular)',
    }),
    provider: {
      '@type': 'MedicalClinic',
      name: 'Saúde Livre Vacinas - Florianópolis Centro',
      url: 'https://saudelivrefloripa.com.br',
      telephone: '+5548991895758',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Alameda Governador Heriberto Hulse, 123',
        addressLocality: 'Florianópolis',
        addressRegion: 'SC',
        postalCode: '88015-620',
        addressCountry: 'BR',
      },
    },
  }

  // Schema BreadcrumbList
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
      {
        '@type': 'ListItem',
        position: 3,
        name: vacina.nome,
        item: `https://saudelivrefloripa.com.br/vacinas/${slug}`,
      },
    ],
  }

  // Schema FAQ se houver perguntas
  const faqSchema = vacina.faq && vacina.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: vacina.faq.map(f => ({
          '@type': 'Question',
          name: f.pergunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.resposta,
          },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <VacinaPageClient vacina={vacina} />
    </>
  )
}
