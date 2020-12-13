import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { OrderComponent } from './component/order/order.component';
import { FormsModule } from '@angular/forms';
import { ImportBillComponent } from './component/import-bill/import-bill.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsComponent } from './component/products/products.component';
import { SaleComponent } from './component/sale/sale.component';
import { SaleBillComponent } from './component/sale-bill/sale-bill.component';
import { CustomersComponent } from './component/customers/customers.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OrderComponent,
    ImportBillComponent,
    ProductsComponent,
    SaleComponent,
    SaleBillComponent,
    CustomersComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
