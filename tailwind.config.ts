import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAF8F5',
        surface: '#F2EDE4',
        'surface-muted': '#E8E1D5',
        ink: {
          DEFAULT: '#181716',
          muted: '#524D47',
          faint: '#857F77',
        },
        accent: {
          DEFAULT: '#C2410C',
          hover: '#9A3412',
          faint: '#FFEDD5',
        },
        line: '#E5DFD5',
        'line-dark': '#181716',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Newsreader', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
