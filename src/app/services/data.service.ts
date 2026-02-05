// ====================================
// DATA SERVICE - Angular Service
// Consolidated from multiple sources
// ====================================

import { Injectable } from '@angular/core';
import {
  Role,
  Benefit,
  Service,
  PricingPlan,
  Step
} from '@models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // ====================================
  // ROLES DATA
  // ====================================

  private rolesData: Role[] = [
    {
      id: 'operations',
      title: 'Operations & Admin',
      image: 'assets/img/jobs/operations.jpg',
      icon: '📊',
      roles: ['Virtual Assistants', 'Project Managers', 'HR Specialists', 'Supply Chain Coordinators'],
      color: 'from-icy-blue to-periwinkle'
    },
    {
      id: 'support',
      title: 'Customer Support & Sales',
      image: 'assets/img/jobs/customer-support.jpg',
      icon: '💬',
      roles: ['Bilingual CSRs', 'SDRs', 'BDRs', 'Account Managers', 'Billing Specialists'],
      color: 'from-periwinkle to-bright-amber'
    },
    {
      id: 'finance',
      title: 'Finance & Accounting',
      image: 'assets/img/jobs/finance.jpg',
      icon: '💼',
      roles: ['Accountants', 'Bookkeepers', 'FP&A Analysts', 'Payroll Specialists', 'Controllers'],
      color: 'from-bright-amber to-icy-blue'
    },
    {
      id: 'tech',
      title: 'Technology & Engineering',
      image: 'assets/img/jobs/engineering.jpg',
      icon: '💻',
      roles: ['Full-Stack Developers', 'QA Engineers', 'DevOps', 'UI/UX Designers', 'Data Analysts'],
      color: 'from-icy-blue to-periwinkle'
    },
    {
      id: 'marketing',
      title: 'Marketing & Creative',
      image: 'assets/img/jobs/marketing.jpg',
      icon: '🎨',
      roles: ['Digital Marketers', 'Content Writers', 'Graphic Designers', 'SEO Specialists', 'Social Media Managers'],
      color: 'from-periwinkle to-icy-blue'
    }
  ];

  // ====================================
  // BENEFITS DATA (Why Mexico)
  // ====================================

  private benefitsData: Benefit[] = [
    {
      icon: 'clock',
      title: 'Same Time Zones',
      description: 'Real-time collaboration with CST/MST/PST alignment. Instant communication without the delays of offshore teams.'
    },
    {
      icon: 'chart-down',
      title: '60% Cost Savings',
      description: 'Competitive local salaries mean lower operational costs and higher profit margins without sacrificing quality.'
    },
    {
      icon: 'badge',
      title: 'Skilled Workforce',
      description: '130K+ annual STEM graduates with English proficiency and understanding of US work culture.'
    },
    {
      icon: 'handshake',
      title: 'Cultural Alignment',
      description: 'North American business practices, similar work ethics, and smooth team integration from day one.'
    }
  ];

  // ====================================
  // ADVANTAGE DATA (Hirably Advantage)
  // ====================================

  private advantageData: Benefit[] = [
    {
      icon: 'shield-check',
      title: 'Hiring Made Risk-Free',
      description: 'Start hiring with confidence and zero pressure. No commitments, no upfront fees and your lifetime replacement guarantee is always included.',
      items: ['No upfront costs', 'Pay only when you hire', 'Lifetime replacement included']
    },
    {
      icon: 'bolt',
      title: 'Hiring at Lightning Speed',
      description: 'Meet pre-vetted candidates in days and get your new team member started almost immediately.',
      items: ['Candidates in 5 days', 'Average time to hire under 21 days', 'Onboarding completed in 3 days']
    },
    {
      icon: 'user-group',
      title: 'Support That Actually Feels Supportive',
      description: 'Your dedicated account manager learns your style and helps you every step of the way.',
      items: ['Dedicated account manager', 'End-to-end support', 'A process shaped around your needs']
    },
    {
      icon: 'star',
      title: 'Top Talent, Ready to Go',
      description: 'Mexico\'s strongest bilingual professionals, aligned with U.S. and Canadian workflows.',
      items: ['Millions of bilingual professionals', 'Culturally aligned talent', 'Experience with North American companies']
    },
    {
      icon: 'chart-bar',
      title: 'Pricing That Makes Sense',
      description: 'You always know exactly what you\'re paying for with full visibility inside your platform.',
      items: ['Clear cost breakdown', 'No hidden fees', 'Everything visible in your dashboard']
    }
  ];

  // ====================================
  // SERVICES DATA
  // ====================================

  private servicesData: Service[] = [
    {
      title: 'Recruitment Without Upfront Fees',
      description: 'We pre-vet, interview, and screen top Mexican talent so you only meet qualified candidates. You Pick & Choose.',
      icon: 'search-document'
    },
    {
      title: 'Full Compliance & Payroll Management',
      description: 'Contracts, taxes, and benefits are handled locally to keep you protected and your employees satisfied.',
      icon: 'document-check'
    },
    {
      title: 'Onboarding & HR Support',
      description: 'From equipment to payroll and day-to-day HR, we make sure your team is set up for success from day one.',
      icon: 'users-gear'
    }
  ];

  private pricingPlansData: PricingPlan[] = [
    {
      name: 'Starter',
      price: 'Contact Us',
      features: [
        '1-5 employees',
        'Starter benefits',
        'Full recruitment',
        'Payroll & compliance',
        'HR support',
        'Employee portal access',
        'Lifetime guarantee'
      ],
      cta: 'Get Started',
      recommended: false
    },
    {
      name: 'Growth',
      price: 'Contact Us',
      features: [
        '6-20 employees',
        'Starter benefits',
        'Dedicated account manager',
        'Priority support',
        'Advanced reporting',
        'Team management tools',
        'Lifetime guarantee'
      ],
      cta: 'Get Started',
      recommended: true
    },
    {
      name: 'Scale',
      price: 'Contact Us',
      features: [
        '20+ employees',
        'Starter benefits',
        'Dedicated account manager',
        'Priority support',
        'Custom solutions',
        'Quarterly business reviews',
        'Lifetime guarantee'
      ],
      cta: 'Contact Sales',
      recommended: false
    }
  ];

  // ====================================
  // THE HIRABLY WAY - 3 Steps (Figma Design)
  // ====================================

  private howItWorksStepsData: Step[] = [
    {
      number: 1,
      category: 'Step 01',
      title: 'We Scout & Screen',
      description: 'We take your requirements and go to market. We recruit and prescreen heavily, filtering through hundreds of candidates to surface the perfect few.',
      color: '#c2e7ff', // Light Sky Blue
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      items: []
    },
    {
      number: 2,
      category: 'Step 02',
      title: 'You Interview & Select',
      description: 'Skip the scheduling mess. We manage the calendars so you can focus on the candidates. Meet your top picks and choose your new team member.',
      color: '#d1f9e5', // Mint Green
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      items: []
    },
    {
      number: 3,
      category: 'Step 03',
      title: 'We Onboard Instantly',
      description: 'Once you say "Yes," we handle the rest. We generate compliant contracts, handle payroll setup, and get your new hire working within days.',
      color: '#e3e1ff', // Lavender
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      items: []
    }
  ];

  constructor() { }

  // ====================================
  // GETTER METHODS
  // ====================================

  getRoles(): Role[] {
    return this.rolesData;
  }

  getBenefits(): Benefit[] {
    return this.benefitsData;
  }

  getAdvantages(): Benefit[] {
    return this.advantageData;
  }

  // ====================================
  // LEGACY/HELPER METHODS
  // ====================================

  getRotatingWords(): string[] {
    return ['Recruitment', 'Payroll', 'Compliance', 'HR'];
  }

  getHeroHeadline(): string {
    return 'For U.S. & Canadian Companies Hiring in Mexico';
  }

  getHeroDescription(): string {
    return 'Hirably is a dedicated partner for U.S. and Canadian companies hiring in Mexico. We bring together recruitment, payroll, compliance, and HR into one streamlined solution, powered by our all-in-one platform. The result: you can expand confidently, save on costs, and scale your team without added risk or overhead.';
  }

  getServices(): Service[] {
    return this.servicesData;
  }

  getPricingPlans(): PricingPlan[] {
    return this.pricingPlansData;
  }

  getHowItWorksSteps(): Step[] {
    return this.howItWorksStepsData;
  }
}
