export interface RoleCategory {
  id: string;
  title: string;
  roles: string[];
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
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
  pricePrefix?: string;
  badge?: string;
  subtitle?: string;
  tagline?: string;
  priceNote?: string;
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
}

export interface SalaryComparison {
  role: string;
  usSalary: number;
  mxSalary: number;
}

export interface DeptFAQ {
  question: string;
  answer: string;
}

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  location?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

/** Payload sent from the apply form to /api/applications (CV already on Blob). */
export interface JobApplication {
  vacancyId: string;
  vacancyTitle: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  cvUrl: string;
  /** Honeypot — must stay empty; bots tend to fill it. */
  company?: string;
}

export interface DepartmentDetail {
  id: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  roles: string[];
  rolesSubtitle: string;
  whyTitle: string;
  whyText: string;
  whyPoints: string[];
  salaryComparisons: SalaryComparison[];
  tools: string[];
  faqs: DeptFAQ[];
  ctaTitle: string;
  ctaBody: string;
  ctaButtonText: string;
}
