import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../authentication/models/user-profile.model';
import { AuthService } from '../../../authentication/services/auth.service';
import { Customer } from '../../models/customer.model';
import { SalesOrderDetails } from '../../models/sales-order-details.model';
import { SalesOrder } from '../../models/sales-order.model';
import { CartService } from '../../services/cart.service';
import { SalesOrderService } from '../../services/sales-order.service';
import {Router} from "@angular/router"
import { NgForm } from '@angular/forms';
import { CartSummary } from '../../models/cart-summary.model';
import { response } from 'express';
import { Result } from 'src/app/modules/authentication/models/result.model';
import { AccountInfo } from 'src/app/modules/authentication/models/account-infoModel';
import { ItemTypeAttributeValue } from 'src/app/modules/products/models/ItemTypeAttributeValue.model';
import { stringify } from 'querystring';
import { ContactInfo } from 'src/app/modules/authentication/models/contact-infoModel';
import { DeliveryPrice } from '../../models/delivery-price';
import { DeliveryInformation } from '../../models/delivery-information';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  public userProfileModel: UserProfileModel;
  public result: AccountInfo;
  tranRef : string  ;
  cartSummary: CartSummary = new CartSummary();
  deliveryPrice : number;
  countryList: any = [];
  areaList: any = [];
  cityList: any = [];
  districtList: any = [];
  districtId:number;
  redirectUrl: any;
  cartId :number;
  delievryInfo :any = [];
  selected : number;
  couponAmount:number;
  map = new Map<String, String>();
  deliveryInfo : DeliveryInformation ;
  deliveryPriceModel : any = [];
  paymentWayValue : number;
  contactInformation: ContactInfo = new ContactInfo();
  constructor(private authService: AuthService,
    private cartService: CartService,private router: Router, 
    private salesOrderService: SalesOrderService) { }

  ngOnInit(): void {
    this.getUserName();
    this.getRegistrationLookUp();//Country => Area => City => District
    this.getDelievryInformationInfo();
  }

  getRegistrationLookUp() {
    this.authService.getRegistrationLookUp().subscribe(res => {
      this.prepareLoockups(res);
    });
  }

  prepareLoockups(res) {
    this.countryList = res['CountryIndexViewModel'].CountryList;
    this.areaList = res['AreaIndexViewModel'].AreaList;
    this.cityList = res['CityIndexViewModel'].CityList;
    this.districtList = res['DistrictIndexViewModel'].DistrictList;
  }

  public checkOut(f: NgForm) {
    let salesOrder = this.prepareSalesOrderEntity();
    var userProfile = this.authService.getUserProfileFromLocalStorage();
    salesOrder.ProfileId = userProfile.ProfileID;
    salesOrder.SaleStatus = 8;
    this.cartSummary = this.cartService.getCartSammry();
    this.couponAmount = this.salesOrderService.getUserCouponFromLocalStorage();
    this.deliveryPriceModel = this.salesOrderService.getUserDeliveryPriceFromLocalStorage();
    //salesOrder.DeliveryPrice = this.deliveryPriceModel.Price;
    salesOrder.TotalNet = this.cartSummary.totalPrice ;
    if(this.paymentWayValue == 2){
      salesOrder.SaleStatus = 6;
      this.createSalesOrder(salesOrder);
      this.cartService.removeCartFromLocalStorage();
      this.router.navigate(['/orders'])
    }else{
      this.createSalesOrderPayment(salesOrder);
      this.cartService.removeCartFromLocalStorage();
    }
}

public purchaseLater() {
  if(this.userProfileModel.Username){
    this.cartSummary = this.cartService.getCartSammry();
    let salesOrder = this.prepareSalesOrderEntity();
    var userProfile = this.authService.getUserProfileFromLocalStorage();
    salesOrder.ProfileId = userProfile.ProfileID;
    salesOrder.SaleStatus = 6;
    this.couponAmount = this.salesOrderService.getUserCouponFromLocalStorage();
    this.deliveryPriceModel = this.salesOrderService.getUserDeliveryPriceFromLocalStorage();
    salesOrder.DeliveryPrice = this.deliveryPriceModel.Price;
    salesOrder.Total = this.cartSummary.totalPrice ;
    salesOrder.TotalNet = this.cartSummary.totalPrice + salesOrder.DeliveryPrice - this.couponAmount ;
    this.createSalesOrder(salesOrder);
    this.cartService.removeCartFromLocalStorage();
    this.router.navigate(['/orders'])
  }else{
    //let salesOrder = this.prepareSalesOrderEntity();
    //this.createSalesOrder(salesOrder);
    this.router.navigate(['/auth/login'])
  }
  
}
  private prepareSalesOrderEntity(): SalesOrder {//Prepare this entity to pass it to Back end
    var salesOrder: SalesOrder = new SalesOrder();
    salesOrder.salesOrderDetails = this.getCartItems();
    return salesOrder;
  }

  private register() {
    this.authService.register(this.userProfileModel).subscribe(res => {
    })
  }

  private createSalesOrderPayment(salesOrder: SalesOrder) { 
    this.salesOrderService.createSalesOrder(salesOrder).subscribe(res => {
      this.cartId =res['Id'];
      this.sendApi("EGP",salesOrder.Total ,this.cartId,this.userProfileModel);
    })
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
  private getUserName() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
  }
  public sendApi(cart_currency,cart_amount,cart_id,userProfileModel){
    this.salesOrderService.payment(cart_currency,cart_amount,cart_id,userProfileModel).subscribe(res => { 
      var splitted = res.toString().split('&tran_ref='); //this will output ["1234", "56789"]
      this.tranRef = splitted[1];
      window.location.href =splitted[0];
   });
  }
  getDelievryInformationInfo() {
    this.authService.getDelievryInformationByProfileId(this.userProfileModel.ProfileID).subscribe(res=>{ 
      this.delievryInfo =res;
      for(let i of res){
        if(i.IsDefault == true){
          this.selected = i.DistrictId;
          this.authService.setUserDefaultDeliveryInfoInLocalStorage(i);
        }
      }
    });
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();//Get User From Local Storage
  }
  paymentWay(v){
    this.paymentWayValue = v;
  }
  deliveryAddress(val){
    
    this.districtId = val.value;
    alert(val.value);
    this.getDeliveryPrice(this.districtId);
    this.authService.getDelievryInformationByProfileId(this.userProfileModel.ProfileID).subscribe(res=>{ 
      this.delievryInfo =res;
      for(let i of res){
        if(i.DistrictId == this.districtId){
          this.authService.updateUserDefaultDeliveryInfoInLocalStorage(i);
        }
        
      }
    });
  }

  getDeliveryPrice(districtId){
    this.salesOrderService.getdeliveryPrice(districtId).subscribe(res => { 
      for(let i of Object.keys(res)){
        if(i == 'Price'){
          this.salesOrderService.updateUserDeliveryPriceInLocalStorage(this.deliveryPriceModel);
        }
      }
    });
  }
}
