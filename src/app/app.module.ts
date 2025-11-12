import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';

// Reusable UI components
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeatureCarouselComponent } from './components/feature-carousel/feature-carousel.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { HowItWorksStepsComponent } from './components/how-it-works-steps/how-it-works-steps.component';
import { RolesCarouselComponent } from './components/roles-carousel/roles-carousel.component';
import { PricingSectionComponent } from './components/pricing-section/pricing-section.component';
import { WhyHirablyComponent } from './components/why-hirably/why-hirably.component';

// Standalone components
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { SectionHeaderComponent } from './shared/components/section-header/section-header.component';
import { CtaButtonComponent } from './shared/components/cta-button/cta-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,

    // Reusable UI Components
    HeroSectionComponent,
    FeatureCarouselComponent,
    ServicesSectionComponent,
    HowItWorksStepsComponent,
    RolesCarouselComponent,
    PricingSectionComponent,
    WhyHirablyComponent
  ],
  imports: [
    BrowserModule, // BrowserModule ya incluye CommonModule
    HttpClientModule,
    FormsModule,
    // Standalone components compartidos
    ChatbotComponent,
    SectionHeaderComponent,
    CtaButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
