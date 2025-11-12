import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main>
      <!-- Hero -->
      <app-hero-section></app-hero-section>

      <!-- 1. Who We Are (Services Section) -->
      <app-services-section></app-services-section>

      <!-- 2. How It Works (Timeline) -->
      <app-how-it-works-steps></app-how-it-works-steps>

      <!-- 3. Why Mexico (Feature Carousel with Benefits) -->
      <app-feature-carousel></app-feature-carousel>

      <!-- 4. World Class Talent Across (Roles Carousel) -->
      <app-roles-carousel></app-roles-carousel>

      <!-- 5. Hirably Advantage (Why Hirably) -->
      <app-why-hirably></app-why-hirably>

      <!-- 6. Our Prices (Pricing Section) -->
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
