import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
    </main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'hirably';
}
