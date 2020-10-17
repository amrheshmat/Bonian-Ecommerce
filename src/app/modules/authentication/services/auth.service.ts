import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LoginModel } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Injectable({ providedIn: 'root' })
export class AuthService {    
  baseUrl: string = "";

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.baseUrl = environment.apiUrl;
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
  
  login(model: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
      })
    }
      return this.http.post(this.baseUrl + "apiAccount/Login",model, httpOptions);
  }

  register(model: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json', 
      })
    }
      return this.http.post(this.baseUrl + "apiAccount/Registration",model, httpOptions);
    
  }

  logOut() {
    localStorage.removeItem("jwt");
  }

}