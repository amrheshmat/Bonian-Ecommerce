import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/modules/products/models/products.model';
import { HttpHelperService } from 'src/app/shared/services/http-helper.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  items: Array<Item>;
  constructor(private cartSevice: CartService, public httpHelperService:HttpHelperService) { }

  ngOnInit(): void {
    this.items = this.cartSevice.getCartFromLocalStorage().items;
    console.log(this.items);
    this.cartSevice.isCartChanged.subscribe(res => {
      if (res) {
        this.items = this.cartSevice.getCartFromLocalStorage().items;
      }
    });
  }

  public removeItem(item: Item) {
    this.cartSevice.removeFromCart(item);
    this.items = this.cartSevice.getCartFromLocalStorage().items;
  }
  public increaseQuantity(item: Item) {
    item.Quantity++;
    this.cartSevice.updateItemInCart(item);
  }

  public decreaseQuantity(item: Item) {
    if (item.Quantity > 1) {
      item.Quantity--;
      this.cartSevice.updateItemInCart(item);
    }
  }
}
