import { Component, OnInit } from '@angular/core'; 
import { Section } from '../models/homePage.model';
import { Item } from '../models/Products.model';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.scss']
})
export class ProductsComponent implements OnInit { 
  Section: Section = {
    Name:"Meet",
    Id:null
  } 

  public ProductsList:Array<Item> = [];
 
  constructor(private _ProductsService:ProductsService,private _route: Router) { 
    
  }
   

  selectedProduct(product){
    this._route.navigate(['/products',product.Id])
  } 
  ngOnInit(): void {
    this.ProductsList = this._ProductsService.getList();
    console.log(this.ProductsList)
  }

  updateService(){ 
    this._ProductsService.updateProductsList(this.ProductsList);
  }

  deleteItem(){
    this.ProductsList.splice(1,4);
    console.log(this.ProductsList);
    
  }
   
}
