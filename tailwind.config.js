/** @type {import('tailwindcss').Config} */
module.exports = {
  /* Carried from the cart-drawer branch: emitted in its committed CSS but no longer in any .liquid */
  safelist: [
    'border-[#466E2E]',
    'h-[10px]',
    'h-[5.5px]',
    'leading-[10px]',
    'left-1',
    'left-[2.5px]',
    'lg:rounded-[15px]',
    'rounded-[2px]',
    'text-[6px]',
    'text-[8px]',
    'text-[#040]',
    'text-[#466e2e]',
    'top-1',
    'top-[2.5px]',
    'w-[14.5px]',
    'w-[24.5px]',
    'w-[52px]',
    'border-x',
    'h-20',
    'hover:text-error',
    'lg:left-0',
    'w-1/4',
    '[&:not(:last-child)]:border-b-[0.5px]',
    '[&:not(:last-child)]:border-[#E5E5E5]',
    '[&_.button]:h-[36px]',
    '[&_.button]:gap-2.5',
    '[&_.button]:rounded-lg',
    '[&_.button]:text-sm',
    '[&_.button]:leading-[21px]',
  ],
  content: [
    './layout/**/*.liquid',
    './templates/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './blocks/**/*.liquid',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '430px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',

      /* Object-syntax screens disable Tailwind's automatic max-* variants, so max-lg is declared here */
      'max-lg': { max: '1023px' },
      'max-md': { max: '767px' },
      'max-374': { max: '374px' },
    },
    extend: {
      fontFamily: {
        primary: 'var(--font-primary--family)',
        secondary: 'var(--font-secondary--family)',
      },
      spacing: {
        15: '60px',
        18: '72px',
      },
      fontSize: {
        /* Headings — Space Grotesk. Mobile token, then -d desktop counterpart */
        'hero-heading': ['32px', { lineHeight: '40.83px', letterSpacing: '0' }],
        'hero-heading-d': ['56px', { lineHeight: '74px', letterSpacing: '0' }],
        'section-heading': ['24px', { lineHeight: '32px', letterSpacing: '-0.2px' }],
        'section-heading-d': ['34px', { lineHeight: '47px', letterSpacing: '-0.2px' }],
        'strip-heading-xs': ['22px', { lineHeight: '28.08px', letterSpacing: '0' }],
        'strip-heading': ['26px', { lineHeight: '33.18px', letterSpacing: '0' }],
        'strip-heading-d': ['38px', { lineHeight: '48.49px', letterSpacing: '0' }],
        'offer-display': ['32px', { lineHeight: '32px', letterSpacing: '0' }],
        'offer-display-d': ['42px', { lineHeight: '42px', letterSpacing: '0' }],
        /* Body — DM Sans */
        subheading: ['16px', { lineHeight: '22px', letterSpacing: '-0.18px' }],
        'subheading-d': ['18px', { lineHeight: '28px', letterSpacing: '0' }],
        body: ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'body-d': ['14px', { lineHeight: '21px', letterSpacing: '0' }],
        /* Labels — DM Sans. Weight applied separately via font-medium / font-semibold */
        'label-xs': ['10px', { lineHeight: '16px', letterSpacing: '0' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '-0.12px' }],
        'label-md': ['14px', { lineHeight: '20px', letterSpacing: '-0.16px' }],
        'label-lg': ['16px', { lineHeight: '22px', letterSpacing: '-0.18px' }],
      },
      backgroundImage: {
        'ticket-dash':
          'repeating-linear-gradient(to right, rgb(var(--color-primary)) 0 4px, transparent 4px 7px), repeating-linear-gradient(to bottom, rgb(var(--color-primary)) 0 4px, transparent 4px 7px), repeating-linear-gradient(to right, rgb(var(--color-primary)) 0 4px, transparent 4px 7px)',
      },
      backgroundSize: {
        'ticket-dash-size': '100% 1px, 1px 100%, 100% 1px',
      },
      backgroundPosition: {
        'ticket-dash-pos': '0 0, 100% 0, 0 100%',
      },
      colors: {
        /* Primary brand */
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'brand-yellow': 'rgb(var(--color-brand-yellow) / <alpha-value>)',
        'green-secondary': 'rgb(var(--color-green-secondary) / <alpha-value>)',
        'green-dark': 'rgb(var(--color-green-dark) / <alpha-value>)',
        /* Neutrals */
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--color-primary-foreground) / <alpha-value>)',
        cream: 'rgb(var(--color-cream) / <alpha-value>)',
        'cream-alt': 'rgb(var(--color-cream-alt) / <alpha-value>)',
        /* Status */
        error: 'rgb(var(--color-error) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        sale: 'rgb(var(--color-sale) / <alpha-value>)',
        rating: 'rgb(var(--color-rating) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
