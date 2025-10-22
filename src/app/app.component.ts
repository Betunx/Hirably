import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main>
      <!-- Hero & Stats -->
      <app-hero-section></app-hero-section>
      <app-stats-bar></app-stats-bar>

      <!-- Features & Services -->
      <app-feature-carousel></app-feature-carousel>
      <app-services-section></app-services-section>

      <!-- How It Works -->
      <app-how-it-works-steps></app-how-it-works-steps>

      <!-- Roles & Testimonials -->
      <app-roles-carousel></app-roles-carousel>
      <app-testimonials-carousel></app-testimonials-carousel>

      <!-- Why Hirably/Mexico -->
      <app-why-hirably></app-why-hirably>

      <!-- Pricing -->
      <app-pricing-section></app-pricing-section>
    </main>
    <app-footer></app-footer>

    <!-- Chatbot flotante (disponible en toda la aplicación) -->
    <app-chatbot></app-chatbot>
  `,
  styles: []
})
export class AppComponent {
  title = 'hirably';
}
