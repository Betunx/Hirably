import {
  AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, NgZone, Output, inject, signal
} from '@angular/core';
import { NgClass } from '@angular/common';
import { A_ANY_ROLE } from './draft-a-copy';

/** How long each role stays before the next one fades in. */
const CYCLE_MS = 2400;

/**
 * DESIGN DRAFT A ONLY. "Any role": a big line whose role cycles (general to specialized) and a button
 * that scrolls to the calculator (the Draft A page handles the scroll).
 *
 * Layout stability: all six roles sit in one grid cell, so the cell keeps the size of the longest one and
 * nothing moves when the word changes. The heading is sized so the longest name fits one line at every
 * width (see .ar-title), so exactly one line is reserved and "Hirably." sits right under the role. Reduced motion: no cycling; the six
 * roles are shown as a static list.
 */
@Component({
  selector: 'app-draft-any-role',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    /* Same scale as the other big headings (36-80px), but never wider than the screen allows for the
       longest role ("Customer Support Rep?" is ~10.4em), so every role stays on ONE line at every width. */
    .ar-title {
      font-size: min(clamp(36px, 5.6vw, 80px), calc((100vw - 3rem) / 10.8));
      line-height: 1;
      letter-spacing: -0.03em;
    }
  `],
  template: `
    <section id="any-role" class="bg-white py-20 lg:py-32">
      <div class="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <p class="text-[14px] font-semibold uppercase tracking-[0.12em] text-[#4A5068]">{{ copy.eyebrow }}</p>

        <h2 class="ar-title mt-5 font-sans font-extrabold text-[#102076]">
          <span class="sr-only">{{ copy.lead }} {{ staticList }}? {{ copy.tail }}</span>
          <span aria-hidden="true" class="block">
            <span class="block">{{ copy.lead }}</span>
            <!-- Cycling role (hidden when the visitor prefers reduced motion) -->
            <span class="grid motion-reduce:hidden">
              @for (role of copy.cycle; track role; let i = $index) {
              <span class="[grid-area:1/1] text-[#2291EA] transition-[opacity,transform] duration-500 ease-out"
                [ngClass]="i === index() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[0.2em]'">{{ role }}?</span>
              }
            </span>
            <!-- Static roles (reduced motion) -->
            <span class="hidden motion-reduce:block my-2 text-[24px] sm:text-[32px] leading-[1.25] tracking-[-0.02em] text-[#2291EA]">{{ staticList }}?</span>
            <span class="block">{{ copy.tail }}</span>
          </span>
        </h2>

        <p class="mt-6 lg:mt-8 max-w-[680px] text-[18px] lg:text-[21px] leading-[1.5] text-[#4A5068]">{{ copy.support }}</p>


        <button type="button" (click)="seeRate.emit()"
          class="mt-8 lg:mt-10 inline-flex items-center justify-center rounded-full bg-[#102076] text-white px-7 py-4 text-[16px] font-semibold border-none cursor-pointer transition-opacity hover:opacity-90">
          {{ copy.cta }}
        </button>
      </div>
    </section>
  `
})
export class DraftAnyRoleComponent implements AfterViewInit {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  /** "See your rate": scroll to the calculator. */
  @Output() readonly seeRate = new EventEmitter<void>();

  readonly copy = A_ANY_ROLE;
  readonly index = signal(0);
  readonly staticList = A_ANY_ROLE.cycle.slice(0, -1).join(', ') + ', or ' + A_ANY_ROLE.cycle[A_ANY_ROLE.cycle.length - 1];

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Cycle only while the section is on screen.
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => { clearInterval(timer); timer = undefined; };
    this.zone.runOutsideAngular(() => {
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(() => this.zone.run(() => this.index.update(i => (i + 1) % this.copy.cycle.length)), CYCLE_MS);
        } else if (!entry.isIntersecting) {
          stop();
        }
      });
      io.observe(this.host.nativeElement);
      this.destroyRef.onDestroy(() => { io.disconnect(); stop(); });
    });
  }
}
