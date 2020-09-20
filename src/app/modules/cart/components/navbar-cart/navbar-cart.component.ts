import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../../../modules/products/models/products.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar-cart',
  templateUrl: './navbar-cart.component.html',
  styleUrls: ['./navbar-cart.component.scss']
})
export class NavbarCartComponent implements OnInit {

  items: Array<Item>;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.updateNavbarCart();
    this.cartService.isCartChanged.subscribe(res => {
      if (res) {
        this.updateNavbarCart();
      }
    });
  }

  private updateNavbarCart() {
    let cart = this.cartService.getCartFromLocalStorage();
    if (cart) {
      this.items = cart.items;
    }
  }

  public increaseQuantity(item: Item) {
    item.Quantity++;
    this.cartService.updateItemInCart(item);
  }

  public decreaseQuantity(item: Item) {
    if (item.Quantity > 1) {
      item.Quantity--;
      this.cartService.updateItemInCart(item);
    }
  }

  public removeItem(item: Item) {
    this.cartService.removeFromCart(item);
  }

  // public selectProduct(product: Item) {
  //   let url = this.router.url;
  //   if (url.includes("product-details")) {
  //     this.selectedProduct.emit(product);//To Display Item from related products
  //     window.scroll(0, 0);//Scroll to top
  //   }
  //   else {
  //     this.router.navigate(['/products/product-details/' + product.Id]);
  //   }
  // }
}
