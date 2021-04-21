import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
