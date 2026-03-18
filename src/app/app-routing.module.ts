import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/pages/home/home.component';
import { ContactFormComponent } from '@app/pages/contact-form/contact-form.component';
import { DepartmentPageComponent } from '@app/pages/department/department-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact/:type', component: ContactFormComponent },
  { path: 'roles/:departmentId', component: DepartmentPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
