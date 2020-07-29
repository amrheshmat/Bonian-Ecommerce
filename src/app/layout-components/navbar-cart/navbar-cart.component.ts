import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Item } from 'src/app/models/Products.model';

@Component({
  selector: 'app-navbar-cart',
  templateUrl: './navbar-cart.component.html',
  styleUrls: ['./navbar-cart.component.scss']
})
export class NavbarCartComponent implements OnInit {
 
  public ProductsList:Array<Item> = [];

  constructor(private _ProductsService:ProductsService) { 
    
  }

  ngOnInit(): void {
    this.ProductsList = this._ProductsService.getList();
    console.log(this.ProductsList)
  }

}
