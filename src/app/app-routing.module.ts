import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/pages/home/home.component';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';
import { preprodOnlyGuard } from '@core/preprod-only.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Hirably — Hire World-Class Talent in Mexico'
  },
  {
    path: 'contact/:type',
    loadComponent: () => import('@app/pages/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: 'contact/:type/agendar',
    loadComponent: () => import('@app/pages/contact-form/booking-page.component').then(m => m.BookingPageComponent)
  },
  {
    path: 'roles/:departmentId',
    loadComponent: () => import('@app/pages/department/department-page.component').then(m => m.DepartmentPageComponent)
  },
  {
    path: 'careers',
    loadComponent: () => import('@app/pages/careers/careers-page.component').then(m => m.CareersPageComponent),
    title: 'Careers — Hirably'
  },
  {
    path: 'careers/admin',
    loadComponent: () => import('@app/pages/careers/careers-admin.component').then(m => m.CareersAdminComponent),
    title: 'Careers Admin — Hirably'
  },
  {
    path: 'careers/:id/apply',
    loadComponent: () => import('@app/pages/careers/careers-apply.component').then(m => m.CareersApplyComponent),
    title: 'Apply — Hirably'
  },
  // Legal pages are visible only on preproduction/local (preprodOnlyGuard → /404
  // on the production domain) until legal counsel approves publishing them. They
  // are also kept out of sitemap.xml so production does not advertise them.
  {
    path: 'privacy-policy',
    loadComponent: () => import('@app/pages/legal/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    canActivate: [preprodOnlyGuard],
    title: 'Privacy Policy — Hirably'
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('@app/pages/legal/terms-of-service.component').then(m => m.TermsOfServiceComponent),
    canActivate: [preprodOnlyGuard],
    title: 'Terms of Service — Hirably'
  },
  // DESIGN DRAFTS (style exploration, branch Chrystian/style-draft): alternative homepages for review.
  // preprodOnlyGuard → /404 on the production domain; the pages also set noindex.
  {
    path: 'draft-a',
    loadComponent: () => import('@app/pages/drafts/draft-a/draft-a.component').then(m => m.DraftAComponent),
    canActivate: [preprodOnlyGuard],
    title: 'Draft A (Big Type) — Hirably'
  },
  {
    path: 'draft-b',
    loadComponent: () => import('@app/pages/drafts/draft-b/draft-b.component').then(m => m.DraftBComponent),
    canActivate: [preprodOnlyGuard],
    title: 'Draft B (Software Product) — Hirably'
  },
  {
    path: 'draft-c',
    loadComponent: () => import('@app/pages/drafts/draft-c/draft-c.component').then(m => m.DraftCComponent),
    canActivate: [preprodOnlyGuard],
    title: 'Draft C (Bold Blocks) — Hirably'
  },
  { path: '404', component: NotFoundComponent, title: 'Page Not Found — Hirably' },
  { path: '**',  component: NotFoundComponent, title: 'Page Not Found — Hirably' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
