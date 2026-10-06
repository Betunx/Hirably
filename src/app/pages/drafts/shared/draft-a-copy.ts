/**
 * DESIGN DRAFT A ONLY, copy v2 (source: Hirably Complete sales deck, rules: COPY-BRIEF.md).
 * Drafts B and C keep draft-copy.ts. Change log: COPY-CHANGES-V2.md.
 */
import { DraftItem } from './draft-copy';

export const A_NAV_CTA = 'Start Hiring';

export const A_HERO_FACTS = {
  savings: 'Up to 70% less',
  savingsRest: 'than an equivalent US hire',
  rate: 'From $11/hr',
  rateRest: 'all-inclusive',
};

export const A_TRUST_LINE = 'Trusted by engineering, tax, and legal firms across the US';

/**
 * Any role (section after the trust bar). Short display names so each fits one line on desktop,
 * general to specialized. All map to calculator roles ("Customer Support Rep" = Customer Support
 * Representative). No "5-7 days" or "$11/hr" here.
 */
export const A_ANY_ROLE = {
  eyebrow: 'Any role',
  lead: 'Need a',
  tail: 'Hirably.',
  cycle: [
    'Customer Support Rep',
    'Bookkeeper',
    'Account Executive',
    'Project Coordinator',
    'Full Stack Developer',
    'Guidewire Developer',
  ],
  support: 'From your support desk to your dev team. Every role gets the same verified process and lifetime guarantee, with a rate quoted for the role.',
  cta: 'See your rate',
};

/** How it works: timeline from the deck. Titles unchanged. */
export const A_STEPS_EYEBROW = 'The Hirably Way';
/** Rendered as two lines. */
export const A_STEPS_TITLE = ['From first call to first day.', 'In about two weeks.'];
export const A_STEPS_SUBTITLE = 'You tell us the role and choose your hire. We handle every step in between.';
export const A_STEPS: (DraftItem & { day: string })[] = [
  {
    day: 'Day 0',
    icon: 'search',
    title: 'We Scout & Screen',
    description: 'Tell us the role in one call or a job description. We start headhunting from our verified talent pool and passive candidates.',
  },
  {
    day: 'Days 5-7',
    icon: 'users',
    title: 'You Interview & Select',
    description: 'You get a shortlist of 3-5 verified candidates, each with their individual rate. We book every interview.',
  },
  {
    day: 'About day 10',
    icon: 'check',
    title: 'We Onboard in Days',
    description: 'You approve your hire. Days later, they start with laptop, payroll, and HR in place.',
  },
];

/** New section: Verified by Hirably. */
export const A_VERIFIED_TITLE = 'Verified by Hirably';
export const A_VERIFIED_INTRO = 'Every candidate passes four checks before they reach you.';
export const A_VERIFIED: DraftItem[] = [
  { icon: 'search', title: 'Sourced', description: 'We headhunt from our verified talent pool and passive candidates.' },
  { icon: 'chat', title: 'Interviewed live', description: 'Video interview in English and Spanish. English level is assessed in conversation and shown on their profile.' },
  { icon: 'file', title: 'Identity and history', description: 'Identity confirmed. Work history and credentials checked. References we locate ourselves.' },
  { icon: 'shield', title: 'Background-checked', description: 'Background check before the offer. Included, a $149 value.' },
];

/** Done for you comparison table (no company names). true = check, false = not offered. */
export type CompareCell = boolean | string;
export const A_COMPARE_COLUMNS = ['Hirably', 'EOR platforms', 'Recruiting agencies'];
export const A_COMPARE_ROWS: { label: string; cells: [CompareCell, CompareCell, CompareCell] }[] = [
  { label: 'Finds and vets the talent', cells: [true, false, true] },
  { label: 'Legal employer in Mexico', cells: [true, true, false] },
  { label: 'Equipment, setup, and IT support', cells: [true, false, false] },
  { label: 'Replacement guarantee', cells: ['Lifetime', false, '90 days'] },
  { label: 'Fees to start', cells: ['Zero recruitment fees', 'Setup fee', '20% of salary'] },
  { label: 'Who answers', cells: ['Dedicated account manager', 'Ticket queue', 'Your recruiter, until day 90'] },
];

/** Why you'll love Hirably. */
export const A_LOVE_SUBTITLE = 'Zero recruitment fees. Month-to-month terms. A lifetime guarantee. We carry the risk.';
export const A_LOVE: DraftItem[] = [
  { icon: 'infinity', title: 'Lifetime Replacement Guarantee', description: 'If your hire ever leaves, we find the next one. Zero fees, any time.' },
  { icon: 'dollar', title: 'Zero Fees to Start', description: 'Zero recruitment fees. Zero onboarding fees. Nothing to pay until you approve a hire.' },
  { icon: 'file', title: 'Your Rate, Up Front', description: 'Every candidate comes with one all-inclusive rate, quoted before you interview.' },
  { icon: 'users', title: 'Dedicated Account Manager', description: 'One person who knows your team, plus a Slack channel if you want one. Check-ins, PTO, and retention handled.' },
  { icon: 'laptop', title: 'Equipment Included', description: 'Laptop provisioned, configured, shipped, and supported by Hirably. An $800/yr value.' },
  { icon: 'calendar', title: 'Month-to-Month', description: 'Month-to-month, with 30 days\' notice. One invoice a month.' },
];

/** Stats: 97% and 100% are pending and unchanged; only the shortlist label gains "business". */
export const A_STATS = [
  { value: '97%', label: 'retention rate' },
  { value: '5-7', label: 'business days to a verified shortlist' },
  { value: '100%', label: 'compliance' },
  { value: 'Zero', label: 'recruitment fees' },
];

/** Why nearshore. */
export const A_NEARSHORE_TITLE = 'Talent in Mexico, working your hours.';
export const A_NEARSHORE_SUBTITLE = 'Bilingual professionals in your meetings, on your schedule, for up to 70% less than an equivalent US hire.';
export const A_NEARSHORE: DraftItem[] = [
  { icon: 'clock', title: 'Your Hours, Real Time', description: 'Your team works Pacific, Mountain, Central, or Eastern hours. Collaborate on Slack and Zoom in real time, like they\'re in the next room.' },
  { icon: 'chat', title: 'English, Assessed Live', description: 'We interview every candidate in English and Spanish. Their English level is assessed in conversation and shown on their profile.' },
  { icon: 'award', title: 'Senior Talent, Up to 70% Less', description: 'Hire senior engineers, developers, and specialists in Mexico for up to 70% less than an equivalent US hire.' },
];

/** Calculator (Draft A wording). */
export const A_CALC = {
  included: [
    'Recruitment & vetting',
    'Background check ($149 value)',
    'Pay, payroll taxes & benefits',
    'Equipment, setup & IT support',
    'HR, check-ins & PTO',
    'Dedicated account manager',
    'Lifetime replacement guarantee',
  ],
  usLabel: 'Equivalent US hire',
  footnote: 'Every candidate comes with their exact all-inclusive rate, before you interview.',
  sent: 'Got it. Sample profiles for this role are on their way to your inbox.',
};

/** Pricing (Draft A): Hirably Complete is the only card, without a badge. "Vetted Talent (4% acceptance rate)" stays (pending). */
export const A_PRICING = {
  title: 'One Rate. Everything Included.',
  name: 'Hirably Complete',
  subtitle: 'One partner to find, employ, equip, pay, and manage your team in Mexico.',
  pricePrefix: 'From',
  priceUnit: '/hr all-inclusive',
  priceNote: 'One rate per candidate, quoted before you interview. Senior engineers, developers, and specialists are quoted higher.',
  featuresLabel: 'Your rate covers',
  groups: [
    {
      title: 'Hiring',
      items: [
        'Vetted Talent (4% acceptance rate)',
        'Headhunting from our verified talent pool',
        'Live interviews in English and Spanish',
        'Identity, work history & references checked',
        'Background check ($149 value)',
        'Zero recruitment fees',
        'Zero onboarding fees',
      ],
    },
    {
      title: 'Employment',
      items: [
        'Pay, payroll taxes & benefits',
        'Legal employer in Mexico',
        'Equipment, setup & IT support ($800/yr value)',
        'HR, check-ins & PTO',
        'Dedicated account manager',
        'Lifetime replacement guarantee',
        'One invoice a month',
      ],
    },
  ],
  cta: 'Start Hiring',
  deposit: 'When you approve a hire, a one-month deposit secures it. It\'s applied to your final invoice.',
  terms: 'Month-to-month · 30 days\' notice',
  footer: 'All prices in USD. Month-to-month, with 30 days\' notice.',
  crossSell: 'Already have talent or your own entity in Mexico? Ask us about EOR and Recruitment.',
};
export const A_FOOTER_LINE = 'One partner to find, employ, equip, pay, and manage your team in Mexico.';

