import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  words = ['Recruitment', 'Payroll', 'Compliance', 'HR'];
  currentWord = 'Recruitment';
  currentIndex = 0;
  private intervalId: any;

  dashboardStats = [
    { number: '24', label: 'Active Employees' },
    { number: '5', label: 'Job Openings' },
    { number: '$18.5k', label: 'Monthly Savings' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  ngOnInit(): void {
    this.startWordRotation();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startWordRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
      this.currentWord = this.words[this.currentIndex];
    }, 2500);
  }

  scrollToSection(anchor: string): void {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}