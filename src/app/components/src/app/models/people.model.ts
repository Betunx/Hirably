// ====================================
// MODELS - TypeScript Interfaces
// ====================================

export interface Person {
  id: string;
  name: string;
  photo: string;
  role: string;
  country: string;
  location: string;
  description: string;
  skills: string[];
  certifications: string[];
  rating: number;
}

export interface Role {
  id: string;
  title: string;
  image: string;
  personId: string;
  icon: string;
  roles: string[];
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  industry: string;
  photo: string;
  rating: number;
  text: string;
  linkedin: string;
}

export interface Stat {
  number: string;
  label: string;
  icon: string;
}

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

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  items?: string[];
}
