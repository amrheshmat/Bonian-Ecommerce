import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesSttings } from 'src/app/modules/authentication/models/sales-settings';
import { UserProfileModel } from 'src/app/modules/authentication/models/user-profile.model';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CartSummary } from '../../models/cart-summary.model';
import { DiscountCoupon } from '../../models/discount-coupon';
import { CartService } from '../../services/cart.service';
import { SalesOrderService } from '../../services/sales-order.service';

@Component({
  selector: 'app-cart-information',
  templateUrl: './cart-information.component.html'
})
export class CartInformationComponent implements OnInit {
  salesSttings = new SalesSttings();
  tax:any;
  discount:any;
  cartSummary: CartSummary ;
  discountCoupon : DiscountCoupon = new DiscountCoupon();
  couponAmount :number ;
  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private cartService: CartService,private router:Router,private alertService:AlertService,
    private authService: AuthService,private salesOrderService:SalesOrderService) { }

  ngOnInit(): void {
    this.salesSttings = this.authService.getSalesSttingsFRomLocalStorage();
    this.tax = this.salesSttings.AutomaticTax;
    this.discount = this.salesSttings.DiscountTax + this.salesSttings.AutomaticDiscount;
    this.cartSummary = this.cartService.getCartSammry();
    this.cartService.isCartChanged.subscribe(res => {
      if (res)
        this.cartSummary = this.cartService.getCartSammry();
    });
  }
  goToCheckOut(){
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
    if(this.userProfileModel != null){
      this.router.navigate(["/cart/check-out"]);
    }else{
      this.router.navigate(["/auth/login"]);
    }
  }
  checkCouponCode(){
    if(!this.discountCoupon.CouponCode){
      this.alertService.showError("Empty Code!", "Error");
    }
    else{
      this.salesOrderService.getCoupon(this.discountCoupon.CouponCode).subscribe(res=>{ 
        if(res){
          for(let i of Object.keys(res)){
            this.discountCoupon = res[i];
              if(i == 'CouponAmount'){
                this.couponAmount = res[i];
                this.salesOrderService.updateUserCouponInLocalStorage(this.discountCoupon);
                this.alertService.showSuccess( this.couponAmount.toString(),"Valid Code It's Amout : ");
              }
          }
        }else{
          this.alertService.showError("Invalid  Code!", "Error");
        }
      });
    }
  }
}
