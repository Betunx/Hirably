import { Component, ChangeDetectionStrategy } from '@angular/core';

interface AdvantageCard {
  title: string;
  description: string;
  borderColor: string;
}

@Component({
  selector: 'app-why-hirably',
  templateUrl: './why-hirably.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhyHirablyComponent {
  // Figma order (3×2 grid, left-to-right, top-to-bottom)
  // Border colors: Row1 lavender/mint/cream, Row2 cream/lavender/mint
  readonly cards: AdvantageCard[] = [
    {
      title: 'Lifetime Protection',
      description: 'If your employee leaves for any reason\u2014at any time\u2014we recruit their replacement for free. You never pay for the same role twice.',
      borderColor: '#E3E1FF'
    },
    {
      title: '$0 Upfront',
      description: '$0 Onboarding. No recruitment fees. No setup fees. You don\'t pay a single cent until your new team member officially starts working.',
      borderColor: '#D1FAE5'
    },
    {
      title: 'Risk-Free Trial',
      description: 'If the fit isn\'t right within the first 90 days, we replace the candidate at no cost. We back our vetting with skin in the game.',
      borderColor: '#FFF1CF'
    },
    {
      title: 'Month-to-Month',
      description: 'Flexibility No long-term lock-ins. Our service is strictly month-to-month, giving you the freedom to scale your team up or down instantly.',
      borderColor: '#FFF1CF'
    },
    {
      title: 'Candidates in <5 Days',
      description: 'Days We move at the speed of your roadmap. Receive a shortlist of qualified, pre-vetted candidates in less than a business week.',
      borderColor: '#E3E1FF'
    },
    {
      title: 'North American Standards',
      description: 'Same time zones. Same business culture. Your team integrates seamlessly into your workflow from Day 1. Not Day 90.',
      borderColor: '#D1FAE5'
    }
  ];

  trackByTitle(_index: number, item: AdvantageCard): string {
    return item.title;
  }
}
