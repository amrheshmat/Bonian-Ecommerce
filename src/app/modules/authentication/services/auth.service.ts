import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LoginModel } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHelperService } from '../../../shared/services/http-helper.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private jwtHelper: JwtHelperService, private httpHelperService: HttpHelperService) { }

  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  login(model: LoginModel) {
    return this.httpHelperService._http.get(`${this.httpHelperService.baseUrl}Api/ApiAccount/login?username=${model.username}&password=${model.password}`);
  }

  register(model: any) {
    return this.httpHelperService._http.post("http://localhost:54095/api/Account/register", model, 
    {
      headers: new HttpHeaders({
        'Content-Type':  'application/json', 
      })
    });

  }


  logOut() {
    localStorage.removeItem("jwt");
  }

}