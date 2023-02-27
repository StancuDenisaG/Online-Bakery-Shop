import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  products: Product[] = [];
  page = 'cart';
  email: string | null  = localStorage.getItem('email')
  cartItems: CartItem[] = [] 

  constructor( private _cartService: CartService){ }

   ngOnInit(): void {
    if (this.email) {
      this._cartService.getCartItemsByEmail(this.email).subscribe(cart => {
        this.cartItems = cart[0].cartItems;
        this.cartItems.forEach((i: { product: Product; }) => this.products.push(i.product))
        console.log(this.products);

      });
    }
  }
 addToCart(product: Product) {
    if(this.email != null){
      const itemIndex = this.cartItems.findIndex(i => i.product.id === product.id);
      this.cartItems[itemIndex].quantity += 1;
      this._cartService.updateProductQuantity(product, this.cartItems[itemIndex].quantity, this.email);
     
    }}
  
  
  

   
  
  removeFromCart(product: Product){
    if(this.email != null){
      this._cartService.removeProduct(product, this.email);
      this.cartItems = this.cartItems.filter(item => item.product.id !== product.id);
      this.products = this.cartItems.map(item => item.product);
    }
  }
  
}
