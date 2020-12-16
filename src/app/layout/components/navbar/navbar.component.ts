import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartSummary } from 'src/app/modules/cart/models/cart-summary.model';
import { CartService } from '../../../modules/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  cartItemsCount: number;
  constructor(private cartService: CartService, public translate: TranslateService) { 
    translate.addLangs(['Arabic', 'English']);
    translate.setDefaultLang('Arabic');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
  
  ngOnInit(): void {
    this.updateCartItemsCount();
    this.cartService.isCartChanged.subscribe(res => {
      if (res) {
        this.updateCartItemsCount();
      }
    });
  }

  public updateCartItemsCount() {
    let cartSummary: CartSummary = this.cartService.getCartSammry();
    this.cartItemsCount = cartSummary.totalQuantity;
  }

  public scroll() {
    var element = document.getElementById('aboutus');
    element.scrollIntoView({ behavior: "smooth" });
  }

}
