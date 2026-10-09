/**
 * Rate calculator data (hero section).
 *
 * Hirably bands: hourly USD, all-inclusive (Hirably role library). A level the role does not
 * offer is simply left out.
 * US wages: BLS OEWS national estimates, hourly. Entry = 25th percentile, Mid = median,
 * Senior = 75th percentile (roles marked usBand: 'lower' step one percentile down).
 *
 * Refresh once a year when OEWS publishes (each spring): update every usHourly figure and
 * RATE_DATA_VINTAGE together. Figures were checked against two official BLS sources
 * (api.bls.gov series OEUN… and the national OEWS table) and matched to the cent.
 */

export type RateLevel = 'entry' | 'mid' | 'senior';

export interface RateBand {
  min: number;
  max: number;
}

export interface RoleRate {
  category: string;
  role: string;
  /** BLS Standard Occupational Classification code used for the US comparison. */
  soc: string;
  blsOccupation: string;
  /** 'lower' = conservative mapping (Entry = 10th, Mid = 25th, Senior = median). */
  usBand?: 'lower';
  hirably: Partial<Record<RateLevel, RateBand>>;
  usHourly: Partial<Record<RateLevel, number>>;
}

export const RATE_DATA_VINTAGE = {
  usWages: 'BLS OEWS May 2025 national estimates',
  usWagesSource: 'https://data.bls.gov/oes/#/area/0000000/2025',
  usWagesCheckedOn: '2026-09-28',
  benefitCosts: 'BLS Employer Costs for Employee Compensation, June 2026, Table 5 (full-time private industry)',
  benefitCostsSource: 'https://www.bls.gov/news.release/ecec.t05.htm',
} as const;

export const RATE_ASSUMPTIONS = {
  /** Paid hours per year (40 h x 52 weeks). */
  hoursPaidPerYear: 2080,
  /** Hours actually worked per year: 2,080 x 0.894 (ECEC paid leave share, full-time private). */
  hoursWorkedPerYear: 1859,
  /**
   * US employer load on top of the OEWS salary (OEWS salary already includes paid leave, so the
   * ECEC shares are rescaled to wages + paid leave): payroll taxes 9.1%, insurance + retirement +
   * supplemental pay 21.4%. Total yearly cost = salary x 1.305.
   */
  payrollTaxRate: 0.091,
  benefitsRate: 0.214,
  /** "Specialized skills or industry experience": +15% on both ends, rounded to whole dollars. */
  specializedUplift: 0.15,
  /** No Hirably rate is ever shown below this hourly figure. */
  minHourlyRate: 11,
  /** Savings shown are capped at this share of the US cost. */
  maxSavingsShare: 0.7,
} as const;

/** Starting state: no role selected (the visitor picks one), Mid preselected. */
export const DEFAULT_RATE_SELECTION = { level: 'mid' as RateLevel };

export const ROLE_RATES: RoleRate[] = [
  // ── Admin & Operations ────────────────────────────────────────────────────
  {
    category: 'Admin & Operations', role: 'Executive Assistant', soc: '43-6011',
    blsOccupation: 'Executive Secretaries and Executive Administrative Assistants',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 19 } },
    usHourly: { entry: 29.52, mid: 36.82, senior: 45.38 }
  },
  {
    category: 'Admin & Operations', role: 'Administrative Assistant', soc: '43-6014',
    blsOccupation: 'Secretaries and Administrative Assistants, Except Legal, Medical, and Executive',
    hirably: { entry: { min: 11, max: 13 }, mid: { min: 13, max: 15 }, senior: { min: 15, max: 17 } },
    usHourly: { entry: 18.67, mid: 22.86, senior: 27.89 }
  },
  {
    category: 'Admin & Operations', role: 'Office / Operations Coordinator', soc: '43-1011',
    blsOccupation: 'First-Line Supervisors of Office and Administrative Support Workers',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 19 } },
    usHourly: { entry: 26.90, mid: 33.41, senior: 40.91 }
  },
  {
    category: 'Admin & Operations', role: 'Data Entry Specialist', soc: '43-9021',
    blsOccupation: 'Data Entry Keyers',
    hirably: { entry: { min: 11, max: 13 }, mid: { min: 13, max: 14 }, senior: { min: 14, max: 16 } },
    usHourly: { entry: 17.19, mid: 19.88, senior: 23.27 }
  },
  {
    category: 'Admin & Operations', role: 'Project Coordinator', soc: '13-1082',
    blsOccupation: 'Project Management Specialists',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 22 } },
    usHourly: { entry: 37.71, mid: 49.19, senior: 63.99 }
  },
  {
    category: 'Admin & Operations', role: 'Project Manager', soc: '13-1082',
    blsOccupation: 'Project Management Specialists',
    hirably: { entry: { min: 18, max: 21 }, mid: { min: 21, max: 26 }, senior: { min: 26, max: 32 } },
    usHourly: { entry: 37.71, mid: 49.19, senior: 63.99 }
  },
  {
    category: 'Admin & Operations', role: 'Operations Manager', soc: '11-1021',
    blsOccupation: 'General and Operations Managers',
    hirably: { mid: { min: 24, max: 30 }, senior: { min: 30, max: 38 } },
    usHourly: { mid: 50.85, senior: 80.42 }
  },
  {
    category: 'Admin & Operations', role: 'Virtual Assistant', soc: '43-6014',
    blsOccupation: 'Secretaries and Administrative Assistants, Except Legal, Medical, and Executive',
    hirably: { entry: { min: 11, max: 13 }, mid: { min: 13, max: 15 }, senior: { min: 15, max: 17 } },
    usHourly: { entry: 18.67, mid: 22.86, senior: 27.89 }
  },
  {
    category: 'Admin & Operations', role: 'Receptionist / Front Desk', soc: '43-4171',
    blsOccupation: 'Receptionists and Information Clerks',
    hirably: { entry: { min: 11, max: 13 }, mid: { min: 13, max: 14 }, senior: { min: 14, max: 16 } },
    usHourly: { entry: 16.33, mid: 18.27, senior: 21.70 }
  },
  {
    category: 'Admin & Operations', role: 'Dispatch / Scheduling Coordinator', soc: '43-5032',
    blsOccupation: 'Dispatchers, Except Police, Fire, and Ambulance',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 19 } },
    usHourly: { entry: 20.56, mid: 24.20, senior: 30.02 }
  },

  // ── Support ───────────────────────────────────────────────────────────────
  {
    category: 'Support', role: 'Customer Support Representative', soc: '43-4051',
    blsOccupation: 'Customer Service Representatives',
    hirably: { entry: { min: 11, max: 13 }, mid: { min: 13, max: 15 }, senior: { min: 15, max: 18 } },
    usHourly: { entry: 17.72, mid: 21.53, senior: 24.89 }
  },
  {
    category: 'Support', role: 'Technical Support Specialist', soc: '15-1232',
    blsOccupation: 'Computer User Support Specialists',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 22 } },
    usHourly: { entry: 23.56, mid: 29.74, senior: 38.00 }
  },
  {
    category: 'Support', role: 'Support & Operations Coordinator', soc: '43-1011',
    blsOccupation: 'First-Line Supervisors of Office and Administrative Support Workers',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 22 } },
    usHourly: { entry: 26.90, mid: 33.41, senior: 40.91 }
  },
  {
    category: 'Support', role: 'Customer Success Manager', soc: '41-3091',
    blsOccupation: 'Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel',
    hirably: { entry: { min: 16, max: 19 }, mid: { min: 19, max: 24 }, senior: { min: 24, max: 30 } },
    usHourly: { entry: 22.92, mid: 33.65, senior: 48.31 }
  },
  {
    category: 'Support', role: 'Community / Chat Moderator', soc: '43-4051',
    blsOccupation: 'Customer Service Representatives',
    hirably: { entry: { min: 11, max: 13 }, mid: { min: 13, max: 14 }, senior: { min: 14, max: 16 } },
    usHourly: { entry: 17.72, mid: 21.53, senior: 24.89 }
  },
  {
    category: 'Support', role: 'Call Center Agent', soc: '43-4051',
    blsOccupation: 'Customer Service Representatives',
    hirably: { entry: { min: 12, max: 13 }, mid: { min: 13, max: 14 }, senior: { min: 14, max: 16 } },
    usHourly: { entry: 17.72, mid: 21.53, senior: 24.89 }
  },
  {
    category: 'Support', role: 'BDC Representative (Automotive)', soc: '41-3091',
    blsOccupation: 'Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel',
    usBand: 'lower', // conservative: Entry = 10th, Mid = 25th, Senior = median
    hirably: { entry: { min: 14, max: 16 }, mid: { min: 16, max: 18 }, senior: { min: 18, max: 20 } },
    usHourly: { entry: 18.26, mid: 22.92, senior: 33.65 }
  },
  {
    category: 'Support', role: 'Support Team Lead', soc: '43-1011',
    blsOccupation: 'First-Line Supervisors of Office and Administrative Support Workers',
    hirably: { mid: { min: 17, max: 20 }, senior: { min: 20, max: 24 } },
    usHourly: { mid: 33.41, senior: 40.91 }
  },
  {
    category: 'Support', role: 'Onboarding / Implementation Specialist', soc: '13-1151',
    blsOccupation: 'Training and Development Specialists',
    hirably: { entry: { min: 15, max: 18 }, mid: { min: 18, max: 22 }, senior: { min: 22, max: 26 } },
    usHourly: { entry: 24.09, mid: 33.31, senior: 45.70 }
  },
  {
    category: 'Support', role: 'Patient Coordinator / Medical Receptionist', soc: '43-6013',
    blsOccupation: 'Medical Secretaries and Administrative Assistants',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 18 } },
    usHourly: { entry: 18.54, mid: 22.08, senior: 24.32 }
  },

  // ── Accounting ────────────────────────────────────────────────────────────
  {
    category: 'Accounting', role: 'Bookkeeper', soc: '43-3031',
    blsOccupation: 'Bookkeeping, Accounting, and Auditing Clerks',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 19 } },
    usHourly: { entry: 20.92, mid: 24.36, senior: 29.55 }
  },
  {
    category: 'Accounting', role: 'Staff Accountant', soc: '13-2011',
    blsOccupation: 'Accountants and Auditors',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 22 } },
    usHourly: { entry: 32.22, mid: 40.23, senior: 52.80 }
  },
  {
    category: 'Accounting', role: 'Senior Accountant', soc: '13-2011',
    blsOccupation: 'Accountants and Auditors',
    hirably: { mid: { min: 18, max: 22 }, senior: { min: 22, max: 27 } },
    usHourly: { mid: 40.23, senior: 52.80 }
  },
  {
    category: 'Accounting', role: 'Accounts Payable/Receivable Specialist', soc: '43-3031',
    blsOccupation: 'Bookkeeping, Accounting, and Auditing Clerks',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 19 } },
    usHourly: { entry: 20.92, mid: 24.36, senior: 29.55 }
  },
  {
    category: 'Accounting', role: 'Payroll Specialist', soc: '43-3051',
    blsOccupation: 'Payroll and Timekeeping Clerks',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 22 } },
    usHourly: { entry: 23.07, mid: 28.01, senior: 33.46 }
  },
  {
    category: 'Accounting', role: 'Tax Associate', soc: '13-2082',
    blsOccupation: 'Tax Preparers',
    hirably: { entry: { min: 14, max: 17 }, mid: { min: 17, max: 21 }, senior: { min: 21, max: 26 } },
    usHourly: { entry: 18.71, mid: 26.40, senior: 36.68 }
  },
  {
    category: 'Accounting', role: 'Audit Associate', soc: '13-2011',
    blsOccupation: 'Accountants and Auditors',
    hirably: { entry: { min: 15, max: 18 }, mid: { min: 18, max: 22 }, senior: { min: 22, max: 27 } },
    usHourly: { entry: 32.22, mid: 40.23, senior: 52.80 }
  },
  {
    category: 'Accounting', role: 'Medical Billing Specialist', soc: '43-3021',
    blsOccupation: 'Billing and Posting Clerks',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 19 } },
    usHourly: { entry: 20.60, mid: 23.32, senior: 28.02 }
  },
  {
    category: 'Accounting', role: 'Cost Accountant', soc: '13-2011',
    blsOccupation: 'Accountants and Auditors',
    hirably: { entry: { min: 14, max: 16 }, mid: { min: 16, max: 19 }, senior: { min: 19, max: 24 } },
    usHourly: { entry: 32.22, mid: 40.23, senior: 52.80 }
  },
  {
    category: 'Accounting', role: 'Accounting Manager', soc: '11-3031',
    blsOccupation: 'Financial Managers',
    hirably: { mid: { min: 24, max: 30 }, senior: { min: 30, max: 36 } },
    usHourly: { mid: 80.08, senior: 105.76 }
  },

  // ── Finance ───────────────────────────────────────────────────────────────
  {
    category: 'Finance', role: 'Financial Analyst', soc: '13-2051',
    blsOccupation: 'Financial and Investment Analysts',
    hirably: { entry: { min: 16, max: 19 }, mid: { min: 19, max: 24 }, senior: { min: 24, max: 30 } },
    usHourly: { entry: 38.12, mid: 49.40, senior: 64.11 }
  },
  {
    category: 'Finance', role: 'FP&A Analyst', soc: '13-2051',
    blsOccupation: 'Financial and Investment Analysts',
    hirably: { entry: { min: 17, max: 20 }, mid: { min: 20, max: 25 }, senior: { min: 25, max: 32 } },
    usHourly: { entry: 38.12, mid: 49.40, senior: 64.11 }
  },
  {
    category: 'Finance', role: 'Controller', soc: '11-3031',
    blsOccupation: 'Financial Managers',
    hirably: { mid: { min: 26, max: 32 }, senior: { min: 32, max: 40 } },
    usHourly: { mid: 80.08, senior: 105.76 }
  },
  {
    category: 'Finance', role: 'Billing / Revenue Analyst', soc: '43-3021',
    blsOccupation: 'Billing and Posting Clerks',
    hirably: { entry: { min: 13, max: 16 }, mid: { min: 16, max: 20 }, senior: { min: 20, max: 24 } },
    usHourly: { entry: 20.60, mid: 23.32, senior: 28.02 }
  },
  {
    category: 'Finance', role: 'Collections Specialist', soc: '43-3011',
    blsOccupation: 'Bill and Account Collectors',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 19 } },
    usHourly: { entry: 18.76, mid: 22.61, senior: 27.28 }
  },
  {
    category: 'Finance', role: 'Treasury Analyst', soc: '13-2051',
    blsOccupation: 'Financial and Investment Analysts',
    hirably: { entry: { min: 16, max: 19 }, mid: { min: 19, max: 24 }, senior: { min: 24, max: 30 } },
    usHourly: { entry: 38.12, mid: 49.40, senior: 64.11 }
  },
  {
    category: 'Finance', role: 'Credit Analyst', soc: '13-2041',
    blsOccupation: 'Credit Analysts',
    hirably: { entry: { min: 15, max: 18 }, mid: { min: 18, max: 22 }, senior: { min: 22, max: 27 } },
    usHourly: { entry: 31.35, mid: 40.15, senior: 58.88 }
  },
  {
    category: 'Finance', role: 'Loan Processor', soc: '43-4131',
    blsOccupation: 'Loan Interviewers and Clerks',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 21 } },
    usHourly: { entry: 21.69, mid: 24.05, senior: 29.14 }
  },
  {
    category: 'Finance', role: 'Investment / Fund Analyst', soc: '13-2051',
    blsOccupation: 'Financial and Investment Analysts',
    hirably: { entry: { min: 17, max: 20 }, mid: { min: 20, max: 26 }, senior: { min: 26, max: 34 } },
    usHourly: { entry: 38.12, mid: 49.40, senior: 64.11 }
  },
  {
    category: 'Finance', role: 'Director of Finance', soc: '11-3031',
    blsOccupation: 'Financial Managers',
    hirably: { mid: { min: 32, max: 40 }, senior: { min: 40, max: 50 } },
    usHourly: { mid: 80.08, senior: 105.76 }
  },

  // ── Sales ─────────────────────────────────────────────────────────────────
  {
    category: 'Sales', role: 'SDR / Appointment Setter', soc: '41-3091',
    blsOccupation: 'Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel',
    usBand: 'lower', // conservative: Entry = 10th, Mid = 25th, Senior = median
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 17 }, senior: { min: 17, max: 20 } },
    usHourly: { entry: 18.26, mid: 22.92, senior: 33.65 }
  },
  {
    category: 'Sales', role: 'Account Executive', soc: '41-3091',
    blsOccupation: 'Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel',
    hirably: { entry: { min: 16, max: 19 }, mid: { min: 19, max: 24 }, senior: { min: 24, max: 30 } },
    usHourly: { entry: 22.92, mid: 33.65, senior: 48.31 }
  },
  {
    category: 'Sales', role: 'Account Manager', soc: '41-3091',
    blsOccupation: 'Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel',
    hirably: { entry: { min: 15, max: 18 }, mid: { min: 18, max: 22 }, senior: { min: 22, max: 27 } },
    usHourly: { entry: 22.92, mid: 33.65, senior: 48.31 }
  },
  {
    category: 'Sales', role: 'Sales Operations Analyst', soc: '13-1161',
    blsOccupation: 'Market Research Analysts and Marketing Specialists',
    hirably: { entry: { min: 15, max: 18 }, mid: { min: 18, max: 22 }, senior: { min: 22, max: 26 } },
    usHourly: { entry: 28.05, mid: 37.87, senior: 52.07 }
  },
  {
    category: 'Sales', role: 'Business Development Rep', soc: '41-3091',
    blsOccupation: 'Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel',
    usBand: 'lower', // conservative: Entry = 10th, Mid = 25th, Senior = median
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 21 } },
    usHourly: { entry: 18.26, mid: 22.92, senior: 33.65 }
  },
  {
    category: 'Sales', role: 'Enterprise Account Executive', soc: '41-4011',
    blsOccupation: 'Sales Representatives, Wholesale and Manufacturing, Technical and Scientific Products',
    hirably: { mid: { min: 26, max: 32 }, senior: { min: 32, max: 38 } },
    usHourly: { mid: 50.44, senior: 76.04 }
  },
  {
    category: 'Sales', role: 'Sales Engineer / Solutions Consultant', soc: '41-9031',
    blsOccupation: 'Sales Engineers',
    hirably: { mid: { min: 26, max: 32 }, senior: { min: 32, max: 40 } },
    usHourly: { mid: 60.05, senior: 77.52 }
  },
  {
    category: 'Sales', role: 'Sales Manager', soc: '11-2022',
    blsOccupation: 'Sales Managers',
    hirably: { mid: { min: 24, max: 30 }, senior: { min: 30, max: 38 } },
    usHourly: { mid: 71.28, senior: 99.68 }
  },
  {
    category: 'Sales', role: 'Renewals / Retention Specialist', soc: '41-3091',
    blsOccupation: 'Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 21 } },
    usHourly: { entry: 22.92, mid: 33.65, senior: 48.31 }
  },
  {
    category: 'Sales', role: 'Lead Generation Specialist', soc: '13-1161',
    blsOccupation: 'Market Research Analysts and Marketing Specialists',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 19 } },
    usHourly: { entry: 28.05, mid: 37.87, senior: 52.07 }
  },

  // ── Marketing ─────────────────────────────────────────────────────────────
  {
    category: 'Marketing', role: 'Marketing Analyst', soc: '13-1161',
    blsOccupation: 'Market Research Analysts and Marketing Specialists',
    hirably: { entry: { min: 13, max: 16 }, mid: { min: 16, max: 19 }, senior: { min: 19, max: 23 } },
    usHourly: { entry: 28.05, mid: 37.87, senior: 52.07 }
  },
  {
    category: 'Marketing', role: 'Content Writer / Specialist', soc: '27-3043',
    blsOccupation: 'Writers and Authors',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 17 }, senior: { min: 17, max: 21 } },
    usHourly: { entry: 28.00, mid: 36.98, senior: 49.01 }
  },
  {
    category: 'Marketing', role: 'Graphic Designer', soc: '27-1024',
    blsOccupation: 'Graphic Designers',
    hirably: { entry: { min: 14, max: 17 }, mid: { min: 17, max: 21 }, senior: { min: 21, max: 26 } },
    usHourly: { entry: 23.58, mid: 30.27, senior: 39.34 }
  },
  {
    category: 'Marketing', role: 'Social Media Manager', soc: '27-3031',
    blsOccupation: 'Public Relations Specialists',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 22 } },
    usHourly: { entry: 27.05, mid: 35.94, senior: 48.25 }
  },
  {
    category: 'Marketing', role: 'SEO / Paid Media Specialist', soc: '13-1161',
    blsOccupation: 'Market Research Analysts and Marketing Specialists',
    hirably: { entry: { min: 14, max: 17 }, mid: { min: 17, max: 21 }, senior: { min: 21, max: 26 } },
    usHourly: { entry: 28.05, mid: 37.87, senior: 52.07 }
  },
  {
    category: 'Marketing', role: 'Marketing Manager', soc: '11-2021',
    blsOccupation: 'Marketing Managers',
    hirably: { mid: { min: 22, max: 28 }, senior: { min: 28, max: 35 } },
    usHourly: { mid: 80.19, senior: 104.04 }
  },
  {
    category: 'Marketing', role: 'Marketing Coordinator', soc: '13-1161',
    blsOccupation: 'Market Research Analysts and Marketing Specialists',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 19 } },
    usHourly: { entry: 28.05, mid: 37.87, senior: 52.07 }
  },
  {
    category: 'Marketing', role: 'Email / Marketing Automation Specialist', soc: '13-1161',
    blsOccupation: 'Market Research Analysts and Marketing Specialists',
    hirably: { entry: { min: 14, max: 17 }, mid: { min: 17, max: 21 }, senior: { min: 21, max: 26 } },
    usHourly: { entry: 28.05, mid: 37.87, senior: 52.07 }
  },
  {
    category: 'Marketing', role: 'Video Editor / Motion Designer', soc: '27-4032',
    blsOccupation: 'Film and Video Editors',
    hirably: { entry: { min: 14, max: 17 }, mid: { min: 17, max: 21 }, senior: { min: 21, max: 26 } },
    usHourly: { entry: 25.35, mid: 36.26, senior: 50.63 }
  },
  {
    category: 'Marketing', role: 'Web Designer', soc: '15-1255',
    blsOccupation: 'Web and Digital Interface Designers',
    hirably: { entry: { min: 16, max: 19 }, mid: { min: 19, max: 24 }, senior: { min: 24, max: 30 } },
    usHourly: { entry: 35.24, mid: 50.00, senior: 76.36 }
  },

  // ── Human Resources ───────────────────────────────────────────────────────
  {
    category: 'Human Resources', role: 'HR / Recruiting Coordinator', soc: '43-4161',
    blsOccupation: 'Human Resources Assistants, Except Payroll and Timekeeping',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 19 }, senior: { min: 19, max: 23 } },
    usHourly: { entry: 21.17, mid: 24.33, senior: 28.75 }
  },
  {
    category: 'Human Resources', role: 'Recruiter', soc: '13-1071',
    blsOccupation: 'Human Resources Specialists',
    hirably: { entry: { min: 14, max: 16 }, mid: { min: 16, max: 21 }, senior: { min: 21, max: 26 } },
    usHourly: { entry: 28.18, mid: 36.51, senior: 47.78 }
  },
  {
    category: 'Human Resources', role: 'HR Generalist', soc: '13-1071',
    blsOccupation: 'Human Resources Specialists',
    hirably: { entry: { min: 14, max: 17 }, mid: { min: 17, max: 21 }, senior: { min: 21, max: 25 } },
    usHourly: { entry: 28.18, mid: 36.51, senior: 47.78 }
  },
  {
    category: 'Human Resources', role: 'HR Assistant', soc: '43-4161',
    blsOccupation: 'Human Resources Assistants, Except Payroll and Timekeeping',
    hirably: { entry: { min: 12, max: 14 }, mid: { min: 14, max: 16 }, senior: { min: 16, max: 18 } },
    usHourly: { entry: 21.17, mid: 24.33, senior: 28.75 }
  },
  {
    category: 'Human Resources', role: 'Technical Recruiter', soc: '13-1071',
    blsOccupation: 'Human Resources Specialists',
    hirably: { entry: { min: 16, max: 19 }, mid: { min: 19, max: 24 }, senior: { min: 24, max: 30 } },
    usHourly: { entry: 28.18, mid: 36.51, senior: 47.78 }
  },
  {
    category: 'Human Resources', role: 'Talent Sourcer', soc: '13-1071',
    blsOccupation: 'Human Resources Specialists',
    hirably: { entry: { min: 13, max: 15 }, mid: { min: 15, max: 18 }, senior: { min: 18, max: 21 } },
    usHourly: { entry: 28.18, mid: 36.51, senior: 47.78 }
  },
  {
    category: 'Human Resources', role: 'HR Manager', soc: '11-3121',
    blsOccupation: 'Human Resources Managers',
    hirably: { mid: { min: 22, max: 28 }, senior: { min: 28, max: 35 } },
    usHourly: { mid: 71.77, senior: 95.81 }
  },
  {
    category: 'Human Resources', role: 'Payroll & Benefits Administrator', soc: '13-1141',
    blsOccupation: 'Compensation, Benefits, and Job Analysis Specialists',
    hirably: { entry: { min: 14, max: 17 }, mid: { min: 17, max: 21 }, senior: { min: 21, max: 25 } },
    usHourly: { entry: 29.28, mid: 37.60, senior: 48.27 }
  },
  {
    category: 'Human Resources', role: 'Training & Development Specialist', soc: '13-1151',
    blsOccupation: 'Training and Development Specialists',
    hirably: { entry: { min: 14, max: 17 }, mid: { min: 17, max: 21 }, senior: { min: 21, max: 25 } },
    usHourly: { entry: 24.09, mid: 33.31, senior: 45.70 }
  },
  {
    category: 'Human Resources', role: 'Compliance Specialist', soc: '13-1041',
    blsOccupation: 'Compliance Officers',
    hirably: { entry: { min: 15, max: 18 }, mid: { min: 18, max: 22 }, senior: { min: 22, max: 27 } },
    usHourly: { entry: 29.46, mid: 38.81, senior: 52.41 }
  },

  // ── Software Development ──────────────────────────────────────────────────
  {
    category: 'Software Development', role: 'Frontend Developer', soc: '15-1252',
    blsOccupation: 'Software Developers',
    hirably: { entry: { min: 20, max: 24 }, mid: { min: 24, max: 30 }, senior: { min: 30, max: 40 } },
    usHourly: { entry: 50.58, mid: 65.38, senior: 82.68 }
  },
  {
    category: 'Software Development', role: 'Backend Developer', soc: '15-1252',
    blsOccupation: 'Software Developers',
    hirably: { entry: { min: 22, max: 27 }, mid: { min: 27, max: 38 }, senior: { min: 38, max: 50 } },
    usHourly: { entry: 50.58, mid: 65.38, senior: 82.68 }
  },
  {
    category: 'Software Development', role: 'Full Stack Developer', soc: '15-1252',
    blsOccupation: 'Software Developers',
    hirably: { entry: { min: 21, max: 26 }, mid: { min: 26, max: 34 }, senior: { min: 34, max: 45 } },
    usHourly: { entry: 50.58, mid: 65.38, senior: 82.68 }
  },
  {
    category: 'Software Development', role: 'QA Engineer', soc: '15-1253',
    blsOccupation: 'Software Quality Assurance Analysts and Testers',
    hirably: { entry: { min: 15, max: 18 }, mid: { min: 18, max: 23 }, senior: { min: 23, max: 29 } },
    usHourly: { entry: 38.61, mid: 50.14, senior: 64.03 }
  },
  {
    category: 'Software Development', role: 'DevOps / Cloud Engineer', soc: '15-1244',
    blsOccupation: 'Network and Computer Systems Administrators',
    hirably: { entry: { min: 23, max: 28 }, mid: { min: 28, max: 40 }, senior: { min: 40, max: 50 } },
    usHourly: { entry: 37.51, mid: 47.66, senior: 60.89 }
  },
  {
    category: 'Software Development', role: 'Mobile Developer', soc: '15-1252',
    blsOccupation: 'Software Developers',
    hirably: { entry: { min: 21, max: 26 }, mid: { min: 26, max: 34 }, senior: { min: 34, max: 45 } },
    usHourly: { entry: 50.58, mid: 65.38, senior: 82.68 }
  },
  {
    category: 'Software Development', role: 'UI/UX Designer', soc: '15-1255',
    blsOccupation: 'Web and Digital Interface Designers',
    hirably: { entry: { min: 17, max: 21 }, mid: { min: 21, max: 27 }, senior: { min: 27, max: 35 } },
    usHourly: { entry: 35.24, mid: 50.00, senior: 76.36 }
  },
  {
    category: 'Software Development', role: 'Data Analyst', soc: '15-2051',
    blsOccupation: 'Data Scientists',
    hirably: { entry: { min: 15, max: 18 }, mid: { min: 18, max: 23 }, senior: { min: 23, max: 29 } },
    usHourly: { entry: 41.18, mid: 57.80, senior: 76.39 }
  },
  {
    category: 'Software Development', role: 'IT Systems Administrator', soc: '15-1244',
    blsOccupation: 'Network and Computer Systems Administrators',
    hirably: { entry: { min: 16, max: 19 }, mid: { min: 19, max: 24 }, senior: { min: 24, max: 30 } },
    usHourly: { entry: 37.51, mid: 47.66, senior: 60.89 }
  },
  {
    category: 'Software Development', role: 'AI / ML Engineer', soc: '15-1252',
    blsOccupation: 'Software Developers',
    hirably: { mid: { min: 30, max: 38 }, senior: { min: 38, max: 50 } },
    usHourly: { mid: 65.38, senior: 82.68 }
  },

  // ── Engineering & Architecture ────────────────────────────────────────────
  {
    category: 'Engineering & Architecture', role: 'Electrical Designer', soc: '17-3012',
    blsOccupation: 'Electrical and Electronics Drafters',
    hirably: { entry: { min: 20, max: 24 }, mid: { min: 24, max: 30 }, senior: { min: 30, max: 38 } },
    usHourly: { entry: 29.53, mid: 36.96, senior: 46.50 }
  },
  {
    category: 'Engineering & Architecture', role: 'Mechanical Designer', soc: '17-3013',
    blsOccupation: 'Mechanical Drafters',
    hirably: { entry: { min: 19, max: 23 }, mid: { min: 23, max: 28 }, senior: { min: 28, max: 35 } },
    usHourly: { entry: 27.93, mid: 34.40, senior: 41.41 }
  },
  {
    category: 'Engineering & Architecture', role: 'Civil / Structural Designer', soc: '17-3011',
    blsOccupation: 'Architectural and Civil Drafters',
    hirably: { entry: { min: 20, max: 24 }, mid: { min: 24, max: 29 }, senior: { min: 29, max: 35 } },
    usHourly: { entry: 26.76, mid: 31.80, senior: 38.88 }
  },
  {
    category: 'Engineering & Architecture', role: 'BIM / Revit Specialist', soc: '17-3011',
    blsOccupation: 'Architectural and Civil Drafters',
    hirably: { entry: { min: 20, max: 24 }, mid: { min: 24, max: 29 }, senior: { min: 29, max: 35 } },
    usHourly: { entry: 26.76, mid: 31.80, senior: 38.88 }
  },
  {
    category: 'Engineering & Architecture', role: 'CAD Drafter', soc: '17-3019',
    blsOccupation: 'Drafters, All Other',
    hirably: { entry: { min: 16, max: 20 }, mid: { min: 20, max: 26 }, senior: { min: 26, max: 32 } },
    usHourly: { entry: 24.83, mid: 30.54, senior: 38.32 }
  },
  {
    category: 'Engineering & Architecture', role: 'Architect / Architectural Designer', soc: '17-1011',
    blsOccupation: 'Architects, Except Landscape and Naval',
    hirably: { entry: { min: 18, max: 22 }, mid: { min: 22, max: 28 }, senior: { min: 28, max: 35 } },
    usHourly: { entry: 37.48, mid: 47.73, senior: 60.84 }
  },
  {
    category: 'Engineering & Architecture', role: 'Mechanical Engineer', soc: '17-2141',
    blsOccupation: 'Mechanical Engineers',
    hirably: { entry: { min: 20, max: 24 }, mid: { min: 24, max: 29 }, senior: { min: 29, max: 35 } },
    usHourly: { entry: 40.45, mid: 50.05, senior: 63.75 }
  },
  {
    category: 'Engineering & Architecture', role: 'Electrical Engineer', soc: '17-2071',
    blsOccupation: 'Electrical Engineers',
    hirably: { entry: { min: 21, max: 25 }, mid: { min: 25, max: 30 }, senior: { min: 30, max: 35 } },
    usHourly: { entry: 44.63, mid: 58.00, senior: 73.53 }
  },
  {
    category: 'Engineering & Architecture', role: 'MEP / HVAC Designer', soc: '17-3013',
    blsOccupation: 'Mechanical Drafters',
    hirably: { entry: { min: 20, max: 24 }, mid: { min: 24, max: 29 }, senior: { min: 29, max: 35 } },
    usHourly: { entry: 27.93, mid: 34.40, senior: 41.41 }
  },
  {
    category: 'Engineering & Architecture', role: 'Cost Estimator', soc: '13-1051',
    blsOccupation: 'Cost Estimators',
    hirably: { entry: { min: 16, max: 19 }, mid: { min: 19, max: 24 }, senior: { min: 24, max: 30 } },
    usHourly: { entry: 29.40, mid: 37.86, senior: 48.97 }
  },

  // ── Specialized Platforms ─────────────────────────────────────────────────
  {
    category: 'Specialized Platforms', role: 'Guidewire Developer', soc: '15-1252',
    blsOccupation: 'Software Developers',
    hirably: { mid: { min: 32, max: 40 }, senior: { min: 40, max: 50 } },
    usHourly: { mid: 65.38, senior: 82.68 }
  },
  {
    category: 'Specialized Platforms', role: 'NetSuite / ERP Specialist', soc: '15-1211',
    blsOccupation: 'Computer Systems Analysts',
    hirably: { mid: { min: 26, max: 32 }, senior: { min: 32, max: 40 } },
    usHourly: { mid: 50.89, senior: 64.48 }
  },
  {
    category: 'Specialized Platforms', role: 'Salesforce Administrator / Developer', soc: '15-1211',
    blsOccupation: 'Computer Systems Analysts',
    hirably: { entry: { min: 18, max: 22 }, mid: { min: 22, max: 28 }, senior: { min: 28, max: 38 } },
    usHourly: { entry: 39.84, mid: 50.89, senior: 64.48 }
  },
  {
    category: 'Specialized Platforms', role: 'Acumatica / Dynamics Developer', soc: '15-1252',
    blsOccupation: 'Software Developers',
    hirably: { mid: { min: 26, max: 32 }, senior: { min: 32, max: 40 } },
    usHourly: { mid: 65.38, senior: 82.68 }
  },
  {
    category: 'Specialized Platforms', role: 'Data Engineer', soc: '15-1243',
    blsOccupation: 'Database Architects',
    hirably: { mid: { min: 30, max: 38 }, senior: { min: 38, max: 50 } },
    usHourly: { mid: 67.07, senior: 81.39 }
  },
  {
    category: 'Specialized Platforms', role: 'Oracle Developer (Fusion / ERP)', soc: '15-1252',
    blsOccupation: 'Software Developers',
    hirably: { mid: { min: 32, max: 40 }, senior: { min: 40, max: 48 } },
    usHourly: { mid: 65.38, senior: 82.68 }
  },
  {
    category: 'Specialized Platforms', role: 'SAP Consultant', soc: '15-1211',
    blsOccupation: 'Computer Systems Analysts',
    hirably: { mid: { min: 30, max: 38 }, senior: { min: 38, max: 48 } },
    usHourly: { mid: 50.89, senior: 64.48 }
  },
  {
    category: 'Specialized Platforms', role: 'HubSpot / CRM Administrator', soc: '15-1211',
    blsOccupation: 'Computer Systems Analysts',
    hirably: { entry: { min: 16, max: 19 }, mid: { min: 19, max: 24 }, senior: { min: 24, max: 30 } },
    usHourly: { entry: 39.84, mid: 50.89, senior: 64.48 }
  },
  {
    category: 'Specialized Platforms', role: 'Workday / HRIS Specialist', soc: '15-1211',
    blsOccupation: 'Computer Systems Analysts',
    hirably: { mid: { min: 26, max: 32 }, senior: { min: 32, max: 40 } },
    usHourly: { mid: 50.89, senior: 64.48 }
  },
  {
    category: 'Specialized Platforms', role: 'ServiceNow Developer', soc: '15-1252',
    blsOccupation: 'Software Developers',
    hirably: { mid: { min: 28, max: 35 }, senior: { min: 35, max: 45 } },
    usHourly: { mid: 65.38, senior: 82.68 }
  },
];
