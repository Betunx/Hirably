import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  services = [
    'Recruitment & Headhunting',
    'Payroll & Compliance',
    'Employer of Record (EOR)',
    'HR & Onboarding Support'
  ];

  siteLinks = [
    { label: 'Home', url: '#home' },
    { label: 'How Hirably Works', url: '#how-it-works' },
    { label: 'Why Mexico?', url: '#why-mexico' },
    { label: 'Contact Us', url: '#contact' },
    { label: 'Pricing', url: '#pricing' }
  ];

  // Figma Design Exacto - Contact Info
  contactInfo = [
    { icon: '📞', text: '+1 623 123 4569', link: 'tel:+16231234569' },
    { icon: '📧', text: 'info@hirably.com', link: 'mailto:info@hirably.com' },
    { icon: '📍', text: 'Phoenix, Arizona | Hermosillo, Mexico', link: '' }
  ];
}
