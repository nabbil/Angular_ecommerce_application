import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ShoppingCart } from '../shopping-cart/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthService } from '../services/authUser/auth.service';
declare var StripeCheckout:StripeCheckoutStatic

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit,OnDestroy {
  cart: ShoppingCart

  cartSubscription: Subscription

  amount: any;



  constructor( private shoppingCartService:CartService, private orderService:OrderService,private functions:AngularFireFunctions, private auth:AuthService ) { }

  handler: StripeCheckoutHandler

  confirmation: any
  loading = false

  shippingForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    city:new FormControl('')
  });

  placeOrder(){

    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shippingForm.value,
      items: this.cart.items,
      totalPrice: this.cart.totalPrice
    }
    this.orderService.storeOrder(order)
    console.log(this.shippingForm.value)
  }

 async ngOnInit() {

    let cart$ = await this.shoppingCartService.getCart()
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart)

    this.handler = StripeCheckout.configure({
      key:'pk_test_YOUR_PK_TEST_KEY',
      locale:'auto',
      source:async (source) =>{
        this.loading = true
        const user = await this.auth.getUser();
        const fun = this.functions.httpsCallable('stripeCreateCharge');
        this.confirmation = await fun({ source: source.id,uid: user.uid, amount: this.amount }).toPromise();
        this.loading = false;
      }
    })
    this.orderService.getTotal().subscribe(stuff => this.amount = stuff[0]['totalPrice'])
    console.log(this.amount)
  }

  async checkout(e) {
    this.handler.open({
      name: 'Coding Temple Sneakers',
      amount: this.amount*100,
    });
    e.preventDefault();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe()
  }

}
