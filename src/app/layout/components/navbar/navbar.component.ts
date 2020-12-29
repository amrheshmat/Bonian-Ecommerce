import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartSummary } from 'src/app/modules/cart/models/cart-summary.model';
import { ProfileComponent } from '../../../modules/authentication/components/profile/profile.component';
import { CartService } from '../../../modules/cart/services/cart.service';
import { ProductModalComponent } from '../../../modules/products/components/product-modal/product-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  cartItemsCount: number;
  constructor(private cartService: CartService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateCartItemsCount();
    this.cartService.isCartChanged.subscribe(res => {
      if (res) {
        this.updateCartItemsCount();
      }
    });
  }

  

  //Open Profile Dialog
  openProfileDialog(): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '400px',
      height: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
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
