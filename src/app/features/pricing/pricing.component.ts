import { Component } from '@angular/core';

interface PricingPlan {
  name: string;
  range: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  buttonText: string;
  buttonClass: string;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  plans: PricingPlan[] = [
    {
      name: 'Starter',
      range: '1–3 hires',
      price: '$11',
      period: 'per employee',
      features: [
        'Free recruitment',
        'Month-to-month contract',
        'Lifetime replacement guarantee',
        'Dedicated account manager',
        'Full compliance & payroll'
      ],
      buttonText: 'Get Started',
      buttonClass: 'btn-primary'
    },
    {
      name: 'Growth',
      range: '5–10 hires',
      price: 'Custom',
      period: 'volume pricing',
      features: [
        'Everything in Starter',
        'Scaled support for teams',
        'Cost-efficient pricing',
        'Priority support',
        'Quarterly business reviews'
      ],
      featured: true,
      badge: 'Most Popular',
      buttonText: 'Get Started',
      buttonClass: 'btn-featured'
    },
    {
      name: 'Scale',
      range: '10+ hires',
      price: 'Custom',
      period: 'enterprise pricing',
      features: [
        'Everything in Growth',
        'Custom pricing & terms',
        'Priority recruiter allocation',
        'Dedicated success manager',
        'Custom integrations'
      ],
      buttonText: 'Contact Sales',
      buttonClass: 'btn-primary'
    }
  ];
}
