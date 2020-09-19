import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/modules/cart/models/cart.model';
import { CartService } from '../../../modules/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  cartItemsCount: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartItemsCount();
    this.cartService.isCartChanged.subscribe(res => {
      if (res) {
        this.updateCartItemsCount();
      }
    });
  }

  public updateCartItemsCount() {
    let cart: Cart = this.cartService.getCartFromLocalStorage();
    this.cartItemsCount = 0;
    if (cart) {
      for (let item of cart.items) {
        this.cartItemsCount += item.Quantity;
      }
    }
  }
  public scroll() {
    var element = document.getElementById('aboutus');
    element.scrollIntoView({ behavior: "smooth" });
  }

}
