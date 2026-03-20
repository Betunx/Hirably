import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/pages/home/home.component';
import { ContactFormComponent } from '@app/pages/contact-form/contact-form.component';
import { DepartmentPageComponent } from '@app/pages/department/department-page.component';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '',                  component: HomeComponent,          title: 'Hirably — Hire World-Class Talent in Mexico' },
  { path: 'contact/:type',     component: ContactFormComponent },
  { path: 'roles/:departmentId', component: DepartmentPageComponent },
  { path: '404',               component: NotFoundComponent,      title: 'Page Not Found — Hirably' },
  { path: '**',                component: NotFoundComponent,      title: 'Page Not Found — Hirably' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
