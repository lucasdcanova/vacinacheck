import { VACINAS } from '@/lib/vacinas-data'

export default function sitemap() {
  const baseUrl = 'https://saudelivrefloripa.com.br'

  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/vacinas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/equipe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Páginas individuais de vacinas/serviços
  const vacinaPages = VACINAS.map(vacina => ({
    url: `${baseUrl}/vacinas/${vacina.slug}`,
    lastModified: new Date(),
    changeFrequency: vacina.tipo === 'vacina' ? 'monthly' : 'monthly',
    priority: vacina.tipo === 'vacina' ? 0.8 : 0.6,
  }))

  return [...staticPages, ...vacinaPages]
}
