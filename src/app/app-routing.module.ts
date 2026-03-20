import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/pages/home/home.component';
import { ContactFormComponent } from '@app/pages/contact-form/contact-form.component';
import { DepartmentPageComponent } from '@app/pages/department/department-page.component';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '',                  component: HomeComponent,          title: 'Hirably — Hire World-Class Talent in Mexico' },
  { path: 'contact/book-a-call',   component: ContactFormComponent, title: 'Book a Discovery Call — Hirably' },
  { path: 'contact/start-hiring',  component: ContactFormComponent, title: 'Start Hiring — Hirably' },
  { path: 'contact/eor-services',  component: ContactFormComponent, title: 'EOR Services — Hirably' },
  { path: 'contact/get-a-quote',   component: ContactFormComponent, title: 'Get a Quote — Hirably' },
  { path: 'contact/:type',         component: ContactFormComponent, title: 'Contact — Hirably' },
  { path: 'roles/technology',      component: DepartmentPageComponent, title: 'Technology & Engineering Roles — Hirably' },
  { path: 'roles/finance',         component: DepartmentPageComponent, title: 'Finance & Accounting Roles — Hirably' },
  { path: 'roles/sales',           component: DepartmentPageComponent, title: 'Sales & Customer Support Roles — Hirably' },
  { path: 'roles/marketing',       component: DepartmentPageComponent, title: 'Marketing Roles — Hirably' },
  { path: 'roles/operations',      component: DepartmentPageComponent, title: 'Operations Roles — Hirably' },
  { path: 'roles/:departmentId',   component: DepartmentPageComponent, title: 'Roles — Hirably' },
  { path: '404',                   component: NotFoundComponent,    title: 'Page Not Found — Hirably' },
  { path: '**',                    component: NotFoundComponent,    title: 'Page Not Found — Hirably' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
