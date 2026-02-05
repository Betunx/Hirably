// ====================================
// MODELS - TypeScript Interfaces
// Alineado con Figma Design 2024
// ====================================

// ====================================
// ROLE INTERFACE
// Para "World-Class Talent" section
// ====================================

export interface Role {
  id: string;
  title: string;
  image: string;
  icon: string;
  roles: string[];
  color: string;
}

// ====================================
// BENEFIT INTERFACE
// Para "Why Mexico" y "Why Hirably" sections
// ====================================

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  items?: string[];
}

// ====================================
// SERVICE INTERFACE
// Para "Services" section (3 servicios)
// ====================================

export interface Service {
  title: string;
  description: string;
  icon?: string;
}

// ====================================
// PRICING INTERFACE
// Para "Simple Pricing" section
// ====================================

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

// ====================================
// STEP INTERFACE
// Para "The Hirably Way" (3 pasos)
// ====================================

export interface Step {
  number: number;
  title: string;
  description: string;
  category?: string;
  color?: string;
  icon?: string;
  image?: string;
  items?: StepItem[];
}

export interface StepItem {
  icon: string;
  text: string;
}
