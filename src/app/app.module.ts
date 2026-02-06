import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Core
import { NavbarComponent } from '@core/navbar/navbar.component';
import { FooterComponent } from '@core/footer/footer.component';

// Pages
import { HomeComponent } from '@app/pages/home/home.component';

// Section components
import { HeroSectionComponent } from '@components/hero-section/hero-section.component';
import { WhyNearshoreComponent } from '@components/why-nearshore/why-nearshore.component';
import { ServicesSectionComponent } from '@components/services-section/services-section.component';
import { HowItWorksStepsComponent } from '@components/how-it-works-steps/how-it-works-steps.component';
import { RolesSectionComponent } from '@components/roles-section/roles-section.component';
import { PricingSectionComponent } from '@components/pricing-section/pricing-section.component';
import { WhyHirablyComponent } from '@components/why-hirably/why-hirably.component';

// Standalone components
import { AllIncludedPlatformComponent } from '@components/all-included-platform/all-included-platform.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HeroSectionComponent,
    WhyNearshoreComponent,
    ServicesSectionComponent,
    HowItWorksStepsComponent,
    RolesSectionComponent,
    PricingSectionComponent,
    WhyHirablyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AllIncludedPlatformComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
