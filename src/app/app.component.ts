import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-who-we-are></app-who-we-are>
      <app-how-it-works></app-how-it-works>
      <app-why-mexico></app-why-mexico>
      <app-pricing></app-pricing>
    </main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'hirably';
}
