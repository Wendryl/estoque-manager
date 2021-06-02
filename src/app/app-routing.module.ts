import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard} from './auth.guard';
import { CategoriesPageComponent } from './Pages/categories-page/categories-page.component';
import { CategoryDetailComponent } from './Pages/category-detail/category-detail.component';
import { CompaniesPageComponent } from './Pages/companies-page/companies-page.component';
import { CompanyDetailComponent } from './Pages/company-detail/company-detail.component';
import { DashboardPageComponent } from './Pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { ManageProductsComponent } from './Pages/manage-products-page/manage-products-page.component';
import { NewSalePageComponent } from './Pages/new-sale-page/new-sale-page.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { UserDetailComponent } from './Pages/user-detail/user-detail.component';
import { UsersPageComponent } from './Pages/users-page/users-page.component';

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
    path: 'dashboard/categories',
    component: CategoriesPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/categories/:id',
    component: CategoryDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/new-category',
    component: CategoryDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/users',
    component: UsersPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/users/:id',
    component: UserDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/new-user',
    component: UserDetailComponent,
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
  },
  {
    path: 'new-sale',
    component: NewSalePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
