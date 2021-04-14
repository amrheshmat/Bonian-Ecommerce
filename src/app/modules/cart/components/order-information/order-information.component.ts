import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesSttings } from 'src/app/modules/authentication/models/sales-settings';
import { UserProfileModel } from 'src/app/modules/authentication/models/user-profile.model';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { CartSummary } from '../../models/cart-summary.model';
import { DeliveryInformation } from '../../models/delivery-information';
import { CartService } from '../../services/cart.service';
import { SalesOrderService } from '../../services/sales-order.service';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent implements OnInit {
  salesSttings = new SalesSttings();
  autoTax:any;
  discountTax:any;
  autoDiscount:any
  cartSummary: CartSummary ;
  deliveryPrice:number ;
  couponAmount:number;
  deliveryInfo : DeliveryInformation ;
  deliveryPriceModel : any = [];
  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private cartService: CartService,private router:Router,private authService: AuthService,private salesOrderService: SalesOrderService) { }

  ngOnInit(): void {
    this.getSalesSttings();
    this.cartSummary = this.cartService.getCartSammry();
    this.cartService.isCartChanged.subscribe(res => {
      if (res)
        this.cartSummary = this.cartService.getCartSammry();
    });

    this.couponAmount = this.salesOrderService.getUserCouponFromLocalStorage();

    //this.deliveryInfo = this.authService.getUserDefaultDeliveryInfoFromLocalStorage();
    //this.getDeliveryPrice(this.deliveryInfo.DistrictId);

   // this.deliveryPriceModel = this.salesOrderService.getUserDeliveryPriceFromLocalStorage();
    //this.deliveryPrice = this.deliveryPriceModel.Price;

  /*  this.authService.isDeliveryInfoChanged.subscribe(res=>{
      if(res){
       this.deliveryInfo = this.authService.getUserDefaultDeliveryInfoFromLocalStorage();
        this.getDeliveryPrice(this.deliveryInfo.DistrictId);
        this.deliveryPriceModel = this.salesOrderService.getUserDeliveryPriceFromLocalStorage();
      this.deliveryPrice = this.deliveryPriceModel.Price;
      }
      
    });*/

    
   
  }
  private getSalesSttings(){
    this.authService.getSalesSttings().subscribe(res=>{
      this.salesSttings = res;
      this.autoTax = this.salesSttings.AutomaticTax;
      this.discountTax = this.salesSttings.DiscountTax ;
      this.autoDiscount = this.salesSttings.AutomaticDiscount;
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
  getDeliveryPrice(districtId){
    this.salesOrderService.getdeliveryPrice(districtId).subscribe(res => { 
      this.deliveryPriceModel = res;
      for(let i of Object.keys(res)){
        if(i == 'Price'){
         this.salesOrderService.updateUserDeliveryPriceInLocalStorage(this.deliveryPriceModel);
        }
      }
    });
  }
}
