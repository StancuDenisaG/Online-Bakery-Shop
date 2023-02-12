import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterFormComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard],
  data: { authGuardPipe: () => redirectUnauthorizedTo(['login'])}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
