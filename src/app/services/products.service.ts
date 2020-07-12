import { Injectable } from '@angular/core';
import { Products } from '../models/Products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public ProductsList:Array<Products> = [
    {Id: 1, ProductName: 'Product 1',Category:"Meet",ProductDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",Quantity:5,Weight:200,Price:150,ImagePath:"../../assets/images/cl-1.jpg"},
    {Id: 2, ProductName: 'Product 2',Category:"Fowl",ProductDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",Quantity:15, Weight:240,Price:530,ImagePath:"../../assets/images/cl-2.jpg"},
    {Id: 3, ProductName: 'Product 3',Category:"Meet",ProductDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",Quantity:7, Weight:120,Price:20,ImagePath:"../../assets/images/cl-3.jpg"},
    {Id: 4, ProductName: 'Product 4 ',Category:"Meet",ProductDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",Quantity:13, Weight:320,Price:430,ImagePath:"../../assets/images/cl-4.jpg"},
    {Id: 5, ProductName: 'Product 5 ',Category:"Fowl",ProductDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",Quantity:15,Weight:320,Price:430,ImagePath:"../../assets/images/cl-5.jpg"},
    {Id: 6, ProductName: 'Product 6 ',Category:"Meet",ProductDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",Quantity:22 ,Weight:320,Price:430,ImagePath:"../../assets/images/cl-6.jpg"},
  ];
  constructor() { }
  
  getList(){
    return this.ProductsList;
  }
}