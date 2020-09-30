import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ROUTES } from './constants/app.constants';

const routes: Routes = [
  { path: ROUTES.home, component: HomeComponent },
  { path: '**', redirectTo: ROUTES.home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
