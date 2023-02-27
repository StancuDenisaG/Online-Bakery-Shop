import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  products: Product[] = [];
  page = 'products';
  totalProducs: number = 0;
  dataSource = new MatTableDataSource<Product>();
  email = localStorage.getItem('email');

  constructor(private _productService: ProductsService, private _cartService: CartService, private router: Router) {}

  ngOnInit() {
    this._productService.getProducts().subscribe((products) => {
      this.products = products;
      this.dataSource.data = products;
    });

    this.dataSource.paginator = this.paginator;
  }
  
  addToCart( product: Product){
    if (this.email){
      this._cartService.addProduct(product, 1, this.email)
    }
  }

  isUserLoggedIn(){
    if(localStorage.getItem('email')){
      return true
    }
    else return false;
  }

  redirectToLogin(){
    this.router.navigate(['login']);

  }
}
