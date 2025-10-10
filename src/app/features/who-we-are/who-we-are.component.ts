import { Component } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  number: string;
  label: string;
}

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss']
})
export class WhoWeAreComponent {
  features: Feature[] = [
    {
      icon: '🎯',
      title: 'Recruitment Without Upfront Fees',
      description: 'We pre-vet, interview, and screen top Mexican talent so you only meet qualified candidates. You pick & choose.'
    },
    {
      icon: '✓',
      title: 'Full Compliance & Payroll',
      description: 'Contracts, taxes, and benefits are handled locally to keep you protected and your employees satisfied.'
    },
    {
      icon: '🚀',
      title: 'Onboarding & HR Support',
      description: 'From equipment to payroll and day-to-day HR, we make sure your team is set up for success from day one.'
    }
  ];

  stats: Stat[] = [
    { number: '60%', label: 'Average Payroll Savings' },
    { number: '3 Days', label: 'To Pre-Vetted Candidates' },
    { number: '∞', label: 'Lifetime Replacement' },
    { number: '0', label: 'Month Commitment' }
  ];
}
