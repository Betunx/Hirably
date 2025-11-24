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
      color: 'from-icy-blue to-periwinkle'
    },
    {
      id: 'support',
      title: 'Customer Support & Sales',
      image: '',
      icon: '💬',
      roles: ['Bilingual CSRs', 'SDRs', 'BDRs', 'Account Managers', 'Billing Specialists'],
      color: 'from-periwinkle to-bright-amber'
    },
    {
      id: 'finance',
      title: 'Finance & Accounting',
      image: '',
      icon: '💼',
      roles: ['Accountants', 'Bookkeepers', 'FP&A Analysts', 'Payroll Specialists', 'Controllers'],
      color: 'from-bright-amber to-icy-blue'
    },
    {
      id: 'tech',
      title: 'Technology & Engineering',
      image: '',
      icon: '💻',
      roles: ['Full-Stack Developers', 'QA Engineers', 'DevOps', 'UI/UX Designers', 'Data Analysts'],
      color: 'from-icy-blue to-periwinkle'
    },
    {
      id: 'marketing',
      title: 'Marketing & Creative',
      image: '',
      icon: '🎨',
      roles: ['Digital Marketers', 'Content Writers', 'Graphic Designers', 'SEO Specialists', 'Social Media Managers'],
      color: 'from-periwinkle to-icy-blue'
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
      color: 'from-icy-blue to-periwinkle'
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
      color: 'from-periwinkle to-bright-amber'
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
      color: 'from-bright-amber to-dark-amethyst'
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
      color: 'from-dark-amethyst to-icy-blue'
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
      category: 'Discovery Call',
      title: 'Let\'s get to know each other',
      description: 'We listen to your needs, goals, and challenges. Understanding your business allows us to match you with the perfect talent while ensuring a seamless fit for your team.',
      color: '#FFCF25',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      items: []
    },
    {
      number: 2,
      category: 'Recruitment',
      title: 'We source and pre-vet candidates',
      description: 'Our team taps into Mexico\'s top talent pool and screens candidates based on your exact requirements. We handle the heavy lifting so you only meet the best matches.',
      color: '#FFCF25',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      items: []
    },
    {
      number: 3,
      category: 'Interviews',
      title: 'You meet your top candidates',
      description: 'Interview the shortlisted professionals at your convenience. We coordinate everything, from scheduling to follow-ups, so you can focus on finding the right fit.',
      color: '#FFCF25',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      items: []
    },
    {
      number: 4,
      category: 'Select',
      title: 'You choose your new team member',
      description: 'Make your selection, and we take care of the rest. From offer letters to contract signing, we ensure a smooth transition from candidate to employee.',
      color: '#FFCF25',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      items: []
    },
    {
      number: 5,
      category: 'Onboarding and Compliance',
      title: 'We handle all the legal and administrative work',
      description: 'Contracts, tax registration, benefits enrollment, and compliance documentation are all managed by us. Your new hire is fully onboarded under Hirably\'s Mexican legal entity.',
      color: '#FFCF25',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      items: []
    },
    {
      number: 6,
      category: 'HR Fully Handled',
      title: 'Ongoing support for you and your team',
      description: 'From time-off requests to performance check-ins, our bilingual HR team is here to support both your managers and employees throughout their journey.',
      color: '#FFCF25',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      items: []
    },
    {
      number: 7,
      category: 'Payroll and Reporting',
      title: 'One simple invoice, full transparency',
      description: 'Receive a single consolidated invoice in USD covering all salaries, benefits, and fees. Track costs, savings, and employee data in real time through our platform.',
      color: '#FFCF25',
      icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
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
      tertiary: 'See How Hirably Works'
    };
  }
}
