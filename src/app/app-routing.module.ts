import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import { DashboardPageComponent } from './Pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import {ManageProductsComponent} from './Pages/manage-products-page/manage-products-page.component';
import {ProductDetailComponent} from './Pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/manage-products',
    component: ManageProductsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/manage-products/:id',
    component: ProductDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/new-product',
    component: ProductDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
