import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/modules/products/models/products.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  items: Array<Item>;
  constructor(private cartSevice: CartService) { }

  ngOnInit(): void {
    this.items = this.cartSevice.getCartFromLocalStorage().items;

  }

}
