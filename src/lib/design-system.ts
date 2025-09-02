// Design System Configuration
export const designSystem = {
  colors: {
    // Primary brand colors
    primary: {
      50: 'hsl(var(--primary-50))',
      100: 'hsl(var(--primary-100))',
      500: 'hsl(var(--primary))',
      600: 'hsl(var(--primary-600))',
      700: 'hsl(var(--primary-700))',
      900: 'hsl(var(--primary-900))',
    },
    // Sky blue variant for SERP tracking
    sky: {
      50: 'hsl(var(--sky-50))',
      100: 'hsl(var(--sky-100))',
      500: 'hsl(var(--sky-500))',
      600: 'hsl(var(--sky-600))',
      700: 'hsl(var(--sky-700))',
    },
    // Neutral colors
    neutral: {
      50: 'hsl(var(--neutral-50))',
      100: 'hsl(var(--neutral-100))',
      200: 'hsl(var(--neutral-200))',
      300: 'hsl(var(--neutral-300))',
      400: 'hsl(var(--neutral-400))',
      500: 'hsl(var(--neutral-500))',
      600: 'hsl(var(--neutral-600))',
      700: 'hsl(var(--neutral-700))',
      800: 'hsl(var(--neutral-800))',
      900: 'hsl(var(--neutral-900))',
    },
    // Status colors
    success: 'hsl(var(--success))',
    warning: 'hsl(var(--warning))',
    error: 'hsl(var(--error))',
    info: 'hsl(var(--info))',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
} as const

// Component-specific style utilities
export const componentStyles = {
  navbar: {
    container: 'w-full bg-navbar-bg px-6 py-4',
    title: 'text-2xl font-semibold text-foreground',
    backButton: 'absolute top-0 left-0 flex items-center gap-2 text-foreground hover:bg-muted/50 px-2',
    actionButton: 'text-white border-sky-600 bg-[#2C9BF4] hover:bg-[#1E87DB] text-[14px] border-[1px]',
  },
  table: {
    container: 'rounded-lg border overflow-hidden',
    header: 'bg-[#D6E8FF] hover:bg-[#D6E8FF]',
    headerText: 'text-foreground font-medium',
    cell: 'text-foreground',
    mutedCell: 'text-muted-foreground opacity-60',
  },
  badge: {
    default: 'text-[10px] h-4 px-2 font-normal rounded-sm text-neutral-600 border border-neutral-300 bg-sky-50 hover:text-neutral-800 hover:border-neutral-400 hover:bg-sky-100 cursor-pointer transition-colors',
    primary: 'text-[10px] h-4 px-2 font-normal rounded-sm text-neutral-600 border-[0.5px] border-neutral-400 bg-sky-50 hover:text-neutral-800 hover:border-neutral-500 hover:bg-sky-100 cursor-pointer',
  },
  button: {
    icon: 'h-8 w-8 p-0 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 px-8',
  },
  input: {
    default: 'text-base bg-white border border-neutral-300 focus:border-2 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-colors',
    muted: 'text-base bg-muted/30 bg-white focus:border-[1.3px] focus:border-primary',
  },
} as const

// Utility functions for consistent styling
export const createComponentVariant = (base: string, variants: Record<string, string>) => {
  return (variant?: keyof typeof variants) => {
    return variant ? `${base} ${variants[variant]}` : base
  }
}

// Type-safe color utilities
export const getColor = (color: keyof typeof designSystem.colors) => {
  return designSystem.colors[color]
}
