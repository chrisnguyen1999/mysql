import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/component/login/login.component';
import { RegisterComponent } from '../app/component/register/register.component';
import { OrderComponent } from '../app/component/order/order.component';
import { ImportBillComponent } from '../app/component/import-bill/import-bill.component';
import { ProductsComponent } from '../app/component/products/products.component';
import { SaleComponent } from '../app/component/sale/sale.component';
import { SaleBillComponent } from '../app/component/sale-bill/sale-bill.component';
import { CustomersComponent } from '../app//component/customers/customers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/product/table',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'order',
    redirectTo: '/order/bill',
    pathMatch: 'full'
  },
  {
    path: 'order/import',
    component: OrderComponent
  },
  {
    path: 'order/bill',
    component: ImportBillComponent
  },
  {
    path: 'product',
    redirectTo: '/product/table',
    pathMatch: 'full'
  },
  {
    path: 'product/table',
    component: ProductsComponent
  },
  {
    path: 'product/sale',
    component: SaleComponent
  },
  {
    path: 'product/bill',
    component: SaleBillComponent
  },
  {
    path: 'customer',
    component: CustomersComponent
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
