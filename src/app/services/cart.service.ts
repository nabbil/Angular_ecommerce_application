import { Injectable,Inject, forwardRef } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { take, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { ProdInterface } from '../products/prod-interface';
import { ShoppingCart } from '../shopping-cart/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(@Inject(forwardRef(() => AngularFireDatabase))private db: AngularFireDatabase) { }

  quantity:number;

  // Create a new Cart inside of Firebase and Specify the time
  create() {
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
    .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
  }

  // Get a cart or Create one if not available

  private async getOrCreateCartId():Promise<string>{
    /*
    Look inside the browser localStorage 
    and get the cartId if one exists
    */
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId  // If true/exists then return ID

    /* If one does not exist then we create it 
    and store it inside of the localStorage of the browser
    */
    let result = await this.create()  
    localStorage.setItem('cartId', result.key)
    return result.key
      
    
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId)
  }




   async addToCart(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
   item$.snapshotChanges().pipe(take(1)).subscribe(item => {

    if (item.payload.exists()) {
      let quantity = item.payload.exportVal().quantity + change;
      if (quantity === 0) item$.remove();
      else
        item$.update({product: product,
        quantity: quantity
      });
    } else {
      item$.set({product: product, quantity: 1});
    }
   })
  }

    // item$.update({product:product.name, quantity: (product.qty || 0) + change})
  

  

  // private async updateItem(product: ProdInterface, change: number) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.$key);
  //   item$.take(1).subscribe(item => {
  //     let quantity = (item.quantity || 0) + change;
  //     if (quantity === 0) item$.remove();
  //     else item$.update({ 
  //       title: product.title,
  //       imageUrl: product.imageUrl,
  //       price: product.price,
  //       quantity: quantity
  //     });
  //   });
  // }

  // private increamentQty(quant_num:number){
  //   return quant_num + 1
  // }



}
