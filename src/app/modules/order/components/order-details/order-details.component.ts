import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel } from 'src/app/modules/authentication/models/user-profile.model';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { CartSummary } from 'src/app/modules/cart/models/cart-summary.model';
import { Cart } from 'src/app/modules/cart/models/cart.model';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { SalesOrderService } from 'src/app/modules/cart/services/sales-order.service';
import { ProductModalComponent } from 'src/app/modules/products/components/product-modal/product-modal.component';
import {Location} from '@angular/common';
import { SalesSttings } from 'src/app/modules/authentication/models/sales-settings';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
 public orderId ;
 public isPreparation:boolean = false;
 public hideRow = 0;
 public dialogMessage;
 public orderStatus;
 public orderDetails ;
 salesSttings = new SalesSttings();
tax:any;
discount:any;
 public orderDetailsId ;
 public orderTotalPrice ;
 public orderIds :any = [];
 public orderDetailsIds :any = [];
 public orderTotalPrices :any = [];
 actionMethod :any;
 public orderFinalQuantity :any = [];
 userProfile: UserProfileModel;
 cartSummary: CartSummary = new CartSummary();
 userProfileModel : UserProfileModel;
 public  permission ;
 public orderDetailsAttributeValue ;
 public totalPriceAfterUpdateQuantity:number = 0;
  constructor(private _location: Location,public dialog: MatDialog,private authService: AuthService,private router: ActivatedRoute,private cartService: CartService,
    private salesOrderService:SalesOrderService,private activatedRoute:ActivatedRoute) { 
      this.cartSummary.totalQuantity = 0;
    }

  ngOnInit(): void {
    
    this.permission = this.authService.getUserSecurityObjectFRomLocalStorage();
    if(this.permission.length  == 0){
      this.isPreparation = false;
    }else{
      if(this.permission[0].ChildObjects[0].NavigateUrl != "/Ecommerce/prepareOrder"){
         this.isPreparation = false;
      }else{
        this.isPreparation = true;
      }
    }
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
    this.getOrderDetails(this.orderId);
    this.activatedRoute.paramMap.subscribe(params => { 
      this.orderId= params.get('orderId'); 
      this.orderStatus = params.get('orderStatus');
      //this.cartSummary.totalPrice= parseInt(params.get('total'));
      this.orderTotalPrice = parseInt(params.get('total'));
      if(this.totalPriceAfterUpdateQuantity == 0){
        this.totalPriceAfterUpdateQuantity = this.orderTotalPrice ;
      }
      //
      this.getOrderDetails(this.orderId);
      this.userProfile = this.authService.getUserProfileFromLocalStorage();
      console.log(this.totalPriceAfterUpdateQuantity);
 });
 this.salesSttings = this.authService.getSalesSttingsFRomLocalStorage();
    this.tax = this.salesSttings.AutomaticTax;
    this.discount = this.salesSttings.DiscountTax + this.salesSttings.AutomaticDiscount;
  }
 
  getOrderDetails(orderId){
    this.salesOrderService.getOrderDetails(orderId).subscribe(response => {
      this.orderDetails = response;
    });
  }
  SaveEdit(){
   var keys = Object.keys(this.orderDetailsIds);
   var values = Object.values(this.orderDetailsIds);
   for(let i =0; i< keys.length ; i++){
      this.salesOrderService.updateOrderDetailsQuantity(parseInt(keys[i]),values[i]).subscribe(response => {
      
      this.salesOrderService.getOrderDetails(this.orderId).subscribe(response => {
        var keys = Object.keys(response);
        var values = Object.values(response);
        this.totalPriceAfterUpdateQuantity = 0;
        for(let i =0; i< keys.length ; i++){
          this.totalPriceAfterUpdateQuantity +=(values[i].Price * values[i].Quantity);
        }
        this.cartSummary.totalPrice = this.totalPriceAfterUpdateQuantity;
        this.salesOrderService.updateOrderPrice(this.totalPriceAfterUpdateQuantity,this.orderId).subscribe(response => {
          this.ngOnInit();
        });
        
        
      });
    });
    
   }
   
   //this._location.back();
  }
  
  cancelEdit(){
    this._location.back();
  }
 
  removeItem(orderId,orderDetailsId,price){
   this.dialogMessage = "Do You Want Delete This Item ?";
   this.actionMethod = "Delete";
   price = this.orderTotalPrice - price;
   this.openDialog(orderId,orderDetailsId,price);
   
  }
  getQuantity(quantity,orderDetailsId){
    this.orderDetailsIds[orderDetailsId] = quantity;
  }

  openDialog(orderId,orderDetailsId,price): void {
    const dialogRef = this.dialog.open(ProductModalComponent ,{
      width: '350px',
      height:' 165px',
      data:{message:this.dialogMessage,actionMethod:this.actionMethod,orderId:orderId,orderDetailsId:orderDetailsId,price:price,orderStatus:this.orderStatus}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
}


}
