import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource = new MatTableDataSource(this.products);

  constructor( private _productService: ProductsService){ }

  ngOnInit() {
      this._productService.getProducts().subscribe( products => {
        this.products = products;
      })

      this.dataSource.paginator = this.paginator;
  }

}
