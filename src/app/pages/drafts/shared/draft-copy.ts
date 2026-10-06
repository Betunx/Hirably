/**
 * DESIGN DRAFTS ONLY (/draft-a, /draft-b, /draft-c). Corrected copy shared by the three drafts.
 * The real homepage keeps reading data.service.ts; nothing here is used outside src/app/pages/drafts/.
 */
import { DraftIconName } from './draft-icon.component';

export type DraftVariant = 'a' | 'b' | 'c';

export interface DraftItem {
  icon: DraftIconName;
  title: string;
  description: string;
}

export const DRAFT_HERO = {
  headline: 'Hire Top 1% Talent in Mexico',
  fees: 'Zero Recruitment Fees. Ever.',
  approve: 'You approve. We do the rest.',
};

export const WHOLE_JOB_HEADLINE = 'Platforms employ. Agencies find. Hirably does the whole job.';

/** New "Done for you" section (right after The Hirably Way). */
export const DONE_FOR_YOU: { icon: DraftIconName; text: string }[] = [
  { icon: 'search', text: 'We find and screen the talent, and schedule every interview.' },
  { icon: 'shield', text: 'We run background and identity checks.' },
  { icon: 'file', text: 'We become the legal employer: contracts, payroll, taxes, benefits.' },
  { icon: 'laptop', text: 'We ship the laptop, set it up, and support it.' },
  { icon: 'chat', text: 'We handle HR, check-ins, and time off.' },
  { icon: 'refresh', text: 'If someone leaves, we replace them. Free, for life.' },
];
export const DONE_FOR_YOU_CLOSING = 'Your portal shows everything. You never have to run it.';

/** The Hirably Way (step 3 corrected). */
export const DRAFT_STEPS: DraftItem[] = [
  {
    icon: 'search',
    title: 'We Scout & Screen',
    description: 'We take your requirements and go to market. We recruit and prescreen heavily, filtering out the noise so you only see the candidates worth your time.',
  },
  {
    icon: 'users',
    title: 'You Interview & Select',
    description: 'Skip the scheduling mess. We manage the calendars so you can focus on the candidate. You interview the finalists, test their skills, and make the final hire.',
  },
  {
    icon: 'check',
    title: 'We Onboard in Days',
    description: 'Once you say "Yes," we handle the rest. We generate compliant contracts, handle equipment logistics, and set up benefits. Your new hire starts in days, not weeks.',
  },
];

/** Why you'll love Hirably (cards 1, 2 and 5 corrected). */
export const DRAFT_LOVE_CARDS: DraftItem[] = [
  {
    icon: 'infinity',
    title: 'Lifetime Protection',
    description: 'If your employee leaves for any reason, at any time, we recruit their replacement for free. You never pay for the same role twice.',
  },
  {
    icon: 'dollar',
    title: 'Zero Recruitment Fees',
    description: 'No recruitment fees. No setup fees. Nothing to pay until you approve a hire.',
  },
  {
    icon: 'shield',
    title: 'Background-Checked & Verified',
    description: 'Live interviews, verified identity and references. Every candidate, before you ever meet them.',
  },
  {
    icon: 'calendar',
    title: 'Month-to-Month',
    description: 'No lock-ins, no fine print. Scale up, down, or out with 30 days\' notice.',
  },
  {
    icon: 'clock',
    title: 'First Shortlist in 5-7 Days',
    description: 'We move at the speed of your roadmap. A vetted shortlist in your inbox, ready to interview.',
  },
  {
    icon: 'globe',
    title: 'North American Standards',
    description: 'Same time zones. Same business culture. Your team integrates seamlessly into your workflow from Day 1. Not Day 90.',
  },
];

/** Static stats row (two replaced, two kept). */
export const DRAFT_STATS = [
  { value: '97%', label: 'retention rate' },
  { value: '5-7', label: 'days to first shortlist' },
  { value: '100%', label: 'compliance' },
  { value: 'Zero', label: 'recruitment fees' },
];

export const NEARSHORE_TITLE = 'Why top companies are moving from offshore to nearshore.';
export const NEARSHORE_SUBTITLE = 'Stop working the night shift to manage your team. Mexico offers the talent you need, in the time zone you live in.';
export const DRAFT_NEARSHORE: DraftItem[] = [
  {
    icon: 'clock',
    title: 'No More "Async" Lag',
    description: 'Forget waiting 24 hours for a reply. Your team works your hours: Pacific, Mountain, Central, or Eastern. Collaborate on Slack and Zoom in real time, like they\'re in the next room.',
  },
  {
    icon: 'chat',
    title: 'Culture, Not Just Language',
    description: 'It\'s not just about speaking English; it\'s about speaking "Business." Mexican professionals share North American work ethic, urgency, and communication style.',
  },
  {
    icon: 'award',
    title: 'Senior Talent, Junior Prices',
    description: 'Don\'t settle for entry-level. Hire senior professionals and leaders in Mexico for the cost of a junior US employee. Up to 70% savings, zero quality drop.',
  },
];

export const STEPS_SUBTITLE = 'You define the vision. We handle the vetting, scheduling, and paperwork.';
export const STEPS_SUBTITLE_STRONG = 'A simple, guided path to your next great hire.';
export const LOVE_SUBTITLE = 'Most agencies charge upfront fees and lock you into contracts. We take on the risk so you don\'t have to.';

export const TRUST_LINE = 'Trusted by Engineering, Tax, Legal, and Health Firms in the US';
export const TRUST_LOGOS = [
  { src: 'assets/logos/brands-logos/alakai-capital.png', alt: 'Alakai Capital' },
  { src: 'assets/logos/brands-logos/buxton-consulting.jpg', alt: 'Buxton Consulting' },
  { src: 'assets/logos/brands-logos/ferrosource.jpg', alt: 'Ferrosource' },
  { src: 'assets/logos/brands-logos/novel-engineering.jpg', alt: 'Novel Engineering' },
  { src: 'assets/logos/brands-logos/outlook-tax.jpg', alt: 'Outlook Tax' },
  { src: 'assets/logos/brands-logos/young-basile.png', alt: 'Young Basile' },
];

export const PRICING_FOOTER = 'All prices in USD. No hidden fees. Cancel anytime with 30 days\' notice.';
export const FOOTER_ADDRESS = 'US: Phoenix, AZ · MX: Hermosillo, Son.';
