import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from "@auth0/angular-jwt";
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { HeaderComponent } from './_components/header/header.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthenticationService } from './_services/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterUserComponent } from './_components/register-user/register-user.component';
import { ProductslistComponent } from './_components/_products/productslist/productslist.component';
import { AddproductsComponent } from './_components/_products/addproducts/addproducts.component';
import { EditProductsComponent } from './_components/_products/edit-products/edit-products.component';
import { ViewProductComponent } from './_components/_products/view-product/view-product.component';
import { OrderlistComponent } from './_components/_orders/orderlist/orderlist.component';
import { EditorderComponent } from './_components/_orders/editorder/editorder.component';
import { UploadComponent } from './_components/upload/upload.component';
import { AuthGuard } from './_guard/auth.guard';

export function tokenGetter() {
  return localStorage.getItem("token");
}

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent},
  { path: 'productslist', component: ProductslistComponent, canActivate: [AuthGuard]},
  { path: 'addproducts', component: AddproductsComponent},
  { path: 'editProducts/:id', component: EditProductsComponent},
  { path: 'viewProducts/:id', component: ViewProductComponent},
  { path: 'orderlist', component: OrderlistComponent, canActivate: [AuthGuard]},
  { path: 'editorder/:id', component:EditorderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    RegisterUserComponent,
    ProductslistComponent,
    AddproductsComponent,
    EditProductsComponent,
    ViewProductComponent,
    OrderlistComponent,
    EditorderComponent,
    UploadComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        //disallowedRoutesRoutes: []
      }
    }),
  ],
  exports: [RouterModule],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }