import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Modules/Auth/login/login.component';
import { RegisterComponent } from './Modules/Auth/register/register.component';
import { ResetPasswordComponent } from './Modules/Auth/reset-password/reset-password.component';
 

const routes: Routes = [

  { path: '', redirectTo: '/Login', pathMatch: 'full' },

  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Reset-Password/:token', component: ResetPasswordComponent },
  
  {
    path: 'Home',
    loadChildren: () => import('./Modules/Pages/pages.module').then(m => m.PagesModule)
  },

  { path: '**', redirectTo: '/Login', pathMatch: 'full' }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class RoutingModule { }
