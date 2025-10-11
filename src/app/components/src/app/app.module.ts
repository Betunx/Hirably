// ====================================
// APP MODULE - Angular Module
// app.module.ts
// ====================================

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { StatsBarComponent } from './components/stats-bar/stats-bar.component';
import { RolesCarouselComponent } from './components/roles-carousel/roles-carousel.component';
import { TestimonialsCarouselComponent } from './components/testimonials-carousel/testimonials-carousel.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { WhyHirablyComponent } from './components/why-hirably/why-hirably.component';

import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroSectionComponent,
    StatsBarComponent,
    RolesCarouselComponent,
    TestimonialsCarouselComponent,
    HowItWorksComponent,
    WhyHirablyComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
