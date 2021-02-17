import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CartSummary } from 'src/app/modules/cart/models/cart-summary.model';
import { ProfileComponent } from '../../../modules/authentication/components/profile/profile.component';
import { UserProfileModel } from '../../../modules/authentication/models/user-profile.model';
import { AuthService } from '../../../modules/authentication/services/auth.service';
import { CartService } from '../../../modules/cart/services/cart.service';
import { ProductModalComponent } from '../../../modules/products/components/product-modal/product-modal.component';
import {Router} from "@angular/router"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  cartItemsCount: number;
  searchValue:string;
  public userProfile: UserProfileModel;//Logged UserName
  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    public translate: TranslateService,
    public authService: AuthService,
    private router: Router) {
    translate.addLangs(['Arabic', 'English']);
    translate.setDefaultLang('Arabic');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.getUserName();
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
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public updateCartItemsCount() {
    let cartSummary: CartSummary = this.cartService.getCartSammry();
    this.cartItemsCount = cartSummary.totalQuantity;
  }
  public purchaseLater(searchvalue) {
    this.searchValue = searchvalue;
    //console.log(this.searchValue);
    this.router.navigate(['/searchResult/'+this.searchValue])
}
  public scroll() {
    var element = document.getElementById('aboutus');
    element.scrollIntoView({ behavior: "smooth" });
  }

  private getUserName() {
    this.userProfile = this.authService.getUserProfileFromLocalStorage();
  }
  logOut() {
    this.authService.clearLocalStorage();
    this.router.navigateByUrl('/auth/login');
  }
  myOrders(){
    this.router.navigate(['/orders']);
  }
  myProfile(){
    this.router.navigate(['/profile']);
  }


}
