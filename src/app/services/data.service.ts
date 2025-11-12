// ====================================
// DATA SERVICE - Angular Service
// Consolidated from multiple sources
// ====================================

import { Injectable } from '@angular/core';
import {
  Role,
  TimelineStep,
  Benefit,
  Feature,
  Service,
  PricingPlan,
  Step
} from '../models';

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
      image: '',
      icon: '📊',
      roles: ['Virtual Assistants', 'Project Managers', 'HR Specialists', 'Supply Chain Coordinators'],
      color: 'from-muted-blue to-pastel-purple'
    },
    {
      id: 'support',
      title: 'Customer Support & Sales',
      image: '',
      icon: '💬',
      roles: ['Bilingual CSRs', 'SDRs', 'BDRs', 'Account Managers', 'Billing Specialists'],
      color: 'from-pastel-purple to-pastel-yellow'
    },
    {
      id: 'finance',
      title: 'Finance & Accounting',
      image: '',
      icon: '💼',
      roles: ['Accountants', 'Bookkeepers', 'FP&A Analysts', 'Payroll Specialists', 'Controllers'],
      color: 'from-pastel-yellow to-pastel-green-soft'
    },
    {
      id: 'tech',
      title: 'Technology & Engineering',
      image: '',
      icon: '💻',
      roles: ['Full-Stack Developers', 'QA Engineers', 'DevOps', 'UI/UX Designers', 'Data Analysts'],
      color: 'from-muted-blue to-pastel-green-soft'
    },
    {
      id: 'marketing',
      title: 'Marketing & Creative',
      image: '',
      icon: '🎨',
      roles: ['Digital Marketers', 'Content Writers', 'Graphic Designers', 'SEO Specialists', 'Social Media Managers'],
      color: 'from-pastel-purple to-muted-blue'
    }
  ];

  // ====================================
  // TIMELINE DATA
  // ====================================

  private timelineData: TimelineStep[] = [
    {
      day: 'Day 1-2',
      title: 'Discovery & Planning',
      items: [
        { icon: '📞', text: 'Free consultation call' },
        { icon: '📋', text: 'Define role requirements' },
        { icon: '💵', text: 'Get instant cost estimate' },
        { icon: '🎯', text: 'Align on hiring strategy' }
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      day: 'Day 3-5',
      title: 'Candidate Sourcing',
      items: [
        { icon: '🔍', text: 'We search our 45K+ talent pool' },
        { icon: '✅', text: 'Pre-vet and screen candidates' },
        { icon: '📊', text: 'Present 3-5 top matches' },
        { icon: '📄', text: 'Review profiles and resumes' }
      ],
      color: 'from-blue-600 to-blue-700'
    },
    {
      day: 'Day 5-7',
      title: 'Interview & Selection',
      items: [
        { icon: '🗣️', text: 'Interview your favorites' },
        { icon: '🤝', text: 'Make your selection' },
        { icon: '📝', text: 'We handle all paperwork' },
        { icon: '✨', text: 'Candidate accepts offer' }
      ],
      color: 'from-blue-700 to-blue-800'
    },
    {
      day: 'Day 7+',
      title: 'Onboarding & Success',
      items: [
        { icon: '🖥️', text: 'Equipment setup' },
        { icon: '📚', text: 'Onboarding support' },
        { icon: '💰', text: 'Payroll & compliance managed' },
        { icon: '🎉', text: 'Team member starts working' }
      ],
      color: 'from-blue-800 to-blue-900'
    }
  ];

  // ====================================
  // BENEFITS DATA (Why Mexico)
  // ====================================

  private benefitsData: Benefit[] = [
    {
      icon: '⏰',
      title: 'Same Time Zones',
      description: 'Real-time collaboration with CST/MST/PST alignment. Instant communication without the delays of offshore teams.'
    },
    {
      icon: '💰',
      title: '60% Cost Savings',
      description: 'Competitive local salaries mean lower operational costs and higher profit margins without sacrificing quality.'
    },
    {
      icon: '🎓',
      title: 'Skilled Workforce',
      description: '130K+ annual STEM graduates with English proficiency and understanding of US work culture.'
    },
    {
      icon: '🤝',
      title: 'Cultural Alignment',
      description: 'North American business practices, similar work ethics, and smooth team integration from day one.'
    }
  ];

  // ====================================
  // ADVANTAGE DATA (Hirably Advantage)
  // ====================================

  private advantageData: Benefit[] = [
    {
      icon: '🎯',
      title: 'Zero-Risk Hiring',
      description: 'No upfront fees, pay only when you hire, with lifetime replacement guarantee.',
      items: ['No upfront fees', 'Pay only when you hire', 'Lifetime replacement guarantee']
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'From job posting to productive team member in just 7 days average.',
      items: ['Candidates in 5 days', 'Hired in 7 days average', 'Start working immediately']
    },
    {
      icon: '💼',
      title: 'White Glove Service',
      description: 'Dedicated account manager providing end-to-end support and personal onboarding.',
      items: ['Dedicated account manager', 'End-to-end support', 'Personal onboarding']
    },
    {
      icon: '✅',
      title: 'Full Compliance',
      description: 'Complete EOR services with payroll, benefits, and 100% legal protection included.',
      items: ['EOR services included', 'Payroll & benefits handled', '100% legal protection']
    },
    {
      icon: '💎',
      title: 'Pre-Vetted Talent Pool',
      description: 'Access to 45K+ qualified, bilingual professionals who are culturally aligned and North American-trained.',
      items: ['45K+ qualified professionals', 'Bilingual & culturally aligned', 'North American-trained']
    },
    {
      icon: '📊',
      title: 'Transparent Pricing',
      description: 'Clear cost breakdown with no hidden fees. See exactly what you pay.',
      items: ['Clear cost breakdown', 'No hidden fees', 'See exactly what you pay']
    }
  ];

  // ====================================
  // LEGACY DATA (For backward compatibility)
  // ====================================

  private mainFeaturesData: Feature[] = [
    {
      id: 'savings',
      title: '60% Average payroll savings vs U.S./Canada',
      priority: 1,
      icon: 'dollar-sign'
    },
    {
      id: 'commitment',
      title: 'Month to Month, No Commitment',
      priority: 2,
      icon: 'calendar'
    },
    {
      id: 'speed',
      title: '3 Days to first pre-vetted candidates',
      priority: 3,
      icon: 'users'
    },
    {
      id: 'lifetime',
      title: 'Lifetime Replacement',
      description: "We'll replace at anytime",
      priority: 4,
      icon: 'shield-check'
    },
    {
      id: 'satisfaction',
      title: 'If not satisfied, Hirably will find a replacement',
      priority: 5,
      icon: 'check-circle'
    }
  ];

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
        'Full recruitment',
        'Payroll & compliance',
        'HR support',
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
        'Full recruitment',
        'Payroll & compliance',
        'HR support',
        'Lifetime guarantee',
        'Dedicated account manager',
        'Priority support'
      ],
      cta: 'Get Started',
      recommended: true
    },
    {
      name: 'Scale',
      price: 'Contact Us',
      features: [
        '20+ employees',
        'Full recruitment',
        'Payroll & compliance',
        'HR support',
        'Lifetime guarantee',
        'Dedicated account manager',
        'Priority support',
        'Custom solutions',
        'Quarterly business reviews'
      ],
      cta: 'Contact Sales',
      recommended: false
    }
  ];

  private howItWorksStepsData: Step[] = [
    {
      number: 1,
      category: 'Recruitment',
      title: 'Speed & Quality in 5 Days',
      description: 'We find and pre-vet top bilingual talent in under 5 days. Our deep experience in the Mexican market means you only meet candidates who are a perfect cultural and technical fit.',
      color: '#93c5fd',
      icon: 'M21 13.255A23.864 23.864 0 0112 15c-3.18 0-6.301-.563-9-1.745M16.5 7.5l-3 3-3-3m3 3V1',
      items: [
        { icon: 'discovery', text: 'Discovery Call: Tell us exactly what you need.' },
        { icon: 'shortlist', text: 'Candidate Shortlist: Receive 2-3 pre-vetted professionals.' },
        { icon: 'interviews', text: 'Interviews: We coordinate everything—you just meet the finalists.' }
      ]
    },
    {
      number: 2,
      category: 'Onboarding',
      title: 'Hassle-Free Compliance',
      description: 'Digital contracts, legal registration, and benefits setup are handled in days. Your new hire is fully registered under Hirably\'s Mexican legal entity, mitigating your risk.',
      color: '#c4b5fd',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V17a2 2 0 01-2 2z',
      items: [
        { icon: 'contracts', text: 'Contracts: Digital employment contracts signed via platform.' },
        { icon: 'compliance', text: 'Compliance: Full legal and tax registration (IMSS).' },
        { icon: 'equipment', text: 'Equipment (Optional): Hardware/software setup ready on day one.' }
      ]
    },
    {
      number: 3,
      category: 'HR & Support',
      title: 'Dedicated Employee Experience',
      description: 'We manage the entire employee lifecycle. Our dedicated, bilingual HR team is available to support both your US/Canadian managers and the employee in Mexico.',
      color: '#fde047',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2c0-.663-.134-1.296-.38-1.875M17 20h-2m2 0H9m4-12v1m0-2V6m0 4v1m0 0v-2m0 2h-1m1 0h1m-1 0v-1m0 1v1m0 0v-2m0 2h-1m1 0h1M7 9a4 4 0 018 0v7H7V9z',
      items: [
        { icon: 'hr', text: 'HR Management: Dedicated HR support to keep your team engaged.' },
        { icon: 'pto', text: 'PTO & Holidays: Automated time-off tracking with full visibility.' },
        { icon: 'portal', text: 'Employee Portal: Self-service access to payroll and HR docs.' }
      ]
    },
    {
      number: 4,
      category: 'Finance & Reporting',
      title: 'One Transparent Invoice',
      description: 'We handle all financial, tax, and compliance obligations. Pay your entire Mexican workforce via a single, consolidated USD invoice with real-time reporting on all costs and savings.',
      color: '#a7f3d0',
      icon: 'M5 3v4M3 5h4M6 17v4M4 19h4m5-16l2 2m0 0v4m0 4l2 2m-4-2H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2h-3M13 3l2 2m0 0v4m0 4l2 2m-4-2H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2h-3',
      items: [
        { icon: 'payroll', text: 'Payroll: Automated salary distribution in MXN.' },
        { icon: 'billing', text: 'Billing: Transparent, all-included USD invoice.' },
        { icon: 'reporting', text: 'Reporting: Real-time visibility into costs and savings.' }
      ]
    }
  ];

  constructor() { }

  // ====================================
  // GETTER METHODS
  // ====================================

  getRoles(): Role[] {
    return this.rolesData;
  }

  getTimeline(): TimelineStep[] {
    return this.timelineData;
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

  getMainFeatures(): Feature[] {
    return this.mainFeaturesData;
  }

  getServices(): Service[] {
    return this.servicesData;
  }

  /**
   * @deprecated Use getBenefits() instead - same data
   * Mantener por compatibilidad temporal
   */
  getWhyMexicoBenefits(): Benefit[] {
    return this.getBenefits(); // Reutilizar getBenefits() en lugar de duplicar
  }

  getPricingPlans(): PricingPlan[] {
    return this.pricingPlansData;
  }

  getHowItWorksSteps(): Step[] {
    return this.howItWorksStepsData;
  }

  getNavigationItems() {
    return [
      { text: 'Home', href: '#' },
      { text: 'What Hirably Does', href: '#whoweare' },
      { text: "Who It's For", href: '#forcompanies' },
      { text: 'Proof Of Scale', href: '#over200' }
    ];
  }

  getCTATexts() {
    return {
      primary: 'Start Hiring Today',
      secondary: 'Book Free Consultation',
      tertiary: 'See How It Works'
    };
  }
}
