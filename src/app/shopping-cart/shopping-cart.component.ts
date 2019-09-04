import { Component,AfterViewInit, OnInit, Input, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { CartService } from '../services/cart.service';
import { HttpService } from '../services/http.service';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from './shopping-cart-item';

import { ShoppingCart } from './shopping-cart'
import { FormControl, FormGroup } from '@angular/forms';

// Import for Products Interface
// import {ProdInterface} from './prod-interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit,AfterViewInit {

  cart$: Observable<any>;
  cart: any;
  private contentTotal:ElementRef

  @ViewChild('totalprice',{static:false}) set content(content:ElementRef){
    this.contentTotal = content
  }



  /*
   private contentPlaceholder: ElementRef;

 @ViewChild('contentPlaceholder') set content(content: ElementRef) {
    this.contentPlaceholder = content;
 }
 */


  item: ShoppingCart
    constructor( @Inject(forwardRef( () => CartService))private shoppingCartService: CartService, @Inject(forwardRef( () => AngularFireDatabase)) private db: AngularFireDatabase) {}

    async ngOnInit(){
      this.cart$ = await this.shoppingCartService.getCart();
      
      this.cart = this.shoppingCartService.getCart().then(result => this.cart = result);



    }

    ngAfterViewInit(){
    }

}