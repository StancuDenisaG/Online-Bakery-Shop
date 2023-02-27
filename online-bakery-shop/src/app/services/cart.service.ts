import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private cartCollection!: AngularFirestoreCollection<Cart>;


  constructor(private firestore: AngularFirestore) {
    this.cartCollection = this.firestore.collection<Cart>('cart');
  }


  async getCart(email: string): Promise<AngularFirestoreDocument<Cart>> {
    const cartDoc = this.firestore.doc<Cart>(`cart/${email}`);
    return cartDoc;
  }

  getCartItemsByEmail(email: string): Observable<any> {
    return this.firestore.collection('cart', ref => ref.where('email', '==', email)).valueChanges();
  }

  async addCart(email: string, cartItems: any[]) {
    try {
      const cartDoc = await this.firestore.doc<Cart>(`cart/${email}`).get().toPromise();
      let cart: Cart | undefined = cartDoc?.exists ? cartDoc.data() : { email, cartItems: [] };
      if (!cart) {
        await this.firestore.collection('cart').doc(email).set({
          email,
          cartItems: cartItems
        });
      }
    } catch (error) {
      console.error('Error creating or updating cart:', error);
    }
  }

  async addProduct(product: Product, quantity: number, email: string) {
    try {
      const cartDoc = await this.cartCollection.doc(email).get().toPromise();
      let cart: Cart | undefined = cartDoc?.exists ? cartDoc.data() :  { email, cartItems: [] };
      if (!cart) {
        cart = { email, cartItems: [] };
      }
      const itemIndex = cart.cartItems.findIndex(i => i.product.id === product.id);
      if (itemIndex === -1) {
        cart.cartItems.push({ product, quantity });
      } else {
        cart.cartItems[itemIndex].quantity += quantity;
      }
      await this.cartCollection.doc(email).set(cart);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  async removeProduct(product: Product, email: string) {
    try {
      const cartDoc = await this.cartCollection.doc(email).get().toPromise();
      let cart: Cart | undefined = cartDoc?.exists ? cartDoc.data() :  { email, cartItems: [] };
      if (!cart) {
        cart =  { email, cartItems: [] };
      }
      cart.cartItems = cart.cartItems.filter(i => i.product.id !== product.id);
      await this.cartCollection.doc(email).set(cart);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  }

  async updateProductQuantity(product: Product, quantity: number, email: string) {
    try {
      const cartDoc = await this.cartCollection.doc(email).get().toPromise();
      const cart: Cart | undefined = cartDoc?.exists ? cartDoc.data() : undefined;
      if (cart) {
        const itemIndex = cart.cartItems.findIndex(i => i.product.id === product.id);
        if (itemIndex !== -1) {
          cart.cartItems[itemIndex].quantity = quantity;
          await this.cartCollection.doc(email).set(cart);
        }
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  }
  
}  
