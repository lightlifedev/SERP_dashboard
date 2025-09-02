# SERP Tracking - Style Guide

## Overview

This project uses a component-based CSS architecture with Tailwind CSS and a centralized design system to ensure consistency, maintainability, and scalability.

## Design System

### Color Palette

#### Primary Colors
- `--primary`: Main brand color (HSL: 212 100% 50%)
- `--primary-50` to `--primary-900`: Primary color variants
- `--primary-foreground`: Text color on primary backgrounds

#### Sky Blue Variants (SERP-specific)
- `--sky-50` to `--sky-700`: Sky blue color variants
- Used for SERP tracking specific UI elements

#### Neutral Colors
- `--neutral-50` to `--neutral-900`: Neutral grays
- Used for text, borders, and backgrounds

#### Status Colors
- `--success`: Green for success states
- `--warning`: Yellow for warning states
- `--error`: Red for error states
- `--info`: Blue for informational states

### Typography

- **Font Family**: Poppins (sans-serif)
- **Base Line Height**: 1.5
- **Font Smoothing**: Antialiased

### Spacing

- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)
- `2xl`: 3rem (48px)

### Border Radius

- `sm`: 0.25rem (4px)
- `md`: 0.375rem (6px)
- `lg`: 0.5rem (8px)
- `xl`: 0.75rem (12px)

## Component Styling Patterns

### 1. Use Design System Tokens

✅ **Good:**
```tsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</Button>
```

❌ **Bad:**
```tsx
<Button className="bg-blue-500 text-white hover:bg-blue-600">
  Click me
</Button>
```

### 2. Use Component Style Utilities

✅ **Good:**
```tsx
import { navbar } from '@/lib/component-styles'

<nav className={navbar.container}>
  <h1 className={navbar.title}>SERP Tracking</h1>
</nav>
```

❌ **Bad:**
```tsx
<nav className="w-full bg-navbar-bg px-6 py-4">
  <h1 className="text-2xl font-semibold text-foreground">SERP Tracking</h1>
</nav>
```

### 3. Combine Styles with `cn()` Utility

✅ **Good:**
```tsx
import { cn } from '@/lib/utils'
import { table } from '@/lib/component-styles'

<TableHead className={cn("text-center", table.headerText)}>
  Schedule
</TableHead>
```

### 4. Use Semantic Class Names

✅ **Good:**
```tsx
<div className="flex items-center justify-between">
  <span className="text-muted-foreground">Loading...</span>
</div>
```

❌ **Bad:**
```tsx
<div className="flex items-center justify-between">
  <span className="text-gray-500">Loading...</span>
</div>
```

## File Structure

```
src/
├── lib/
│   ├── design-system.ts      # Design system configuration
│   ├── component-styles.ts   # Component-specific style utilities
│   └── utils.ts             # Utility functions (cn, etc.)
├── styles/
│   └── base.css             # Base CSS reset and global styles
└── index.css                # Main CSS file with Tailwind imports
```

## Best Practices

### 1. Component Scoping
- Use component-specific style utilities to avoid global CSS conflicts
- Keep styles close to their components
- Use CSS modules or styled-components for complex styling needs

### 2. Responsive Design
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Design mobile-first
- Test on multiple screen sizes

### 3. Accessibility
- Maintain proper color contrast ratios
- Use semantic HTML elements
- Include focus states for interactive elements
- Provide screen reader support with `sr-only` class

### 4. Performance
- Minimize CSS bundle size
- Use CSS custom properties for dynamic values
- Avoid deeply nested selectors
- Use Tailwind's purge feature to remove unused styles

### 5. Maintainability
- Document complex styling decisions
- Use consistent naming conventions
- Keep design system up to date
- Regular code reviews for styling consistency

## Common Patterns

### Button Variants
```tsx
// Primary button
<Button className={button.primary}>Primary Action</Button>

// Icon button
<Button className={button.icon}>
  <Icon className="h-4 w-4" />
</Button>

// Ghost button
<Button className={button.ghost}>Secondary Action</Button>
```

### Form Inputs
```tsx
// Default input
<Input className={cn(input.base, input.default)} />

// Muted input
<Input className={cn(input.base, input.muted)} />
```

### Table Styling
```tsx
<div className={table.container}>
  <Table>
    <TableHeader>
      <TableRow className={table.header}>
        <TableHead className={table.headerText}>Column</TableHead>
      </TableRow>
    </TableHeader>
  </Table>
</div>
```

### Badge Components
```tsx
<Badge className={cn(badge.base, badge.default)}>
  Default Badge
</Badge>

<Badge className={cn(badge.base, badge.primary)}>
  Primary Badge
</Badge>
```

## Migration Guide

When updating existing components:

1. **Identify hardcoded colors** and replace with design system tokens
2. **Extract repeated patterns** into component style utilities
3. **Update class names** to use semantic naming
4. **Test thoroughly** to ensure visual consistency
5. **Update documentation** for any new patterns

## Tools and Resources

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library with consistent design
- **CSS Custom Properties**: For dynamic theming
- **TypeScript**: For type-safe styling utilities

## Contributing

When contributing to this project:

1. Follow the established design system
2. Use component style utilities for consistency
3. Test your changes across different screen sizes
4. Ensure accessibility standards are met
5. Update this style guide if introducing new patterns
