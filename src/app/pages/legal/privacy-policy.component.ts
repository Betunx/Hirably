import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-floral-white min-h-screen pt-[72px]">
      <div class="max-w-[820px] mx-auto px-4 sm:px-6 py-12 lg:py-16">

        <!-- Draft notice — remove once reviewed by legal counsel -->
        <div class="mb-8 rounded-[8px] border border-bright-amber/40 bg-bright-amber/10 px-4 py-3">
          <p class="font-body text-[13px] leading-[150%] text-navy-dark/80">
            <strong>Template — not legal advice.</strong> This page is a draft and must be
            reviewed by qualified legal counsel before launch.
          </p>
        </div>

        <h1 class="font-display font-semibold text-[32px] lg:text-[40px] leading-tight text-navy-dark mb-2">
          Privacy Policy
        </h1>
        <p class="font-body text-[13px] text-dark-purple/60 mb-10">Last updated: June 19, 2026</p>

        <div class="space-y-8 font-body text-[15px] leading-[160%] text-dark-purple/80">

          <section>
            <p>
              This Privacy Policy explains how Hirably ("Hirably", "we", "us") collects, uses,
              and protects information when you visit our website or contact us about our
              nearshore staffing and Employer of Record (EOR) services. By using our website,
              you agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">1. Information We Collect</h2>
            <p class="mb-3">When you submit a form or book a call, we may collect:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Contact details you provide (name, work email, phone number, company).</li>
              <li>Information about your hiring needs included in your message.</li>
              <li>Scheduling details when you book a call through our embedded Cal.com widget.</li>
              <li>Technical and usage data (IP address, browser, pages viewed) collected automatically.</li>
            </ul>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">2. How We Use Your Information</h2>
            <ul class="list-disc pl-5 space-y-1">
              <li>To respond to your inquiry and provide our services.</li>
              <li>To schedule and conduct calls and follow-ups.</li>
              <li>To improve our website and understand how it is used.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">3. Third-Party Services</h2>
            <p class="mb-3">We rely on trusted third parties to operate our website and process inquiries:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong>Formspree</strong> — processes form submissions and delivers them to us.</li>
              <li><strong>Cal.com</strong> — powers call scheduling via an embedded widget.</li>
              <li><strong>Google Analytics / Google Tag Manager</strong> — measures website usage.</li>
            </ul>
            <p class="mt-3">
              These providers process data under their own privacy policies. We do not sell your
              personal information.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">4. Cookies &amp; Analytics</h2>
            <p>
              Our website uses cookies and similar technologies through Google Tag Manager to
              analyze traffic and improve the experience. You can control cookies through your
              browser settings; disabling them may affect some functionality.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">5. Your Rights</h2>
            <p>
              Depending on where you live (including under the California Consumer Privacy Act
              and the EU General Data Protection Regulation), you may have the right to access,
              correct, delete, or restrict the use of your personal information, and to opt out
              of certain processing. To exercise these rights, contact us at the address below.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">6. Data Retention &amp; Security</h2>
            <p>
              We retain personal information only as long as necessary for the purposes described
              here or as required by law, and we apply reasonable safeguards to protect it. No
              method of transmission or storage is completely secure.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The "Last updated" date above
              reflects the latest revision.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">8. Contact Us</h2>
            <p>
              Questions about this policy? Email us at
              <a href="mailto:info@hirablystaffing.com" class="text-primary-blue underline hover:opacity-80">info&#64;hirablystaffing.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  `,
})
export class PrivacyPolicyComponent implements OnInit {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.titleService.setTitle('Privacy Policy — Hirably');
    this.meta.updateTag({ property: 'og:title', content: 'Privacy Policy — Hirably' });
    this.meta.updateTag({ property: 'og:description', content: 'How Hirably collects, uses, and protects your information.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://hirablystaffing.com/privacy-policy' });
  }
}
