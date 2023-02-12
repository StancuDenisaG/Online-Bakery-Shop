import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsCollection!: AngularFirestoreCollection<Product>;

  constructor( private _firestore: AngularFirestore) { 
    this.productsCollection = this._firestore.collection<Product>('products');
  }

  getProducts() {
    return this.productsCollection.valueChanges();
  }
  

  
}
