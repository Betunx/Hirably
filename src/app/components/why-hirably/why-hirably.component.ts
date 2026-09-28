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
      title: 'Background-Checked & Verified',
      description: 'Live interviews, verified identity and references. Every candidate, before you ever meet them.',
      borderColor: '#FFF1CF'
    },
    {
      title: 'Month-to-Month',
      description: 'No lock-ins, no fine print. Scale up, down, or out with 30 days\' notice.',
      borderColor: '#FFF1CF'
    },
    {
      title: 'Candidates in <5 Days',
      description: 'We move at the speed of your roadmap. Receive a shortlist of qualified, pre-vetted candidates in less than a business week.',
      borderColor: '#E3E1FF'
    },
    {
      title: 'North American Standards',
      description: 'Same time zones. Same business culture. Your team integrates seamlessly into your workflow from Day 1. Not Day 90.',
      borderColor: '#D1FAE5'
    }
  ];
}
