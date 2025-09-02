import { cn } from '@/lib/utils'

// Navbar component styles
export const navbarStyles = {
  container: 'w-full bg-navbar-bg px-6 py-4',
  inner: 'flex flex-col space-y-3 relative',
  content: 'flex items-center justify-center w-full mt-8',
  wrapper: 'flex items-center justify-between w-full max-w-[1300px]',
  backButton: 'absolute top-0 left-0 flex items-center gap-2 text-foreground hover:bg-muted/50 px-2',
  title: 'text-2xl font-semibold text-foreground',
  actionButton: 'text-white border-sky-600 bg-[#2C9BF4] hover:bg-[#1E87DB] text-[14px] border-[1px]',
} as const

// Table component styles
export const tableStyles = {
  container: 'rounded-lg border overflow-hidden',
  header: 'bg-[#D6E8FF] hover:bg-[#D6E8FF]',
  headerText: 'text-foreground font-medium',
  headerInfo: 'flex items-center justify-center gap-1 text-foreground',
  headerInfoIcon: 'h-[13px] w-[13px] text-muted-foreground cursor-default font-light',
  cell: 'text-foreground',
  mutedCell: 'text-muted-foreground opacity-60',
  checkbox: 'w-4 h-4',
  pagination: 'flex items-center gap-4 mt-4 text-sm text-neutral-600',
  paginationSelect: 'border border-neutral-300 rounded px-2 py-1',
} as const

// Badge component styles
export const badgeStyles = {
  base: 'text-[10px] h-4 px-2 font-normal rounded-sm cursor-pointer transition-colors',
  default: 'text-neutral-600 border border-neutral-300 bg-sky-50 hover:text-neutral-800 hover:border-neutral-400 hover:bg-sky-100',
  primary: 'text-neutral-600 border-[0.5px] border-neutral-400 bg-sky-50 hover:text-neutral-800 hover:border-neutral-500 hover:bg-sky-100',
} as const

// Button component styles
export const buttonStyles = {
  icon: 'h-8 w-8 p-0 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 px-8',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
} as const

// Input component styles
export const inputStyles = {
  base: 'text-base bg-white transition-colors',
  default: 'border border-neutral-300 focus:border-2 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0',
  muted: 'bg-muted/30 focus:border-[1.3px] focus:border-primary',
} as const

// Modal component styles
export const modalStyles = {
  overlay: 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
  content: 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
  header: 'flex flex-col space-y-1.5 text-center sm:text-left',
  title: 'text-lg font-semibold leading-none tracking-tight',
  description: 'text-sm text-muted-foreground',
  footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
} as const

// Utility functions for combining styles
export const createStyleVariant = <T extends Record<string, string>>(styles: T) => {
  return {
    ...styles,
    combine: (...keys: (keyof T)[]) => cn(...keys.map(key => styles[key])),
  }
}

// Pre-combined style variants
export const navbar = createStyleVariant(navbarStyles)
export const table = createStyleVariant(tableStyles)
export const badge = createStyleVariant(badgeStyles)
export const button = createStyleVariant(buttonStyles)
export const input = createStyleVariant(inputStyles)
export const modal = createStyleVariant(modalStyles)
