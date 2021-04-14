import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { SalesOrder } from '../models/sales-order.model';
import { UserProfileModel } from '../../authentication/models/user-profile.model';
import { DiscountCoupon } from '../models/discount-coupon';
import { EventEmitter } from '@angular/core';
import { DeliveryPrice } from '../models/delivery-price';
import { CategoryFilter } from '../../products/models/category-filter.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class SalesOrderService extends BaseService {
  public isCouponChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isDeliveryInfoChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  controllerName = "ApiECommerceSalesOrder";
  controllerName2 = "ApiECommerceAccount";

  public header = new HttpHeaders().set(
    "access-token",
     localStorage.getItem("jwt")
  );
 
    
  createCustomer(salesOrder: SalesOrder) {
    return this._http.post(`${this.baseUrl}Api/${this.controllerName}/AddCustomer`, salesOrder);
  }

  createSalesOrder(salesOrder: SalesOrder) {
    return this._http.post(`${this.baseUrl}Api/${this.controllerName}/AddSalesOrder`, salesOrder);
  }
  createSalesOrderAndInvoice(salesOrder: SalesOrder) {
    return this._http.post(`${this.baseUrl}Api/${this.controllerName}/AddSalesOrderAndInovice`, salesOrder);
  }
  getOrderByProfileId(salesStatus : number,tableNumber : number,start : number,end:number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/GetOrderByProfileId?start=${start}&end=${end}&salesStatus=${salesStatus}&tableNumber=${tableNumber}`,{headers:this.header});

  }
  getAllOrders(salesStatus : number,tableNumber : number,start : number,end:number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/GetAllOrders?start=${start}&end=${end}&salesStatus=${salesStatus}&tableNumber=${tableNumber}`);

  }
  getOrderDetails(salesOrderId: number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/GetSalesOrderDetailsBySalesOrderId?salesOrderId=${salesOrderId}`);
  }
  updateOrderDetailsQuantity(salesOrderDetailsId: number , quantity:any) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/UpdateOrderDetailsQuantity?orderDetailsId=${salesOrderDetailsId}&quantity=${quantity}`);
  }
  updateOrderPrice(totalPrice: number , orderId:any) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/UpdateOrderPrice?totalPrice=${totalPrice}&orderId=${orderId}`);
  }
  
  payment(cart_currency : string,cart_amount : number,cart_id: number ,userProfileModel: UserProfileModel) {
    return this._http.post(`${this.baseUrl}api/${this.controllerName}/PaymentRequest?cartCurrency=${cart_currency}&cartAmount=${cart_amount}&cartId=${cart_id}`,userProfileModel,{headers:this.header});
  }
  updateOrderStatus(orderId : number,orderStatus : number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/UpdateOrderStatus?orderId=${orderId}&orderStatus=${orderStatus}`,{headers:this.header});
  }
  getOrderById(salesStatus : number,tableNumber : number,userId: number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/GetOrderById?salesStatus=${salesStatus}&tableNumber=${tableNumber}&salesOrderId=${userId}`);

  }
  paymentStatus(profileId:number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/GetPaymentStatus?profileId=${profileId}`);
  }
  getOrderDetailsArribute(salesOrderDetailsId: number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/GetSalesOrderDetailsDynamicAttribute?salesOrderDetailsId=${salesOrderDetailsId}`);
  }
  getdeliveryPrice(districtId: number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/GetDeliveryPrice?districtId=${districtId}`);
  }
  getCoupon(code: number) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/GetCoupon?code=${code}`);
  }
  setUserCouponInLocalStorage(discountCoupon: DiscountCoupon) {
    localStorage.setItem('DiscountCoupon', JSON.stringify(discountCoupon));
  }
  public removeCouponFromLocalStorage(): any {
    localStorage.removeItem('DiscountCoupon');
  }
  getUserCouponFromLocalStorage(): number {
    return JSON.parse(localStorage.getItem('DiscountCoupon'));
  }
  updateUserCouponInLocalStorage(discountCoupon: DiscountCoupon) {
    this.removeCouponFromLocalStorage();
    this.setUserCouponInLocalStorage(discountCoupon);
    this.isCouponChanged.emit(true);
  }
  setUserDeliveryPriceInLocalStorage(deliveryPrice: DeliveryPrice) {
    localStorage.setItem('DeliveryPrice', JSON.stringify(deliveryPrice));
  }
  public removeDeliveryPriceFromLocalStorage(): any {
    localStorage.removeItem('DeliveryPrice');
  }
  getUserDeliveryPriceFromLocalStorage(): DeliveryPrice {
    return JSON.parse(localStorage.getItem('DeliveryPrice'));
  }
  updateUserDeliveryPriceInLocalStorage(deliveryPrice: DeliveryPrice) {
    this.removeDeliveryPriceFromLocalStorage();
    this.setUserDeliveryPriceInLocalStorage(deliveryPrice);
    this.isDeliveryInfoChanged.emit(true);
  }
  deleteOderDetails(orderId: number,orderDetailsId : number,price : number) {
    return this._http.delete(`${this.baseUrl}api/${this.controllerName}/DeleteOderDetails?orderId=${orderId}&orderDetailsId=${orderDetailsId}&price=${price}`,{headers:this.header});
  }
  deleteOderByOrderId(orderId: number) {
    return this._http.delete(`${this.baseUrl}api/${this.controllerName}/DeleteOderByOrderId?orderId=${orderId}`,{headers:this.header});
  }
  getAllCustomers(categoryFilter: CategoryFilter) {
    return this._http.get(`${this.baseUrl}api/${this.controllerName2}/GetCustomersAndTables?start=${categoryFilter.Start}&end=${categoryFilter.End}&searchvalue=&orderby=${categoryFilter.Orderby}&dir=${categoryFilter.Dir}`);
  }

}
