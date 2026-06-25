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
          Terms of Service
        </h1>
        <p class="font-body text-[13px] text-dark-purple/60 mb-10">Last updated: June 19, 2026</p>

        <div class="space-y-8 font-body text-[15px] leading-[160%] text-dark-purple/80">

          <section>
            <p>
              These Terms of Service ("Terms") govern your use of the Hirably website and your
              engagement with our nearshore staffing and Employer of Record (EOR) services
              ("Services"). By accessing our website or submitting an inquiry, you agree to these
              Terms.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">1. Our Services</h2>
            <p>
              Hirably connects companies with vetted talent in Mexico and provides recruitment,
              payroll, and compliance services. Specific scope, pricing, and deliverables are
              defined in a separate written agreement between you and Hirably. Website content is
              for general information and does not constitute an offer or binding commitment.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">2. Acceptable Use</h2>
            <p class="mb-3">You agree not to:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Use the website for any unlawful or fraudulent purpose.</li>
              <li>Submit false, misleading, or another person's information without authorization.</li>
              <li>Attempt to disrupt, reverse engineer, or gain unauthorized access to the website.</li>
            </ul>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">3. No Warranties</h2>
            <p>
              The website and its content are provided "as is" and "as available" without
              warranties of any kind, whether express or implied, including fitness for a
              particular purpose. We do not guarantee that the website will be uninterrupted,
              error-free, or secure.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">4. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Hirably shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of
              the website. Our liability relating to the Services is governed by the separate
              written agreement between the parties.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">5. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and the Hirably name
              and brand, is owned by Hirably or its licensors and may not be used without our
              prior written permission.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">6. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Arizona, United States,
              without regard to its conflict-of-laws rules. Any disputes shall be subject to the
              exclusive jurisdiction of the courts located in Arizona.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">7. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The "Last updated" date above reflects
              the latest revision. Continued use of the website after changes means you accept the
              updated Terms.
            </p>
          </section>

          <section>
            <h2 class="font-display font-semibold text-[20px] text-navy-dark mb-3">8. Contact Us</h2>
            <p>
              Questions about these Terms? Email us at
              <a href="mailto:hello@hirablystaffing.com" class="text-primary-blue underline hover:opacity-80">hello&#64;hirablystaffing.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  `,
})
export class TermsOfServiceComponent implements OnInit {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.titleService.setTitle('Terms of Service — Hirably');
    this.meta.updateTag({ property: 'og:title', content: 'Terms of Service — Hirably' });
    this.meta.updateTag({ property: 'og:description', content: 'The terms that govern use of the Hirably website and services.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://hirablystaffing.com/terms-of-service' });
  }
}
