import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CreateProdComponent } from './create-prod/create-prod.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryService } from './services/category.service'
import { HttpService } from './services//http.service';
import { CartService } from './services/cart.service'
import { ProductService } from './services/product.service'
// Imports for Firebase Libs we will need
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderService } from './services/order.service';
import { AngularFireFunctions } from '@angular/fire/functions';

const config = {
  apiKey: "AIzaSyDxVQpoS-VG2FUGCRkDPhBeXYOtnQIPghA",
  authDomain: "ecommerce-shoes-summer.firebaseapp.com",
  databaseURL: "https://ecommerce-shoes-summer.firebaseio.com",
  projectId: "ecommerce-shoes-summer",
  storageBucket: "",
  messagingSenderId: "690622637999",
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductsComponent,
    HomeComponent,
    CreateProdComponent,
    ShoppingCartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    /* .forRoot() tells the root Module to use the attached module
    (in this case MDBootstrapModule) as a root module and only loads this
    when needed (which is called lazy loading) and not before
    */
   ReactiveFormsModule,
   AngularFireModule.initializeApp(config),
   AngularFirestoreModule,
   AngularFireAuthModule,
   AngularFireStorageModule
  ],
  providers: [AngularFireDatabase, CategoryService,HttpService,CartService, ProductService,OrderService,AngularFireFunctions], // This is used when a service is needed
  bootstrap: [AppComponent]
})
export class AppModule { }
