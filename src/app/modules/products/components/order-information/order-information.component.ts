import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CashWay } from 'src/app/modules/authentication/models/cash-way';
import { SalesSttings } from 'src/app/modules/authentication/models/sales-settings';
import { UserProfileModel } from 'src/app/modules/authentication/models/user-profile.model';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { CartSummary } from 'src/app/modules/cart/models/cart-summary.model';
import { DeliveryInformation } from 'src/app/modules/cart/models/delivery-information';
import { SalesOrderDetails } from 'src/app/modules/cart/models/sales-order-details.model';
import { SalesOrder } from 'src/app/modules/cart/models/sales-order.model';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { SalesOrderService } from 'src/app/modules/cart/services/sales-order.service';
import { CategoryFilter } from '../../models/category-filter.model';
import { ItemTypeAttributeValue } from '../../models/ItemTypeAttributeValue.model';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent implements OnInit {
  cartSummary: CartSummary ;
  cashWay : CashWay;
  deliveryPrice:number ;
  couponAmount:number;
  bothDeliveryWay : boolean = false;
  cartId :number;
  salesSttings = new SalesSttings();
  autoTax:any;
  discountTax:any;
  autoDiscount:any
  deliveryInfo : DeliveryInformation ;
  deliveryPriceModel : any = [];
  allCustomers : any ;
  categoryFilter : CategoryFilter = new CategoryFilter();
  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private cartService: CartService,private router:Router,private authService: AuthService,private salesOrderService: SalesOrderService) { }

  ngOnInit(): void {
   
    
    this.getCustomers();
    this.cartSummary = this.cartService.getCartSammry();
    
    this.cartService.isCartChanged.subscribe(res => {
      if (res){
        this.cartSummary = this.cartService.getCartSammry();
      }
        
    });
    this.cartService.isCartRemoved.subscribe(res => {
      if (res)
        this.cartSummary = this.cartService.getCartSammry();
    });
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
   // this.couponAmount = this.salesOrderService.getUserCouponFromLocalStorage();

   // this.deliveryInfo = this.authService.getUserDefaultDeliveryInfoFromLocalStorage();

    //this.deliveryPriceModel = this.salesOrderService.getUserDeliveryPriceFromLocalStorage();

    /*this.authService.isDeliveryInfoChanged.subscribe(res=>{
      if(res){
        //this.deliveryInfo = this.authService.getUserDefaultDeliveryInfoFromLocalStorage();
      //  this.getDeliveryPrice(this.deliveryInfo.DistrictId);
     //   this.deliveryPriceModel = this.salesOrderService.getUserDeliveryPriceFromLocalStorage();
     //  this.deliveryPrice = this.deliveryPriceModel.Price;

      }
      
    });*/

    this.getSalesSttings();
    this.getCashWay();
   
  }

  filterMenaces(str: number) {
    this.userProfileModel.ProfileID = str;
}
  getCustomers(){
    this.categoryFilter.Start = -1;
    this.categoryFilter.End = 0;
    this.salesOrderService.getAllCustomers(this.categoryFilter).subscribe(res=>{
      this.allCustomers = res;
    })
  }
  confirmOrder(){
    if(this.userProfileModel != null){
      this.cartSummary = this.cartService.getCartSammry();
      let salesOrder = this.prepareSalesOrderEntity();
      salesOrder.ProfileId = this.userProfileModel.ProfileID;
      salesOrder.SaleStatus = 6;
      this.couponAmount = this.salesOrderService.getUserCouponFromLocalStorage();
      this.deliveryPriceModel = this.salesOrderService.getUserDeliveryPriceFromLocalStorage();
      salesOrder.Total = this.cartSummary.totalPrice ;
      salesOrder.TotalNet = this.cartSummary.totalPrice + ((this.cartSummary.totalPrice * (this.autoTax/100)))  - (this.cartSummary.totalPrice * (this.discountTax/100)) - (((this.cartSummary.totalPrice * (this.autoTax/100))+this.cartSummary.totalPrice) * (this.autoDiscount/100));
     
      if(this.cashWay.PaymentMethodId == 1){
        this.createSalesOrder(salesOrder);
        this.cartService.removeCartFromLocalStorage();
      }else if(this.cashWay.PaymentMethodId == 2){
        this.createSalesOrderPayment(salesOrder);
        this.cartService.removeCartFromLocalStorage();
      }else{
        this.bothDeliveryWay = true;
      }
      
    }else{
      this.router.navigate(["/auth/login"]);
    }
  }
  cahway(val){
    this.cashWay.PaymentMethodId = val;
  }
  cancelOrder(){
    this.cartService.removeCartFromLocalStorage();
  }
  private prepareSalesOrderEntity(): SalesOrder {//Prepare this entity to pass it to Back end
    var salesOrder: SalesOrder = new SalesOrder();
    salesOrder.salesOrderDetails = this.getCartItems();
    return salesOrder;
  }
  private createSalesOrder(salesOrder: SalesOrder) { 
    this.salesOrderService.createSalesOrderAndInvoice(salesOrder).subscribe(res => {
      this.cartId =res['Id'];
      
    })
  }

  public sendApi(cart_currency,cart_amount,cart_id,userProfileModel){
    this.salesOrderService.payment(cart_currency,cart_amount,cart_id,userProfileModel).subscribe(res => { 
      var splitted = res.toString().split('&tran_ref='); //this will output ["1234", "56789"]
    //  this.tranRef = splitted[1];
      window.location.href =splitted[0];
   });
  }
  
  private createSalesOrderPayment(salesOrder: SalesOrder) { 
    this.salesOrderService.createSalesOrder(salesOrder).subscribe(res => {
      this.cartId =res['Id'];
      this.sendApi("EGP",Math.ceil(salesOrder.TotalNet) ,this.cartId,this.userProfileModel);
    })
  }

  private getCartItems(): Array<SalesOrderDetails> {
    var salesOrderDetailsList: Array<SalesOrderDetails> = [];
    
    
    var cart = this.cartService.getCartFromLocalStorage();
    if (cart) {
      for (let item of cart.items) {
        let salesOrderDetails: SalesOrderDetails = new SalesOrderDetails();
        salesOrderDetails.ItemId = item.Id;
        salesOrderDetails.Quantity = item.Quantity;
        salesOrderDetails.Price = item.ItemPrice;
        if(item.ItemAttributeValue !=null){
        var keys = Object.keys(item.ItemAttributeValue);
        var values = Object.values(item.ItemAttributeValue);
        var len = keys.length;
        var itemTypeAttributeValueList: Array<ItemTypeAttributeValue> = [];
        for (let i = 0; i < len; i++){
          let itemTypeAttributeValue: ItemTypeAttributeValue = new ItemTypeAttributeValue();
          itemTypeAttributeValue.ItemId = item.Id;
          itemTypeAttributeValue.AttributeId = parseInt(keys[i]);
          itemTypeAttributeValue.AttributeValue = values[i].toString();
          itemTypeAttributeValueList.push(itemTypeAttributeValue);
          salesOrderDetails.itemAttributeValue = itemTypeAttributeValueList;
        }
      }
        salesOrderDetailsList.push(salesOrderDetails);
      }
    }
    return salesOrderDetailsList;
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

  private getCashWay(){
    this.authService.getCashWay().subscribe(res=>{
      this.cashWay = res;
      if(this.cashWay.PaymentMethodId == 1){
        this.bothDeliveryWay =false;
      }else if(this.cashWay.PaymentMethodId == 2){
        this.bothDeliveryWay =false;
      }else{
        this.bothDeliveryWay =true;
      }
    });
  }
  private getSalesSttings(){
    this.authService.getSalesSttings().subscribe(res=>{
      this.salesSttings = res;
      this.autoTax = this.salesSttings.AutomaticTax;
      this.discountTax = this.salesSttings.DiscountTax ;
      this.autoDiscount = this.salesSttings.AutomaticDiscount;
    });
  }
}
