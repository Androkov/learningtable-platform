/**
 * Design Tokens for Learning Table
 * 
 * This file contains reusable design values for consistent styling across the application.
 * These tokens can be imported and used in components or extended in Tailwind config.
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    amber: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    }
  },
  
  // Light Mode
  light: {
    background: '#fafaf9', // slate-50
    surface: '#ffffff',
    text: {
      primary: '#0f172a', // slate-900
      secondary: '#334155', // slate-700
      tertiary: '#64748b', // slate-500
    },
    border: '#e2e8f0', // slate-200
  },
  
  // Dark Mode
  dark: {
    background: '#020617', // slate-950
    surface: '#1e293b', // slate-800
    text: {
      primary: '#f8fafc', // slate-50
      secondary: '#e2e8f0', // slate-200
      tertiary: '#94a3b8', // slate-400
    },
    border: '#1e293b', // slate-800
  }
};

export const typography = {
  // Font Families
  fonts: {
    heading: '"Inter", system-ui, -apple-system, sans-serif',
    body: '"Inter", system-ui, -apple-system, sans-serif',
    reading: 'Georgia, "Times New Roman", serif',
  },
  
  // Font Sizes (mobile first, then desktop)
  sizes: {
    xs: ['0.75rem', '1rem'],      // 12px / 16px
    sm: ['0.875rem', '1.25rem'],  // 14px / 20px
    base: ['1rem', '1.5rem'],     // 16px / 24px
    lg: ['1.125rem', '1.75rem'],  // 18px / 28px
    xl: ['1.25rem', '1.875rem'],  // 20px / 30px
    '2xl': ['1.5rem', '2rem'],    // 24px / 32px
    '3xl': ['1.875rem', '2.25rem'], // 30px / 36px
    '4xl': ['2.25rem', '2.5rem'], // 36px / 40px
    '5xl': ['3rem', '1'],         // 48px / 48px
    '6xl': ['3.75rem', '1'],      // 60px / 60px
  },
  
  // Line Heights for Reading
  lineHeights: {
    compact: 1.5,
    normal: 1.75,
    spacious: 2,
  }
};

export const spacing = {
  // Section Padding
  section: {
    mobile: '4rem',   // py-16
    desktop: '6rem',  // py-24
  },
  
  // Container Padding
  container: {
    mobile: '1.5rem', // px-6
    desktop: '2rem',  // px-8
  },
  
  // Component Gaps
  gaps: {
    xs: '0.5rem',     // gap-2
    sm: '0.75rem',    // gap-3
    md: '1rem',       // gap-4
    lg: '1.5rem',     // gap-6
    xl: '2rem',       // gap-8
  }
};

export const effects = {
  // Transition Durations
  transitions: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    verySlow: '500ms',
  },
  
  // Timing Functions
  easing: {
    default: 'ease',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  
  // Border Radius
  radius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
  }
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  base: 1,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
};

/**
 * Usage Examples:
 * 
 * import { colors, typography, spacing } from '@/styles/design-tokens';
 * 
 * // In a component:
 * <div style={{ 
 *   color: colors.dark.text.primary,
 *   fontFamily: typography.fonts.reading,
 *   padding: spacing.container.mobile
 * }}>
 */
