import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel } from 'src/app/modules/authentication/models/user-profile.model';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { CartSummary } from 'src/app/modules/cart/models/cart-summary.model';
import { DeliveryInformation } from 'src/app/modules/cart/models/delivery-information';
import { SalesOrderDetails } from 'src/app/modules/cart/models/sales-order-details.model';
import { SalesOrder } from 'src/app/modules/cart/models/sales-order.model';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { SalesOrderService } from 'src/app/modules/cart/services/sales-order.service';
import { CategoryFilter } from 'src/app/modules/products/models/category-filter.model';
import { ItemTypeAttributeValue } from 'src/app/modules/products/models/ItemTypeAttributeValue.model';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent implements OnInit {
  public orderId ;
 public hideRow = 0;
 public dialogMessage;
 public orderStatus;
 public orderDetails ;
 public orderDetailsId ;
 public orderTotalPrice ;
 public orderIds :any = [];
 public orderDetailsIds :any = [];
 public orderTotalPrices :any = [];
 actionMethod :any;
 public orderFinalQuantity :any = [];
  cartSummary: CartSummary ;
  deliveryPrice:number ;
  couponAmount:number;
  cartId :number;
  deliveryInfo : DeliveryInformation ;
  deliveryPriceModel : any = [];
  allCustomers : any ;
  categoryFilter : CategoryFilter = new CategoryFilter();
  userProfileModel: UserProfileModel = new UserProfileModel();
  constructor(private cartService: CartService,private router:Router,private activatedRoute:ActivatedRoute,private authService: AuthService,private salesOrderService: SalesOrderService) { }

  ngOnInit(): void {
    
    this.getCustomers();
    this.cartSummary = this.cartService.getCartSammry();
    this.cartService.isCartChanged.subscribe(res => {
      if (res)
        this.cartSummary = this.cartService.getCartSammry();
    });
    this.cartService.isCartRemoved.subscribe(res => {
      if (res)
        this.cartSummary = this.cartService.getCartSammry();
    });
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
    this.couponAmount = this.salesOrderService.getUserCouponFromLocalStorage();

    this.deliveryInfo = this.authService.getUserDefaultDeliveryInfoFromLocalStorage();
  //  this.getDeliveryPrice(this.deliveryInfo.DistrictId);

    this.deliveryPriceModel = this.salesOrderService.getUserDeliveryPriceFromLocalStorage();
    //this.deliveryPrice = this.deliveryPriceModel.Price;

    this.authService.isDeliveryInfoChanged.subscribe(res=>{
      if(res){
        this.deliveryInfo = this.authService.getUserDefaultDeliveryInfoFromLocalStorage();
        this.getDeliveryPrice(this.deliveryInfo.DistrictId);
        this.deliveryPriceModel = this.salesOrderService.getUserDeliveryPriceFromLocalStorage();
       this.deliveryPrice = this.deliveryPriceModel.Price;

      }
      
    });

    this.activatedRoute.paramMap.subscribe(params => { 
      this.orderId= params.get('orderId'); 
      this.getOrderId(this.orderId);
      this.orderStatus = params.get('orderStatus');
      this.cartSummary.totalPrice= parseInt(params.get('total'));
      this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
     // this.getOrderDetailsAttribute();
 });
    
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
     // salesOrder.DeliveryPrice = this.deliveryPriceModel.Price;
     
      salesOrder.Total = this.cartSummary.totalPrice ;
      salesOrder.TotalNet = this.cartSummary.totalPrice + (this.cartSummary.totalPrice * (this.cartSummary.totalDiscount /100));
      this.createSalesOrder(salesOrder);
      this.cartService.removeCartFromLocalStorage();
    }else{
      this.router.navigate(["/auth/login"]);
    }
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
    this.salesOrderService.createSalesOrder(salesOrder).subscribe(res => {
      this.cartId =res['Id'];
      
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

  getOrderId(orderId){
    this.salesOrderService.getOrderById(null,null,orderId).subscribe(res=>{
      let keys = Object.keys(res);
      let values = Object.values(res);
       let len = keys.length;
         for (let i = 0; i < len; i++){
           console.log(values[i].Total);
          }
    });
  }
}
