import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './Pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import {ManageProductsComponent} from './Pages/manage-products-page/manage-products-page.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'products',
    component: ProductPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'dashboard/manage-products',
    component: ManageProductsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
