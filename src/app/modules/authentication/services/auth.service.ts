import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LoginModel } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHelperService } from '../../../shared/services/http-helper.service';
import { UserProfileModel } from '../models/user-profile.model';
import { ContactInfo } from '../models/contact-infoModel';
import { ChangePassword } from '../models/change-password';
import { DeliveryInformation } from '../../cart/models/delivery-information';
import { EventEmitter } from '@angular/core';
import { SecurityObject } from '../models/security-object.model';
import { SalesSttings } from '../models/sales-settings';
import { CashWay } from '../models/cash-way';

@Injectable({ providedIn: 'root' })
export class AuthService {
  controllerName: string = 'ApiECommerceAccount';
  controllerName2: string = 'ApiECommerceSalesOrder';
  public isDeliveryInfoChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private jwtHelper: JwtHelperService, private httpHelperService: HttpHelperService) {

  }

  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  login(model: LoginModel): any {
    return this.httpHelperService._http.post(`${this.httpHelperService.baseUrl}api/${this.controllerName}/LoginReturnToken`, model);
  }

  getUserById(userId: number): any {
    return this.httpHelperService._http.get(`${this.httpHelperService.baseUrl}api/${this.controllerName}/GetUserProfileByUserId?id=${userId}`);
  }

  register(model: UserProfileModel) {
    return this.httpHelperService._http.post(`${this.httpHelperService.baseUrl}api/${this.controllerName}/Registration`, model);
  }
  changePasswordApi(model:ChangePassword){
    return this.httpHelperService._http.put(`${this.httpHelperService.baseUrl}api/${this.controllerName}/ChangePassword`, model);
  }
  getRegistrationLookUp(): any {
    return this.httpHelperService._http.get(`${this.httpHelperService.baseUrl}api/${this.controllerName}/GetRegistrationLookUp`);
  }

  updateAccountInfo(model: UserProfileModel): any {
    return this.httpHelperService._http.put(`${this.httpHelperService.baseUrl}api/${this.controllerName}/UpdateContactInfo`,model);
  }
  addDeliveryInformation(model: ContactInfo): any {
    return this.httpHelperService._http.post(`${this.httpHelperService.baseUrl}api/${this.controllerName}/AddDeliveryInformation`,model);
  }
updateDefaultDeliveryInformation(model: ContactInfo): any {
    return this.httpHelperService._http.put(`${this.httpHelperService.baseUrl}api/${this.controllerName}/UpdateDefaultDeliveryInformation`,model);
  }
  
  deleteDeliveryInformation(deliveryInfoId: number): any {
    return this.httpHelperService._http.delete(`${this.httpHelperService.baseUrl}api/${this.controllerName}/DeleteDeliveryInformation?deliveryInfoId=${deliveryInfoId}`);
  }
  getDelievryInformationByProfileId(profileId: number): any {
    return this.httpHelperService._http.get(`${this.httpHelperService.baseUrl}api/${this.controllerName}/GetDelievryInformatioByProfileId?profileId=${profileId}`);
  }
  getSalesSttings(): any {
    return this.httpHelperService._http.get(`${this.httpHelperService.baseUrl}api/${this.controllerName2}/GetTaxAndDiscount`);
  }
  getCashWay(): any {
    return this.httpHelperService._http.get(`${this.httpHelperService.baseUrl}api/${this.controllerName2}/GetAvailablePaymentMethod`);
  }
  clearLocalStorage() {
    localStorage.clear();
  }

  setUserProfileInLocalStorage(userProfileModel: UserProfileModel) {
    localStorage.setItem('userProfile', JSON.stringify(userProfileModel));
  }
  setUserSecurityObjectInLocalStorage(securityObject: SecurityObject) {
    localStorage.setItem('securityObject', JSON.stringify(securityObject));
  }

  getUserSecurityObjectFRomLocalStorage(): SecurityObject {
    return JSON.parse(localStorage.getItem('securityObject'));
  }

  setSalesSttingsInLocalStorage(salesSttings: SalesSttings) {
    localStorage.setItem('salesSttings', JSON.stringify(salesSttings));
  }

  getSalesSttingsFRomLocalStorage(): SalesSttings {
    return JSON.parse(localStorage.getItem('salesSttings'));
  }

  
  setCashWayInLocalStorage(cashWay: CashWay) {
    localStorage.setItem('cashWay', JSON.stringify(cashWay));
  }

  getCashWayFRomLocalStorage(): CashWay {
    return JSON.parse(localStorage.getItem('cashWay'));
  }

  setUserDefaultDeliveryInfoInLocalStorage(deliveryInfoModel: DeliveryInformation) {
    localStorage.setItem('DeliveryInformation', JSON.stringify(deliveryInfoModel));
  }
  public removeUserDefaultDeliveryInfoFromLocalStorage(): any {
    localStorage.removeItem('DeliveryInformation');
  }
  getUserDefaultDeliveryInfoFromLocalStorage(): DeliveryInformation {
    return JSON.parse(localStorage.getItem('DeliveryInformation'));
  }
  updateUserDefaultDeliveryInfoInLocalStorage(deliveryInfoModel: DeliveryInformation) {
    this.removeUserDefaultDeliveryInfoFromLocalStorage();
    this.setUserDefaultDeliveryInfoInLocalStorage(deliveryInfoModel);
    this.isDeliveryInfoChanged.emit(true);
  }
  getUserProfileFromLocalStorage(): UserProfileModel {
    return JSON.parse(localStorage.getItem('userProfile'));
  }
  

}