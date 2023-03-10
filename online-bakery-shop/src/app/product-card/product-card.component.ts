import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { coerceStringArray } from '@angular/cdk/coercion';
import { AuthService } from '../services/auth.service';
import { reload } from 'firebase/auth';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: Product;
  @Input() page: string = "products";
  @Input() cartItems: CartItem[] = [];
  email = localStorage.getItem('email');


  constructor( private _cartService: CartService, private router: Router, private _authService: AuthService){ }

  getQuantity(product: Product): number {
    let quantity = 1;
    if (this.cartItems) {
      for (const item of this.cartItems) {
        if (item.product === product) {
          quantity = item.quantity;
          break;
        }
      }
    }
    return quantity;
  }

}
