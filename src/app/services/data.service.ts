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
      description: 'Forget waiting 24 hours for a reply. Your team works 9-5 on PST/CST. You collaborate on Slack/Zoom in real-time, just like in-house.'
    },
    {
      icon: 'globe',
      title: 'Culture, Not Just Language',
      description: 'It\'s not just about speaking English; it\'s about speaking "Business." LATAM professionals share North American work ethics, deadlines, and communication styles.'
    },
    {
      icon: 'dollar',
      title: 'Senior Talent, Junior Prices',
      description: 'Don\'t settle for entry-level. Hire senior professionals and leaders in Mexico for the cost of a junior US employee. 60% savings, 100% quality.'
    }
  ];

  // Why Hirably - Figma (6 cards)
  private advantageData: Benefit[] = [
    {
      icon: 'dollar-zero',
      title: '$0 Upfront',
      description: '$0 Onboarding. No recruitment fees. No setup fees. You don\'t pay a single cent until your new team member officially starts working.'
    },
    {
      icon: 'check-shield',
      title: 'Risk-Free Trial',
      description: 'If the fit isn\'t right within the first 90 days, we replace the candidate at no cost. We back our vetting with skin in the game.'
    },
    {
      icon: 'shield',
      title: 'Lifetime Protection',
      description: 'If your employee leaves for any reason\u2014at any time\u2014we recruit their replacement for free. You never pay for the same role twice.'
    },
    {
      icon: 'speed',
      title: 'Candidates in <5 days',
      description: 'Days We move at the speed of your roadmap. Receive a shortlist of qualified, pre-vetted candidates in less than a business week.'
    },
    {
      icon: 'calendar',
      title: 'Month-to-Month',
      description: 'No long-term lock-ins. Our service is strictly month-to-month, giving you the freedom to scale up or down instantly.'
    },
    {
      icon: 'flag',
      title: 'North American Standards',
      description: 'Same time zones. Same business culture. Your team integrates seamlessly into your workflow from Day 1. Not Day 90.'
    }
  ];

  // Services - Figma (Hire/Employ/Pay)
  private servicesData: Service[] = [
    {
      title: 'Hire',
      subtitle: 'Find top 1% talent',
      description: 'Deep Sourcing: We screen thousands to find the top 1%. Culture Fit: Technical skills matched with your company values. Speed: Qualified candidates in under 5 days.',
      icon: 'megaphone',
      color: '#fff1cf'
    },
    {
      title: 'Employ',
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
      name: 'Headhunting',
      price: '$2,499',
      priceUnit: ' flat fee',
      badge: 'Recruitment Only',
      subtitle: 'Hiring for Your Entity',
      tagline: 'For enterprise clients with their own Mexican Entity.',
      features: [
        'Sourcing',
        'Vetting',
        'Coordination',
        '90-day Guarantee'
      ],
      cta: 'Get a quote',
      recommended: false
    },
    {
      name: 'Staffing & EOR',
      price: 'Starting at $9/hr',
      priceUnit: ' (All-Inclusive Rate)',
      badge: 'Full-Service',
      subtitle: 'We Build Your Team',
      tagline: 'For the growth-focused client. Everything in Recruitment + EOR.',
      features: [
        'Access to Top 1% Talent Pool',
        '$0 Upfront Recruitment Fees',
        'Lifetime Replacement Guarantee',
        'Full Payroll, Benefits & HR Included',
        'Hardware Logistics & Asset Tracking'
      ],
      cta: 'Start hiring',
      recommended: true
    },
    {
      name: 'Employer of Record',
      price: '$499/month',
      priceUnit: ' per employee',
      badge: 'EOR Only',
      subtitle: 'Bring Your Own Talent',
      tagline: 'You found the talent; we make it legal. For clients who already have a candidate.',
      features: [
        'Legal Employer (Mexican Entity)',
        'Contracts & Labor Compliance',
        'Taxes',
        'Social Security & Benefits Ongoing HR Support',
        'One Simple USD Invoice'
      ],
      cta: 'Get started on EOR',
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

  getAdvantages(): Benefit[] {
    return this.advantageData;
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
