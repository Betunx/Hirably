import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type DraftIconName =
  | 'search' | 'users' | 'check' | 'shield' | 'file' | 'laptop' | 'chat' | 'refresh' | 'infinity'
  | 'dollar' | 'calendar' | 'clock' | 'globe' | 'award' | 'arrow' | 'tick';

/** DESIGN DRAFTS ONLY. One monochrome line-icon set (24px grid, 1.6 stroke, currentColor). */
@Component({
  selector: 'app-draft-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex flex-shrink-0', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="stroke" stroke-linecap="round"
      stroke-linejoin="round" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      @switch (name) {
        @case ('search') { <circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /> }
        @case ('users') {
          <circle cx="9" cy="8.5" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          <path d="M15.5 5.3a3.3 3.3 0 0 1 0 6.4" /><path d="M17.5 14.3c2.4.6 4 2.6 4 5.7" />
        }
        @case ('check') { <circle cx="12" cy="12" r="9" /><path d="M8 12.4l2.8 2.8L16.2 9.6" /> }
        @case ('shield') {
          <path d="M12 3l7.5 3v5.6c0 4.5-3.2 8.2-7.5 9.4-4.3-1.2-7.5-4.9-7.5-9.4V6L12 3z" />
          <path d="M8.8 12.1l2.3 2.3 4.2-4.4" />
        }
        @case ('file') {
          <path d="M6 3.5h8l4 4v13H6z" /><path d="M14 3.5v4h4" /><path d="M9 12h6M9 15.5h6M9 8.5h2" />
        }
        @case ('laptop') { <rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19.5h20" /> }
        @case ('chat') {
          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9.5L4 20z" />
          <path d="M8.5 9h7M8.5 12h4.5" />
        }
        @case ('refresh') {
          <path d="M19.5 10.5A7.7 7.7 0 0 0 5.8 7.2L4.5 8.6" /><path d="M4.5 4.5v4.1h4.1" />
          <path d="M4.5 13.5a7.7 7.7 0 0 0 13.7 3.3l1.3-1.4" /><path d="M19.5 19.5v-4.1h-4.1" />
        }
        @case ('infinity') {
          <path d="M12 12c-1.8-2.3-3.3-3.5-5-3.5a3.5 3.5 0 0 0 0 7c1.7 0 3.2-1.2 5-3.5zm0 0c1.8 2.3 3.3 3.5 5 3.5a3.5 3.5 0 0 0 0-7c-1.7 0-3.2 1.2-5 3.5z" />
        }
        @case ('dollar') {
          <circle cx="12" cy="12" r="9" />
          <path d="M14.7 9.3c-.5-1-1.5-1.6-2.7-1.6-1.6 0-2.7.9-2.7 2.1 0 2.9 5.6 1.5 5.6 4.4 0 1.3-1.2 2.2-2.9 2.2-1.3 0-2.4-.6-2.9-1.6M12 6.2v1.5M12 16.4v1.4" />
        }
        @case ('calendar') {
          <rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" />
        }
        @case ('clock') { <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /> }
        @case ('globe') {
          <circle cx="12" cy="12" r="9" /><path d="M3 12h18" />
          <path d="M12 3c2.4 2.6 3.7 5.6 3.7 9s-1.3 6.4-3.7 9c-2.4-2.6-3.7-5.6-3.7-9S9.6 5.6 12 3z" />
        }
        @case ('award') { <circle cx="12" cy="9" r="5.5" /><path d="M8.6 13.4L7.3 21l4.7-2.5 4.7 2.5-1.3-7.6" /> }
        @case ('arrow') { <path d="M5 12h14M13 6l6 6-6 6" /> }
        @case ('tick') { <path d="M5 12.5l4.5 4.5L19 7.5" /> }
      }
    </svg>
  `
})
export class DraftIconComponent {
  @Input({ required: true }) name!: DraftIconName;
  @Input() stroke = 1.6;
}
