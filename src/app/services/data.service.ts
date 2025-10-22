// ====================================
// DATA SERVICE - Angular Service
// Consolidated from multiple sources
// ====================================

import { Injectable } from '@angular/core';
import {
  Person,
  Role,
  Testimonial,
  Stat,
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
  // PEOPLE DATA
  // ====================================

  private peopleData: { [key: string]: Person } = {
    mariaPerez: {
      id: 'maria-perez',
      name: 'Maria Perez',
      photo: '/assets/images/people/maria-perez.jpg',
      role: 'Marketing & Creative',
      country: '🇲🇽 Mexico',
      location: 'Hermosillo, Mexico',
      description: 'Result-driven Marketing Specialist with 5+ years creating digital strategies for US startups.',
      skills: ['SEO & Content Strategy', 'Email Marketing', 'Marketing Automation'],
      certifications: ['HubSpot Certified', 'Google Analytics Expert'],
      rating: 4.9
    },
    juanContreras: {
      id: 'juan-contreras',
      name: 'Juan Contreras',
      photo: '/assets/images/people/juan-contreras.jpg',
      role: 'Engineering',
      country: '🇲🇽 Mexico',
      location: 'Monterrey, Mexico',
      description: 'Full-stack developer specialized in React and Node.js with experience building scalable applications.',
      skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
      certifications: ['AWS Certified', 'React Expert'],
      rating: 5.0
    },
    blondeWoman: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      photo: '/assets/images/people/blonde-woman.jpg',
      role: 'Operations & Admin',
      country: '🇲🇽 Mexico',
      location: 'Mexico City, Mexico',
      description: 'Operations specialist with proven track record in process optimization and team coordination.',
      skills: ['Project Management', 'Process Optimization', 'Team Leadership'],
      certifications: ['PMP Certified', 'Six Sigma'],
      rating: 4.8
    },
    tabletWoman: {
      id: 'ana-rodriguez',
      name: 'Ana Rodriguez',
      photo: '/assets/images/people/tablet-woman.jpg',
      role: 'Customer Support & Sales',
      country: '🇲🇽 Mexico',
      location: 'Guadalajara, Mexico',
      description: 'Bilingual customer success specialist with expertise in SaaS support and client relationships.',
      skills: ['Customer Success', 'Salesforce', 'Bilingual Support'],
      certifications: ['Salesforce Certified', 'Customer Success'],
      rating: 4.9
    },
    blueShirtMan: {
      id: 'diego-martinez',
      name: 'Diego Martinez',
      photo: '/assets/images/people/blue-shirt-man.jpg',
      role: 'Finance & Accounting',
      country: '🇲🇽 Mexico',
      location: 'Querétaro, Mexico',
      description: 'CPA with 7+ years experience in financial analysis and reporting for international companies.',
      skills: ['Financial Analysis', 'QuickBooks', 'Tax Compliance'],
      certifications: ['CPA', 'QuickBooks Expert'],
      rating: 5.0
    },
    carlosRamirez: {
      id: 'carlos-ramirez',
      name: 'Carlos Ramirez',
      photo: '/assets/images/people/carlos-ramirez.jpg',
      role: 'Accounting',
      country: '🇲🇽 Mexico',
      location: 'Tijuana, Mexico',
      description: 'Detail-oriented accountant specializing in payroll and compliance for US-based companies.',
      skills: ['Payroll Management', 'Tax Compliance', 'Financial Reporting'],
      certifications: ['Certified Accountant', 'Payroll Specialist'],
      rating: 4.9
    }
  };

  // ====================================
  // ROLES DATA
  // ====================================

  private rolesData: Role[] = [
    {
      id: 'operations',
      title: 'Operations & Admin',
      image: '/assets/images/people/blonde-woman.jpg',
      personId: 'blondeWoman',
      icon: '📊',
      roles: ['Virtual Assistants', 'Project Managers', 'HR Specialists', 'Supply Chain Coordinators'],
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'support',
      title: 'Customer Support & Sales',
      image: '/assets/images/people/tablet-woman.jpg',
      personId: 'tabletWoman',
      icon: '💬',
      roles: ['Bilingual CSRs', 'SDRs', 'BDRs', 'Account Managers', 'Billing Specialists'],
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'finance',
      title: 'Finance & Accounting',
      image: '/assets/images/people/blue-shirt-man.jpg',
      personId: 'blueShirtMan',
      icon: '💼',
      roles: ['Accountants', 'Bookkeepers', 'FP&A Analysts', 'Payroll Specialists', 'Controllers'],
      color: 'from-indigo-600 to-indigo-800'
    },
    {
      id: 'tech',
      title: 'Technology & Engineering',
      image: '/assets/images/people/juan-contreras.jpg',
      personId: 'juanContreras',
      icon: '💻',
      roles: ['Full-Stack Developers', 'QA Engineers', 'DevOps', 'UI/UX Designers', 'Data Analysts'],
      color: 'from-blue-700 to-blue-900'
    },
    {
      id: 'marketing',
      title: 'Marketing & Creative',
      image: '/assets/images/people/maria-perez.jpg',
      personId: 'mariaPerez',
      icon: '🎨',
      roles: ['Digital Marketers', 'Content Writers', 'Graphic Designers', 'SEO Specialists', 'Social Media Managers'],
      color: 'from-blue-600 to-purple-700'
    }
  ];

  // ====================================
  // TESTIMONIALS DATA
  // ====================================

  private testimonialsData: Testimonial[] = [
    {
      id: 1,
      name: 'Diego Parra',
      role: 'Manager',
      company: 'TechCorp Inc.',
      industry: 'SaaS',
      photo: '/assets/images/testimonials/diego-parra.jpg',
      rating: 5,
      text: 'Hirably helped me secure top talent for our US-based team in record time. Everything from sourcing to compliance was handled efficiently. The quality of candidates exceeded our expectations, and the onboarding process was seamless.',
      linkedin: 'https://linkedin.com/in/diegoparra'
    },
    {
      id: 2,
      name: 'Laura Martinez',
      role: 'HR Director',
      company: 'Growth Solutions',
      industry: 'E-commerce',
      photo: '/assets/images/testimonials/laura-martinez.jpg',
      rating: 5,
      text: 'We needed to scale our customer support team quickly, and Hirably delivered. Within a week, we had three excellent bilingual representatives onboarded and trained. The cost savings have been incredible – we\'re paying 60% less than US-based equivalents.',
      linkedin: 'https://linkedin.com/in/lauramartinez'
    },
    {
      id: 3,
      name: 'Carlos Ramirez',
      role: 'Accountant',
      company: 'Finance Plus',
      industry: 'Financial Services',
      photo: '/assets/images/people/carlos-ramirez.jpg',
      rating: 5,
      text: 'Hirably helped me land a finance position in Canada. They handled all contracts and compliance, making it easy to start my new role confidently. The support team was always available to answer questions and guide me through the process.',
      linkedin: 'https://linkedin.com/in/carlosramirez'
    },
    {
      id: 4,
      name: 'Maria Lopez',
      role: 'Digital Marketing Specialist',
      company: 'Marketing Hub',
      industry: 'Marketing Agency',
      photo: '/assets/images/testimonials/maria-lopez.jpg',
      rating: 5,
      text: 'Thanks to Hirably, I landed my dream US marketing role in just two weeks. They guided me through each step and prepared me for success from day one. The team truly cares about finding the right fit for both parties.',
      linkedin: 'https://linkedin.com/in/marialopez'
    },
    {
      id: 5,
      name: 'Ana Torres',
      role: 'Front-End Developer',
      company: 'DevStart',
      industry: 'Technology',
      photo: '/assets/images/testimonials/ana-torres.jpg',
      rating: 5,
      text: 'I joined a tech company in the US through Hirably. Their pre-vetting and guidance made the entire hiring process simple and stress-free. Now I\'m working on exciting projects with an amazing team, all from Mexico.',
      linkedin: 'https://linkedin.com/in/anatorres'
    },
    {
      id: 6,
      name: 'Juan Sanchez',
      role: 'Customer Service Representative',
      company: 'Support Pro',
      industry: 'Customer Support',
      photo: '/assets/images/testimonials/juan-sanchez.jpg',
      rating: 5,
      text: 'The onboarding support from Hirably was exceptional. They made the transition smooth and I was able to start contributing to my new team immediately. Highly recommend their services!',
      linkedin: 'https://linkedin.com/in/juansanchez'
    }
  ];

  // ====================================
  // STATS DATA
  // ====================================

  private statsData: Stat[] = [
    { number: '200+', label: 'Employees Placed', icon: '👥' },
    { number: '50+', label: 'Companies Served', icon: '🏢' },
    { number: '60%', label: 'Cost Savings', icon: '💰' },
    { number: '97%', label: 'Success Rate', icon: '⭐' },
    { number: '7', label: 'Days to Hire', icon: '⚡' }
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
      title: 'Share Your Role',
      description: 'Upload your job description or fill a quick form.',
      image: '/assets/images/legacy/Step-1.webp'
    },
    {
      number: 2,
      title: 'Get Instant Estimates',
      description: 'See hourly cost ranges in minutes.',
      image: '/assets/images/legacy/Step-2.webp'
    },
    {
      number: 3,
      title: 'Access Pre-Vetted Candidates',
      description: 'Profiles of top talent ready for interviews in 3 days.',
      image: '/assets/images/legacy/Step-3.webp'
    },
    {
      number: 4,
      title: 'Interview & Decide',
      description: 'You choose who to hire.',
      image: '/assets/images/legacy/Step-4.webp'
    },
    {
      number: 5,
      title: 'We Handle Everything Else',
      description: 'Payroll, compliance, HR, benefits + lifetime guarantee.',
      image: '/assets/images/legacy/Step-5.webp'
    }
  ];

  constructor() { }

  // ====================================
  // GETTER METHODS
  // ====================================

  getPerson(personId: string): Person | undefined {
    return this.peopleData[personId];
  }

  getAllPeople(): Person[] {
    return Object.values(this.peopleData);
  }

  getRoles(): Role[] {
    return this.rolesData;
  }

  getTestimonials(): Testimonial[] {
    return this.testimonialsData;
  }

  getStats(): Stat[] {
    return this.statsData;
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
