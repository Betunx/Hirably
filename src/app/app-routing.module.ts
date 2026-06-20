import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/pages/home/home.component';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';

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
    path: 'roles/:departmentId',
    loadComponent: () => import('@app/pages/department/department-page.component').then(m => m.DepartmentPageComponent)
  },
  // TEMP: legal routes disabled until the pages are reviewed. The components still
  // exist; restore these two route blocks (and the footer links) once approved.
  // {
  //   path: 'privacy-policy',
  //   loadComponent: () => import('@app/pages/legal/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  //   title: 'Privacy Policy — Hirably'
  // },
  // {
  //   path: 'terms-of-service',
  //   loadComponent: () => import('@app/pages/legal/terms-of-service.component').then(m => m.TermsOfServiceComponent),
  //   title: 'Terms of Service — Hirably'
  // },
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
