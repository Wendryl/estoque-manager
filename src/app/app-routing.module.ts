import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {CompaniesPageComponent} from './Pages/companies-page/companies-page.component';
import {CompanyDetailComponent} from './Pages/company-detail/company-detail.component';
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
    path: 'dashboard/new-company',
    component: CompanyDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/companies',
    component: CompaniesPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/companies/:id',
    component: CompanyDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/*',
    redirectTo: 'dashboard',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
