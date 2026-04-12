/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'dark-blue': '#15335e', // Azul Marinho - fundos escuros, headers, textos principais
          'medium-blue': '#17497e', // Azul Institucional - fundos secundários, seções
          'blue': '#0072a2', // Azul Médio - destaques, títulos, links
          'deep-blue': '#0b4780', // Azul Escuro Profundo - variante escura p/ contraste
          'cyan': '#6de0e4', // Turquesa - acentos, ícones, linhas decorativas, CTAs
          'dark-gray': '#464753', // Cinza Escuro - textos corpo em fundo claro
          'medium-gray': '#8f9498', // Cinza Médio - textos secundários, labels
          'light': '#f0f4f8', // Cinza Fundo Claro - caixas de info, fundos alternados
          'soft-blue': '#e8f4f8', // Azul Fundo Suave - destaque suave
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #6de0e4 0%, #0072a2 30%, #0b4780 100%)',
        'brand-gradient-vertical': 'linear-gradient(to bottom, #6de0e4 0%, #0072a2 50%, #0b4780 100%)',
      },
      fontFamily: {
        sans: ['var(--font-cabin)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
