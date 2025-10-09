import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
