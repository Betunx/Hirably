import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChildren, QueryList, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '@services/data.service';
import { Step } from '@models';
import { BaseDataComponent } from '@shared/base/base-data.component';

@Component({
  selector: 'app-how-it-works-steps',
  templateUrl: './how-it-works-steps.component.html',
  styleUrls: ['./how-it-works-steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowItWorksStepsComponent extends BaseDataComponent implements AfterViewInit, OnDestroy {
  steps: Step[] = [];

  @ViewChildren('processStep') processSteps!: QueryList<ElementRef>;
  @ViewChild('timelineProgress') timelineProgress!: ElementRef;

  private observer?: IntersectionObserver;

  constructor(private dataService: DataService) {
    super();
  }

  protected override loadData(): void {
    this.steps = this.dataService.getHowItWorksSteps();
  }

  ngAfterViewInit(): void {
    this.initIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Remove scroll event listener
    window.removeEventListener('scroll', () => this.updateTimelineOnScroll());
  }

  private initIntersectionObserver(): void {
    // Set up scroll event listener for timeline progress animation
    window.addEventListener('scroll', () => this.updateTimelineOnScroll());

    // Set up intersection observer for step visibility
    const options = {
      root: null,
      rootMargin: '-15% 0px -15% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const stepElement = entry.target as HTMLElement;
        const nodeIcon = stepElement.querySelector('.node-icon');
        const nodeContents = stepElement.querySelectorAll('.node-content');

        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          // Activate node icon
          if (nodeIcon) {
            nodeIcon.classList.add('active');
          }

          // Fade in all content boxes (left and right)
          nodeContents.forEach((nodeContent) => {
            nodeContent.classList.remove('translate-y-4', 'opacity-0');
            nodeContent.classList.add('opacity-100', 'translate-y-0');
          });
        } else {
          // Deactivate when out of view
          if (nodeIcon) {
            nodeIcon.classList.remove('active');
          }

          // Reset content - fade out when scrolling away
          nodeContents.forEach((nodeContent) => {
            nodeContent.classList.remove('opacity-100', 'translate-y-0');
            nodeContent.classList.add('translate-y-4', 'opacity-0');
          });
        }
      });
    }, options);

    // Observe all process steps
    this.processSteps.forEach(step => {
      this.observer?.observe(step.nativeElement);
    });
  }

  private updateTimelineOnScroll(): void {
    if (!this.timelineProgress || !this.timelineProgress.nativeElement) return;

    const processContainer = this.timelineProgress.nativeElement.closest('.process-container');
    if (!processContainer) return;

    const containerRect = processContainer.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;
    const containerHeight = processContainer.offsetHeight;

    // Calculate scrolled distance within container bounds
    const scrolledDistance = window.scrollY - (containerTop - window.innerHeight * 0.5);

    // Calculate progress percentage
    const totalScrollDistance = containerHeight + (window.innerHeight * 0.5);
    let progressPercentage = Math.max(0, Math.min(100, (scrolledDistance / totalScrollDistance) * 100));

    // Update timeline height
    this.timelineProgress.nativeElement.style.height = `${progressPercentage}%`;
  }

  getCategoryColorClass(category?: string): string {
    const colorMap: { [key: string]: string } = {
      'Recruitment': 'muted-blue',
      'Onboarding': 'pastel-purple',
      'HR & Support': 'pastel-yellow',
      'Finance & Reporting': 'pastel-green-soft'
    };
    return category ? colorMap[category] || 'gray-500' : 'gray-500';
  }

  getIconPath(iconName: string): string {
    const iconPaths: { [key: string]: string } = {
      'discovery': 'M10 9a3 3 0 100-6 3 3 0 000 6zM9.01 11.53c.094.394.254.774.47 1.127l1.01 1.649.006-.01c.214-.343.37-.714.47-1.111.002-.007.004-.015.005-.022A4.502 4.502 0 0112 10a1 1 0 011-1h1.5a1 1 0 010 2H13.6a6.51 6.51 0 00-.51 2.398c-.12.505-.285 1.001-.486 1.47l-.988 1.977a.5.5 0 01-.448.275H8.71a.5.5 0 01-.448-.275l-.988-1.977a6.505 6.505 0 00-.486-1.47A6.513 6.513 0 006.4 11H5a1 1 0 010-2h1.5a1 1 0 011 1 4.502 4.502 0 01.523 1.53z',
      'shortlist': 'M7 10a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z',
      'interviews': 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 16a4 4 0 014-4h4a4 4 0 014 4v2h-2v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H6v-2z',
      'contracts': 'M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1.5 6a1 1 0 011-1h6a1 1 0 110 2H6.5a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H6.5a1 1 0 01-1-1z',
      'compliance': 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
      'equipment': 'M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707l-.707-.707V8a6 6 0 00-6-6zM5 15h10v2H5v-2z',
      'hr': 'M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 6a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6z',
      'pto': 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z',
      'portal': 'M10 4a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V6a2 2 0 00-2-2h-2zM4 16h12a2 2 0 002-2v-4a2 2 0 00-2-2H4a2 2 0 00-2 2v4a2 2 0 002 2z',
      'payroll': 'M8 1a1 1 0 011-1h2a1 1 0 011 1h2a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V3a2 2 0 012-2zM9 14h2a1 1 0 000-2H9a1 1 0 000 2z',
      'billing': 'M12 4c0-1.104-.896-2-2-2s-2 .896-2 2v2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2h-2V4zM7 8h6v2H7V8z',
      'reporting': 'M16 10a6 6 0 11-12 0 6 6 0 0112 0zm-8-3a1 1 0 011 1v4a1 1 0 01-2 0V8a1 1 0 011-1z'
    };
    return iconPaths[iconName] || iconPaths['discovery'];
  }

  getClipPath(stepNumber: number): string {
    const clipPaths: { [key: number]: string } = {
      1: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)',           // Inclinado hacia la derecha
      2: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)',           // Inclinado hacia la izquierda
      3: 'polygon(1% 5%, 99% 0%, 100% 95%, 0% 100%)',            // Diagonal suave
      4: 'polygon(0% 3%, 100% 0%, 99% 97%, 1% 100%)',            // Diagonal inversa
      5: 'polygon(3% 0%, 100% 2%, 97% 100%, 0% 98%)',            // Asimétrico derecha
      6: 'polygon(0% 2%, 97% 0%, 100% 98%, 3% 100%)',            // Asimétrico izquierda
      7: 'polygon(2% 3%, 98% 0%, 100% 97%, 0% 100%)'             // Combinado
    };
    return clipPaths[stepNumber] || clipPaths[1];
  }
}