import { Component, OnInit } from '@angular/core';
import { CartSummary } from '../../models/cart-summary.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent implements OnInit {
  cartSummary: CartSummary = new CartSummary();
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartSummary = this.cartService.getCartSammry();
    this.cartService.isCartChanged.subscribe(res => {
      if (res)
        this.cartSummary = this.cartService.getCartSammry();
    });
  }

}
