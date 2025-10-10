import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { WhoWeAreComponent } from './features/who-we-are/who-we-are.component';
import { HowItWorksComponent } from './features/how-it-works/how-it-works.component';
import { WhyMexicoComponent } from './features/why-mexico/why-mexico.component';
import { PricingComponent } from './features/pricing/pricing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    WhoWeAreComponent,
    HowItWorksComponent,
    WhyMexicoComponent,
    PricingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
