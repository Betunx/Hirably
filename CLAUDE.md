# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hirably is an Angular 17 landing page application for a nearshore staffing and recruitment company. The application uses Tailwind CSS for styling with a custom design system focused on muted, pastel colors and soft backgrounds.

## Development Commands

### Installation
```bash
npm install
npm install -g @angular/cli  # If not already installed
```

### Development Server
```bash
ng serve
# or
npm start
```

### Build
```bash
ng build                    # Development build
npm run build:prod          # Production build (optimized)
```

### Deployment
```bash
vercel --prod              # Deploy to Vercel
```

## Architecture & Code Structure

### Component Organization

The project follows a modular component architecture:

- **`src/app/core/`** - Core layout components (navbar, footer) used across the entire app
- **`src/app/pages/`** - Page-level components (e.g., `HomeComponent`)
- **`src/app/components/`** - Feature/section components used within pages
- **`src/app/shared/`** - Reusable UI components and utilities
- **`src/app/services/`** - Application services (data, chatbot, scroll)
- **`src/app/models/`** - TypeScript interfaces and type definitions

### Module vs Standalone Components

The app uses a hybrid approach:
- Most components are declared in `AppModule` (traditional module-based)
- Some shared/utility components are standalone (e.g., `ChatbotComponent`, `SectionHeaderComponent`, `CtaButtonComponent`, `MeetUsComponent`)
- Standalone components are imported directly into the module's `imports` array

### Base Classes for Code Reuse

The project uses abstract base classes to eliminate repetitive patterns:

1. **`BaseDataComponent`** (`src/app/shared/base/base-data.component.ts`)
   - Handles the common pattern of injecting DataService and loading data in ngOnInit
   - Subclasses implement `loadData()` method
   - Eliminates boilerplate across 5+ components

2. **`BaseCarouselComponent<T>`** (`src/app/components/shared/base-carousel.component.ts`)
   - Abstract base for carousel components with autoplay, navigation, and responsive behavior
   - Features:
     - Autoplay with configurable duration (default 4 seconds)
     - Responsive visible items (1 on mobile, 2 on tablet, 3+ on desktop)
     - Navigation methods: `next()`, `prev()`, `goToSlide(index)`
     - Window resize handling
   - Subclasses implement `loadItems()` to populate carousel data
   - Used by `FeatureCarouselComponent` and `RolesCarouselComponent`

### Routing

- Uses Angular Router with manual scroll management
- Scroll position restoration is disabled - scroll is handled manually via `ScrollService`
- Anchor scrolling is disabled with a 80px offset for the fixed navbar
- Routes:
  - `/` → HomeComponent
  - `/meet-us` → MeetUsComponent
  - `**` → Redirects to home

### Services

- **DataService** - Provides static data for features, roles, pricing, etc.
- **ChatbotService** - Handles chatbot functionality
- **ScrollService** - Custom smooth scroll behavior with navbar offset

## Styling & Design System

### Tailwind Configuration

Custom color palette defined in `tailwind.config.js`:

**Primary Colors:**
- `taupe-dark`: #4c4a47 - Deep gray/brown for text & footer
- `gray-medium`: #747775
- `gray-light`: #C4C7C5

**Accent Colors:**
- `muted-blue`: #93c5fd - Primary accent for CTAs
- `light-blue-bg`: #C2E7FF

**Secondary Pastels:**
- `pastel-purple`: #c4b5fd
- `pastel-yellow`: #fde047
- `pastel-green-soft`: #a7f3d0

**Backgrounds:**
- `cream-soft`: #f8f5f2 - Soft background for sections
- `beige-offwhite`: #fcfcfc - Main body/header background

**Typography:**
- Sans: Inter, system-ui
- Display: Poppins

**Custom Animations:**
- `float` - 3s floating animation
- `float-delayed` - 3s delayed floating animation
- `fade-in` - 0.6s fade-in effect

### Styling Conventions

- Component styles use SCSS (configured in `angular.json`)
- Primarily uses Tailwind utility classes in templates
- Inline styles are acceptable for one-off color overrides (e.g., hex colors not in the design system)
- Cards use consistent pattern: white background, rounded corners, shadow, colored top border

## Build Configuration

- Output path: `dist/hirably/browser`
- Component style format: SCSS
- Production build includes optimization, minification, and output hashing
- Budget limits:
  - Initial bundle: 2MB warning, 5MB error
  - Component styles: 6KB warning, 10KB error

## Important Notes

- The app uses Angular 17 with TypeScript 5.2
- No testing framework is currently configured
- Analytics are disabled in Angular CLI
- The chatbot component is globally available (rendered in `AppComponent`)
