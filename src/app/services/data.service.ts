import { Injectable } from '@angular/core';
import { Benefit, Service, PricingPlan, Step, RoleCategory } from '@models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Why Nearshore - Figma
  private benefitsData: Benefit[] = [
    {
      icon: 'clock',
      title: 'No More "Async" Lag',
      description: 'Forget waiting 24 hours for a reply. Your team works 9-5 on PST/CST. You collaborate on Slack/Zoom in real-time, just like they are in the next room.'
    },
    {
      icon: 'globe',
      title: 'Culture, Not Just Language',
      description: 'It\'s not just about speaking English; it\'s about speaking "Business." LATAM professionals share North American work ethics, urgency, and communication styles.'
    },
    {
      icon: 'dollar',
      title: 'Senior Talent, Junior Prices',
      description: 'Don\'t settle for entry-level. Hire senior professionals and leaders in Mexico for the cost of a junior US employee. 60% savings, 100% quality.'
    }
  ];

  // Services - Figma (Hire/Employ/Pay)
  private servicesData: Service[] = [
    {
      title: 'Recruit',
      subtitle: 'Find top 1% talent',
      description: 'Deep Sourcing: We screen thousands to find the top 1%. Culture Fit: Technical skills matched with your company values. Speed: Qualified candidates in under 5 days.',
      icon: 'megaphone',
      color: '#fff1cf'
    },
    {
      title: 'Onboard',
      subtitle: 'Zero Legal Complexity',
      description: 'Instant EOR: We become the legal employer of record. Total Shield: Protect your company from foreign liability. Compliance: Contracts and labor laws handled instantly.',
      icon: 'document-pencil',
      color: '#e3e1ff'
    },
    {
      title: 'Pay',
      subtitle: 'One Invoice. Total Control.',
      description: 'Simple Billing: One consolidated monthly invoice in USD. Tax & Benefits: We handle all withholdings and benefits. Transparency: Full visibility into every cost.',
      icon: 'currency',
      color: '#d1fae5'
    }
  ];

  // Pricing - Figma
  private pricingPlansData: PricingPlan[] = [
    {
      badge: 'Headhunting',
      name: 'Recruitment Only',
      subtitle: 'Hiring for Your Entity',
      price: '$2,499',
      pricePrefix: 'Starting at',
      priceUnit: ' flat fee',
      priceNote: 'Starting rate — tiered based on seniority of the role.',
      tagline: 'For companies that already have a Mexican legal entity and just need the right people.',
      features: [
        'Sourcing, Screening & Background Checks',
        'Bilingual Candidate Profiles',
        'Technical & Cultural Vetting',
        'Salary Benchmarking & Market Data',
        'Simple USD Invoice',
        '90-Day Replacement Guarantee'
      ],
      cta: 'Get a Quote',
      recommended: false
    },
    {
      badge: 'Staffing + EOR',
      name: 'Hirably Complete',
      subtitle: 'We Build Your Team',
      price: '$9',
      pricePrefix: 'Starting at',
      priceUnit: '/hr all-inclusive',
      priceNote: 'Starting rate — scales with seniority. Covers salary, benefits, and our service fee.',
      tagline: 'Hiring, payroll, compliance — all handled. One rate, zero surprises.',
      features: [
        'Everything in EOR + Recruitment',
        'Vetted Talent (4% acceptance rate)',
        '$0 Upfront Recruitment Fees',
        'Lifetime Replacement Guarantee',
        'Full Payroll, Benefits & HR',
        'Hardware Logistics & Asset Tracking'
      ],
      cta: 'Start Hiring',
      recommended: true
    },
    {
      badge: 'Employer of Record',
      name: 'EOR Only',
      subtitle: 'Bring Your Own Talent',
      price: '$499',
      pricePrefix: 'Starting at',
      priceUnit: '/mo per employee',
      tagline: 'You found the talent — we make it legal.',
      features: [
        'Legal Employer (Mexican Entity)',
        'Contracts & Labor Compliance',
        'Tax Filing & Withholding',
        'Social Security & Benefits',
        'Ongoing HR Support',
        'One Simple USD Invoice'
      ],
      cta: 'Get Started',
      recommended: false
    }
  ];

  // The Hirably Way - 3 Steps
  private howItWorksStepsData: Step[] = [
    {
      number: 1,
      category: 'Step 01',
      title: 'We Scout & Screen',
      description: 'We take your requirements and go to market. We recruit and prescreen heavily, filtering out the noise so you only see the candidates worth your time.',
      color: '#c2e7ff',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
    },
    {
      number: 2,
      category: 'Step 02',
      title: 'You Interview & Select',
      description: 'Skip the scheduling mess. We manage the calendars so you can focus on the candidate. You interview the finalists, test their skills, and make the final hire.',
      color: '#d1f9e5',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      number: 3,
      category: 'Step 03',
      title: 'We Onboard Instantly',
      description: 'Once you say "Yes," we handle the rest. We generate compliant contracts, handle equipment logistics, and set up benefits instantly. Your new hire starts in days, not weeks.',
      color: '#e3e1ff',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  // Roles - Figma (5 categories with accordion)
  private roleCategoriesData: RoleCategory[] = [
    { id: 'technology', title: 'Technology', roles: ['Full-Stack Developers', 'QA Engineers', 'DevOps', 'UI/UX Designers', 'Data Analysts'] },
    { id: 'finance', title: 'Finance', roles: ['Accountants', 'Bookkeepers', 'FP&A Analysts', 'Payroll Specialists', 'Controllers'] },
    { id: 'sales', title: 'Sales & Support', roles: ['Bilingual CSRs', 'SDRs', 'BDRs', 'Account Managers', 'Billing Specialists'] },
    { id: 'marketing', title: 'Marketing', roles: ['Digital Marketers', 'Content Writers', 'Graphic Designers', 'SEO Specialists', 'Social Media Managers'] },
    { id: 'operations', title: 'Operations', roles: ['Virtual Assistants', 'Project Managers', 'HR Specialists', 'Supply Chain Coordinators', 'Data Analysts'] }
  ];

  getBenefits(): Benefit[] {
    return this.benefitsData;
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

  getRoleCategories(): RoleCategory[] {
    return this.roleCategoriesData;
  }
}
