import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LoginModel } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHelperService } from '../../../shared/services/http-helper.service';
import { UserProfileModel } from '../models/user-profile.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  controllerName: string = 'ApiECommerceAccount';
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
    return this.httpHelperService._http.post(`${this.httpHelperService.baseUrl}${this.controllerName}/LoginReturnToken`, model);
  }

  getUserById(userId: number): any {
    return this.httpHelperService._http.get(`${this.httpHelperService.baseUrl}${this.controllerName}/GetUserProfileByUserId?id=${userId}`);
  }

  register(model: UserProfileModel) {
    return this.httpHelperService._http.post(`${this.httpHelperService.baseUrl}${this.controllerName}/Registration`, model);
  }

  getRegistrationLookUp(): any {
    return this.httpHelperService._http.get(`${this.httpHelperService.baseUrl}${this.controllerName}/GetRegistrationLookUp`);
  }

  logOut() {
    localStorage.removeItem("jwt");
  }

  setUserProfileInLocalStorage(userProfileModel: UserProfileModel) {
    localStorage.setItem('userProfile', JSON.stringify(userProfileModel));
  }

  getUserProfileFromLocalStorage(): UserProfileModel {
    return JSON.parse(localStorage.getItem('userProfile'));
  }

}