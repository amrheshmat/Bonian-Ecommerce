import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private messageSource = new BehaviorSubject<string>("default message");
  public ProductsList:Array<Cart> = []

  constructor() { } 
  getList(){
    return this.ProductsList;
  }
}
