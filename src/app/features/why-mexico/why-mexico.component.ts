import { Component } from '@angular/core';

interface RoleCard {
  icon: string;
  title: string;
}

interface Benefit {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-why-mexico',
  templateUrl: './why-mexico.component.html',
  styleUrls: ['./why-mexico.component.scss']
})
export class WhyMexicoComponent {
  roleCards: RoleCard[] = [
    { icon: '🧮', title: 'Your Accountant' },
    { icon: '⚙️', title: 'Your Engineer' },
    { icon: '🎧', title: 'Your Support Rep' }
  ];

  benefits: Benefit[] = [
    {
      icon: '🕐',
      title: 'Same Time Zones',
      text: 'Real-time collaboration'
    },
    {
      icon: '🎓',
      title: 'Skilled Workforce',
      text: 'Educated, bilingual talent'
    },
    {
      icon: '💰',
      title: '60% Cost Savings',
      text: 'Competitive salaries'
    },
    {
      icon: '🗣️',
      title: 'Cultural Alignment',
      text: 'Smooth communication'
    }
  ];
}
