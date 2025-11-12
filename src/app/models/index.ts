// ====================================
// MODELS - TypeScript Interfaces
// Consolidated from multiple sources
// ====================================

// ====================================
// ROLE INTERFACE
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
// TIMELINE INTERFACES
// ====================================

export interface TimelineStep {
  day: string;
  title: string;
  items: TimelineItem[];
  color: string;
}

export interface TimelineItem {
  icon: string;
  text: string;
}

// ====================================
// BENEFIT INTERFACE
// ====================================

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  items?: string[];
}

// ====================================
// LEGACY INTERFACES (For compatibility)
// ====================================

export interface Feature {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  priority: number;
}

export interface Service {
  title: string;
  description: string;
  icon?: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  image?: string;
  category?: string;
  color?: string;
  icon?: string;
  items?: StepItem[];
}

export interface StepItem {
  icon: string;
  text: string;
}
