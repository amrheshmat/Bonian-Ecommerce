import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../products/models/products.model';
import { CartSummary } from '../models/cart-summary.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private messageSource = new BehaviorSubject<string>("default message");

  public isCartChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  getList() {

  }


  public addToCart(product: Item) {
    let cart: Cart = this.getCartFromLocalStorage();
    if (cart == null) {
      cart = new Cart();
      cart.items = new Array<Item>();
    }
    let item = cart.items.find(x => x.Id == product.Id);
    if (item) {
      cart.items.find(x => x.Id == product.Id).Quantity++;//If this product is selected 
    }
    else {
      product.Quantity = 1;
      cart.items.push(product);
    }
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
  }

  public updateCartInLocalStorage(cart: Cart) {
    this.removeCartFromLocalStorage();
    this.addCartToLocalStorage(cart);
    this.isCartChanged.emit(true);
  }

  public getCartSammry(): CartSummary {
    let items = this.getCartFromLocalStorage().items;
    let cartSummary = new CartSummary();
    cartSummary.totalPrice = 0;
    cartSummary.totalQuantity = 0;
    cartSummary.totalDiscount = 15;
    cartSummary.branchName = "Badr City";

    for (let item of items) {
      cartSummary.totalPrice += (item.ItemPrice * item.Quantity);
      cartSummary.totalQuantity += item.Quantity;
    }
    return cartSummary;
  }

}
