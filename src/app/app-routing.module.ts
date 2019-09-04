import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { CreateProdComponent } from './create-prod/create-prod.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: '', component:HomeComponent},
  {path: 'create', component:CreateProdComponent},
  {path: 'shoppingcart', component:ShoppingCartComponent},
  {path: 'checkout', component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
