import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MeetUsComponent } from './components/meet-us/meet-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meet-us', component: MeetUsComponent },
  { path: '**', redirectTo: '' } // Redirect unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled', // Manejamos el scroll manualmente
    anchorScrolling: 'disabled', // Manejamos el scroll a anchors manualmente
    scrollOffset: [0, 80] // Offset para el navbar fixed
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
