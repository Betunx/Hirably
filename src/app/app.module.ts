import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';

// Pages
import { HomeComponent } from './pages/home/home.component';

// Reusable UI components
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeatureCarouselComponent } from './components/feature-carousel/feature-carousel.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { HowItWorksStepsComponent } from './components/how-it-works-steps/how-it-works-steps.component';
import { RolesCarouselComponent } from './components/roles-carousel/roles-carousel.component';
import { PricingSectionComponent } from './components/pricing-section/pricing-section.component';
import { WhyHirablyComponent } from './components/why-hirably/why-hirably.component';

// Section containers
import { SectionOnePlatformProcessComponent } from './components/sections/section-one-platform-process/section-one-platform-process.component';
import { SectionTwoMexicoAdvantageComponent } from './components/sections/section-two-mexico-advantage/section-two-mexico-advantage.component';
import { SectionThreeValuePricingComponent } from './components/sections/section-three-value-pricing/section-three-value-pricing.component';

// Standalone components
import { SectionHeaderComponent } from './shared/components/section-header/section-header.component';
import { CtaButtonComponent } from './shared/components/cta-button/cta-button.component';
import { MeetUsComponent } from './components/meet-us/meet-us.component';
import { AllIncludedPlatformComponent } from './components/all-included-platform/all-included-platform.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,

    // Pages
    HomeComponent,

    // Reusable UI Components
    HeroSectionComponent,
    FeatureCarouselComponent,
    ServicesSectionComponent,
    HowItWorksStepsComponent,
    RolesCarouselComponent,
    PricingSectionComponent,
    WhyHirablyComponent,

    // Section Containers
    SectionOnePlatformProcessComponent,
    SectionTwoMexicoAdvantageComponent,
    SectionThreeValuePricingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SectionHeaderComponent,
    CtaButtonComponent,
    MeetUsComponent,
    AllIncludedPlatformComponent,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
