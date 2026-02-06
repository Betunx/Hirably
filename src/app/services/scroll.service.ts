import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  scrollToId(elementId: string, block: ScrollLogicalPosition = 'start'): void {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: block
      });
    }
  }
}
