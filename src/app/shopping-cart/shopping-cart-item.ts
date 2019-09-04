import { ProdInterface } from '../products/prod-interface'

export class ShoppingCartItem {
    key: string;
    title: string;
    imageUrl: string;
    price: number;

    constructor(public product: ProdInterface, public quantity: number) {

}
    get totalPrice() {
        return this.product.price * this.quantity; 
        console.log(this.product.price * this.quantity)
    }
} 
