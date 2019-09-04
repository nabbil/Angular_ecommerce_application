// This is a model of the shopping cart

import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart{

    total: any;

    items: ShoppingCartItem[] = [];
    constructor(private itemsMap: {[productId: string]: ShoppingCartItem}) {
        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    } 

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) 
              count += this.itemsMap[productId].quantity;
        return count;
        }

    get totalPrice() {

        // Add both of the item totals and come up with a full total
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
            this.total = sum
        }
        return sum;
    }    
    
}