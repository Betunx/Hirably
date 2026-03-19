import { Injectable } from '@angular/core';
import { Benefit, Service, PricingPlan, Step, RoleCategory, DepartmentDetail } from '@models';

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
      name: 'Hirably Recruitment',
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
      name: 'Hirably EOR',
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

  // ── Department pages ──────────────────────────────────────────────────────

  private departmentsData: { [key: string]: DepartmentDetail } = {
    technology: {
      id: 'technology',
      title: 'Technology & Engineering',
      heroTitle: 'Your next senior engineer is already in Mexico',
      heroSubtitle: 'Pre-vetted engineers who ship production code from day one.\nSame timezone as your team, up to 60% savings, zero compliance headaches.',
      heroImage: 'assets/img/developer.jpg',
      roles: ['Full-Stack Developers', 'QA Engineers', 'DevOps Engineers', 'UI/UX Designers', 'Data Analysts', 'Mobile Developers', 'Frontend Developers', 'Backend Developers'],
      rolesSubtitle: "Not just recruiters — specialists who've placed hundreds of technology professionals.",
      whyTitle: 'Why hire tech talent in Mexico?',
      whyText: "Mexico graduates over 130,000 engineers every year — and cities like Guadalajara, Monterrey, and CDMX have become serious tech hubs where developers work with the same stacks, agile workflows, and tools your team already uses. This isn't offshoring. It's adding a teammate in your timezone.",
      whyPoints: [
        '130,000+ engineering graduates per year',
        'Guadalajara, Monterrey & CDMX tech hubs',
        'Same timezone as US teams (CST, MST, PST)',
        'Modern stacks: React, Node, AWS, Python, and more',
        'Experienced in agile/scrum workflows and US team culture'
      ],
      salaryComparisons: [
        { role: 'Full-Stack Developer', usSalary: 125000, mxSalary: 45000 },
        { role: 'QA Engineer',          usSalary: 95000,  mxSalary: 32000 },
        { role: 'DevOps Engineer',      usSalary: 135000, mxSalary: 50000 },
        { role: 'UI/UX Designer',       usSalary: 105000, mxSalary: 38000 }
      ],
      tools: ['React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Figma'],
      faqs: [
        {
          question: 'What tech stacks do your developers know?',
          answer: 'Our talent pool covers React, Angular, Vue, Node.js, Python, Java, .NET, AWS, GCP, and more. We match the specific stack your team uses.'
        },
        {
          question: 'Can developers work in US timezones?',
          answer: 'Yes. Mexico shares timezones with the US (CST, MST, PST), so your developers work the same hours as your local team — no scheduling friction.'
        },
        {
          question: 'What does the vetting process look like?',
          answer: 'Every candidate completes a live coding challenge, a technical deep-dive interview, English proficiency assessment, cultural fit evaluation, and reference verification. Only the top 5% make it to your inbox.'
        }
      ],
      ctaTitle: 'Stop searching. Start building.',
      ctaBody: 'Hirably handles recruitment, compliance, payroll, and HR — so you can focus on shipping.',
      ctaButtonText: 'Start Hiring Today'
    },

    finance: {
      id: 'finance',
      title: 'Finance & Accounting',
      heroTitle: 'Accurate books, half the cost',
      heroSubtitle: 'Bilingual accountants and analysts trained in US GAAP, fluent in your tools, and ready to join your team in under 14 days — at up to 64% less than a US hire.',
      heroImage: 'assets/img/finance.jpg',
      roles: ['Accountants', 'Bookkeepers', 'FP&A Analysts', 'Payroll Specialists', 'Controllers', 'Tax Specialists', 'CFO Support'],
      rolesSubtitle: "Not just recruiters — specialists who've placed hundreds of finance professionals.",
      whyTitle: 'Why hire finance talent in Mexico?',
      whyText: "Mexico produces thousands of bilingual finance professionals trained to US GAAP and IFRS standards every year. From bookkeepers to controllers, our candidates bring precision, compliance knowledge, and real-world experience — at a fraction of the US cost. From QuickBooks bookkeeping to FP&A modeling in NetSuite, our candidates don't need ramp-up time — they've already done this work for US-based companies.",
      whyPoints: [
        'US GAAP & IFRS-trained professionals',
        'Bilingual English-Spanish fluency',
        'Same timezone as US teams (CST, MST, PST)',
        'Deep experience with US payroll, tax, and compliance'
      ],
      salaryComparisons: [
        { role: 'Controller',         usSalary: 130000, mxSalary: 48000 },
        { role: 'FP&A Analyst',       usSalary: 95000,  mxSalary: 35000 },
        { role: 'Staff Accountant',   usSalary: 75000,  mxSalary: 27000 },
        { role: 'Payroll Specialist', usSalary: 65000,  mxSalary: 23000 }
      ],
      tools: ['QuickBooks', 'Xero', 'NetSuite', 'SAP', 'Excel', 'Sage', 'Bill.com', 'Gusto', 'ADP', 'Avalara', 'Expensify'],
      faqs: [
        {
          question: 'Are your finance candidates familiar with US accounting standards?',
          answer: 'Yes. Our vetted candidates are trained in US GAAP and have experience with US-based clients, software, and compliance requirements.'
        },
        {
          question: 'Can they handle US payroll and tax filings?',
          answer: 'Absolutely. Many of our finance professionals have direct experience with US payroll platforms like Gusto, ADP, and Rippling, as well as state and federal tax filing processes.'
        },
        {
          question: 'What does the vetting process look like?',
          answer: 'Every candidate goes through technical assessments specific to their finance role, English proficiency checks, and reference verification before being presented to you.'
        }
      ],
      ctaTitle: 'Your next accountant is one call away.',
      ctaBody: 'Hirably handles recruitment, compliance, payroll, and HR — so you can focus on growing.',
      ctaButtonText: 'Start Hiring Today'
    },

    sales: {
      id: 'sales',
      title: 'Sales & Customer Support',
      heroTitle: 'Fill your pipeline without draining your budget',
      heroSubtitle: "Hungry, bilingual SDRs and support reps who prospect, qualify, and close — working your hours, speaking your customers' language, at a fraction of US cost.",
      heroImage: 'assets/img/sales-suport.jpg',
      roles: ['Bilingual CSRs', 'SDRs', 'BDRs', 'Account Managers', 'Billing Specialists', 'Sales Coordinators', 'Customer Success'],
      rolesSubtitle: "Not just recruiters — specialists who've placed hundreds of sales professionals.",
      whyTitle: 'Why hire sales & support talent in Mexico?',
      whyText: "Mexican sales and support professionals are known for their bilingual fluency, strong communication skills, and North American business culture alignment. They operate in the same timezone as your customers — delivering real-time support without the offshore lag. For companies serving the US Hispanic market — a $3.4 trillion spending power — having native Spanish speakers on your sales team isn't a nice-to-have, it's a competitive advantage.",
      whyPoints: [
        'Native-level English and Spanish fluency',
        'North American business culture and communication style',
        'Same timezone for real-time customer interactions',
        'Proven experience with US CRM and support tools',
        'Access the $3.4T US Hispanic market with native speakers'
      ],
      salaryComparisons: [
        { role: 'Account Manager',    usSalary: 85000, mxSalary: 30000 },
        { role: 'SDR',                usSalary: 65000, mxSalary: 22000 },
        { role: 'Customer Success',   usSalary: 90000, mxSalary: 32000 },
        { role: 'Billing Specialist', usSalary: 55000, mxSalary: 19000 }
      ],
      tools: ['Salesforce', 'HubSpot', 'Zendesk', 'Intercom', 'Freshdesk', 'Gong', 'Outreach', 'Slack', 'Zoom', 'Monday.com'],
      faqs: [
        {
          question: 'How strong is their English?',
          answer: 'All candidates pass a bilingual proficiency assessment. Most operate at a C1–C2 level, meaning they can handle complex customer conversations, negotiations, and written communication with ease.'
        },
        {
          question: 'Can they work US business hours?',
          answer: "Yes. Mexico shares timezones with the US (CST, MST, PST), so your sales and support reps are available during your customers' peak hours — no overnight shifts required."
        },
        {
          question: 'What CRM tools do they know?',
          answer: 'Our candidates are experienced with Salesforce, HubSpot, Zendesk, Intercom, and Freshdesk. We match candidates to the specific stack your team uses.'
        }
      ],
      ctaTitle: 'More reps. More pipeline. Less overhead.',
      ctaBody: 'Hirably handles recruitment, compliance, payroll, and HR — so you can focus on closing.',
      ctaButtonText: 'Start Hiring Today'
    },

    marketing: {
      id: 'marketing',
      title: 'Marketing',
      heroTitle: 'Creative firepower your budget can actually handle',
      heroSubtitle: 'Content creators, paid media specialists, and designers who understand US audiences — and deliver at 60% less than hiring locally.',
      heroImage: 'assets/img/marketing.jpg',
      roles: ['Digital Marketers', 'Content Writers', 'Graphic Designers', 'SEO Specialists', 'Social Media Managers', 'Email Marketers', 'Paid Media Buyers'],
      rolesSubtitle: "Not just recruiters — specialists who've placed hundreds of marketing professionals.",
      whyTitle: 'Why hire marketing talent in Mexico?',
      whyText: "Mexico's creative economy is booming — with world-class design schools, thriving digital agencies, and marketers who've run campaigns for US brands across every channel. Your brand voice stays consistent because our talent thinks bilingually and understands North American consumer behavior natively.",
      whyPoints: [
        'Bilingual content creation for US and LATAM markets',
        'Portfolio-vetted designers and creatives — no guesswork',
        'Same timezone for real-time campaign collaboration',
        'Deep knowledge of US platforms and consumer behavior'
      ],
      salaryComparisons: [
        { role: 'Digital Marketer',      usSalary: 80000, mxSalary: 28000 },
        { role: 'SEO Specialist',        usSalary: 75000, mxSalary: 26000 },
        { role: 'Graphic Designer',      usSalary: 70000, mxSalary: 24000 },
        { role: 'Social Media Manager',  usSalary: 65000, mxSalary: 22000 }
      ],
      tools: ['HubSpot', 'Mailchimp', 'Google Ads', 'Meta Ads', 'Figma', 'Adobe Creative Suite', 'Canva', 'SEMrush', 'Ahrefs', 'Hootsuite', 'Webflow'],
      faqs: [
        {
          question: 'Can they create content in English?',
          answer: 'Yes. Our marketing candidates are bilingual and produce high-quality English content — from blog posts and email campaigns to ad copy and social media — that resonates with US audiences.'
        },
        {
          question: 'Do they have experience with US ad platforms?',
          answer: 'Our candidates have hands-on experience running campaigns on Google Ads, Meta, LinkedIn, and TikTok, including US market targeting, pixel setup, and performance optimization.'
        },
        {
          question: 'What does the vetting process look like?',
          answer: 'Every marketing candidate submits a portfolio, completes a practical skills assessment, and passes an English proficiency check before being presented to you.'
        }
      ],
      ctaTitle: "Great campaigns need great people. Let's find yours.",
      ctaBody: 'Hirably handles recruitment, compliance, payroll, and HR — so you can focus on growing your brand.',
      ctaButtonText: 'Start Hiring Today'
    },

    operations: {
      id: 'operations',
      title: 'Operations',
      heroTitle: 'The team behind your team',
      heroSubtitle: 'From executive assistants to project managers — ops professionals who bring structure to your chaos, on your timezone, at a fraction of US cost.',
      heroImage: 'assets/img/operations.jpg',
      roles: ['Virtual Assistants', 'Project Managers', 'HR Specialists', 'Supply Chain Coordinators', 'Data Analysts', 'Executive Assistants', 'Operations Managers'],
      rolesSubtitle: "Not just recruiters — specialists who've placed hundreds of operations professionals.",
      whyTitle: 'Why hire operations talent in Mexico?',
      whyText: "Operations talent from Mexico brings the organizational discipline, bilingual communication, and nearshore availability that US companies need to run efficiently. Whether you need a detail-oriented VA or a seasoned project manager, Mexico delivers at a cost that makes sense. A senior Executive Assistant in Mexico can free up 20+ hours per week for your leadership team. That's not a cost — it's an ROI multiplier.",
      whyPoints: [
        'Bilingual coordination across US and LATAM teams',
        'Strong project management and organizational skills',
        'Same timezone for real-time decision-making',
        'Trained in Asana, Jira, Notion, Monday, and your existing stack'
      ],
      salaryComparisons: [
        { role: 'Project Manager',           usSalary: 95000, mxSalary: 34000 },
        { role: 'HR Specialist',             usSalary: 75000, mxSalary: 26000 },
        { role: 'Supply Chain Coordinator',  usSalary: 80000, mxSalary: 28000 },
        { role: 'Virtual Assistant',         usSalary: 55000, mxSalary: 18000 }
      ],
      tools: ['Asana', 'Monday.com', 'Notion', 'Jira', 'Trello', 'Slack', 'Google Workspace', 'Excel', 'Tableau', 'Power BI', 'SAP', 'Workday'],
      faqs: [
        {
          question: 'Can a virtual assistant handle executive-level tasks?',
          answer: 'Yes. Our VAs are experienced in calendar management, travel coordination, research, reporting, and cross-functional communication — many have supported C-suite executives at US companies.'
        },
        {
          question: 'Do project managers follow US methodologies?',
          answer: 'Our project managers are experienced in Agile, Scrum, and Waterfall methodologies, and hold certifications such as PMP and Scrum Master. They integrate seamlessly with US-based teams.'
        },
        {
          question: 'What does the vetting process look like?',
          answer: 'Every operations candidate is assessed on role-specific skills, English proficiency, and cultural fit. References are verified and background checks completed before any introduction.'
        }
      ],
      ctaTitle: 'Less chaos. More leverage. Let\'s talk.',
      ctaBody: 'Hirably handles recruitment, compliance, payroll, and HR — so you can focus on scaling.',
      ctaButtonText: 'Start Hiring Today'
    }
  };

  getDepartment(id: string): DepartmentDetail | undefined {
    return this.departmentsData[id];
  }

  getDepartmentIds(): string[] {
    return Object.keys(this.departmentsData);
  }
}
