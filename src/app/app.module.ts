import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { InputComponent } from './Components/input/input.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SocialBarComponent } from './Components/social-bar/social-bar.component';
import { PostCardComponent } from './Components/post-card/post-card.component';
import { SearchInputComponent } from './Components/search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardPageComponent } from './Pages/dashboard-page/dashboard-page.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DashboardCardComponent } from './Components/dashboard-card/dashboard-card.component';
import { ManageProductsComponent } from './Pages/manage-products-page/manage-products-page.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { CompaniesPageComponent } from './Pages/companies-page/companies-page.component';
import { ReplaceNullPipe } from './Pipes/replace-null.pipe';
import { CompanyDetailComponent } from './Pages/company-detail/company-detail.component';
import {registerLocaleData} from '@angular/common';
import { CategoriesPageComponent } from './Pages/categories-page/categories-page.component';
import { CategoryDetailComponent } from './Pages/category-detail/category-detail.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InputComponent,
    NavbarComponent,
    FooterComponent,
    SocialBarComponent,
    PostCardComponent,
    SearchInputComponent,
    DashboardPageComponent,
    SidebarComponent,
    DashboardCardComponent,
    ManageProductsComponent,
    ProductDetailComponent,
    CompaniesPageComponent,
    ReplaceNullPipe,
    CompanyDetailComponent,
    CategoriesPageComponent,
    CategoryDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
