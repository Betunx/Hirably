export interface RoleCategory {
  id: string;
  title: string;
  roles: string[];
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  items?: string[];
}

export interface Service {
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  priceUnit?: string;
  badge?: string;
  subtitle?: string;
  tagline?: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  category?: string;
  color?: string;
  icon?: string;
  image?: string;
}
