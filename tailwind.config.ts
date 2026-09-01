import type { Config } from 'tailwindcss';

/**
 * Design tokens for IPTV Turkey.
 *
 * Palette: deep navy base with a rich Turkiye red accent.
 * Type: Archivo for display, Source Sans 3 for body - both ship the full
 * Latin Extended range, so Turkish diacritics render correctly.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#080A11', // near-black base
          800: '#0D1119', // raised surface
          700: '#12171F', // card surface
          600: '#1E2430', // hairline border
          500: '#2C3442', // stronger border
        },
        brand: {
          600: '#B8121F',
          500: '#E11D2E',
          400: '#F03A48',
          300: '#FF6B76',
        },
        paper: '#F4F7FC',
        mist: '#A6B4CC',
        haze: '#71809B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['clamp(2.5rem, 1.6rem + 3.4vw, 4.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2rem, 1.4rem + 2.2vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 1.2rem + 1.2vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)', { lineHeight: '1.65' }],
      },
      maxWidth: {
        shell: '76rem',
        wide: '90rem',
        prose: '42rem',
      },
      borderRadius: {
        card: '0.875rem',
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 32px -18px rgba(0,0,0,0.9)',
        lift: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 48px -24px rgba(0,0,0,0.95)',
      },
      backgroundImage: {
        glass: 'linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
        accent: 'linear-gradient(96deg, #E11D2E, #FF6B76)',
        // Metallic sheen used on the wordmark and accent words.
        sheen: 'linear-gradient(100deg, #FF8189 0%, #E11D2E 38%, #B8121F 62%, #FF6B76 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
