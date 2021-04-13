import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '../../../shared/services/alert.service';
import { Item } from '../../products/models/products.model';
import { CartSummary } from '../models/cart-summary.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private messageSource = new BehaviorSubject<string>("default message");

  public isCartChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isCartRemoved: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private alertService: AlertService) { }

  getList() {

  }


  public updateItemInCart(product: Item) {
    let cart: Cart = this.getCartFromLocalStorage();
    cart.items.find(x => x.generatedId == product.generatedId).Quantity = product.Quantity;//If this product is selected 
    this.updateCartInLocalStorage(cart);
  }

  public addToCart(product: Item) {
    let cart: Cart = this.getCartFromLocalStorage();
    if (cart == null) {
      cart = new Cart();
      cart.items = new Array<Item>();
    }
    let item = cart.items.find(x => x.Id == product.Id);
     /*if (item) {
     if(item.ItemAttributeValue !=null){
        var keys = Object.keys(item.ItemAttributeValue);
        var values = Object.values(item.ItemAttributeValue);
        var len = keys.length;
        for (let i = 0; i < len; i++){
          let attr = item.ItemAttributeValue.find(x=> x.AttributeValue == values[i].toString());
          if(attr){
            product.Quantity = 1;
          cart.items.push(product);
          }else{
            
          }
        }
      }
     // cart.items.find(x => x.Id == product.Id).Quantity++;//If this product is selected 
    }
    else {*/
      product.Quantity = 1;
      cart.items.push(product);
    //}
    this.updateCartInLocalStorage(cart);
    this.alertService.showSuccess("You have added item successfully", "Success")
  }

  public removeFromCart(product: Item) {
    let cart: Cart = this.getCartFromLocalStorage();
    cart.items = cart.items.filter(x => x.generatedId != product.generatedId);
    this.updateCartInLocalStorage(cart);
  }

  public addCartToLocalStorage(cart: Cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  public getCartFromLocalStorage(): Cart {
    return JSON.parse(localStorage.getItem("cart"));
  }

  public removeCartFromLocalStorage(): any {
    localStorage.removeItem('cart');
     this.isCartRemoved.emit(true);
  }

  public updateCartInLocalStorage(cart: Cart) {
   // this.removeCartFromLocalStorage();
    this.addCartToLocalStorage(cart);
    this.isCartChanged.emit(true);
  }

  public getCartSammry(): CartSummary {
    let cart = this.getCartFromLocalStorage();
    let cartSummary = new CartSummary();
    if (cart) {
      var items = cart.items
  //    if(items.length >0)
      cartSummary.totalPrice = 0;
      cartSummary.totalQuantity = 0;
      cartSummary.totalDiscount = 15;
      cartSummary.branchName = "Badr City";

      for (let item of items) {
        cartSummary.totalPrice += (item.ItemPrice * item.Quantity);
        cartSummary.totalQuantity += item.Quantity;
      }
    }
    return cartSummary;
  }
}
