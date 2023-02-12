import { Component, OnInit } from '@angular/core';
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
  email: string | null = localStorage.getItem('email')
  cartItems: CartItem[] = [] 

  constructor( private _cartService: CartService, private _router: Router, private _authService:AuthService){ }

   ngOnInit(): void {
    if (this.email) {
      this._cartService.getCartItemsByEmail(this.email).subscribe(cart => {
        this.cartItems = cart[0].cartItems;
        this.cartItems.forEach((i: { product: Product; }) => this.products.push(i.product))
        console.log(this.products)
      });
    }
  }
  logout(){
    this._authService.logout()
    this._router.navigate(['home'])
}



  

}
