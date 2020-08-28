import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LoginModel } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

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
    return this.http.post("http://localhost:54095/Api/Account/Login", model, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  register(model: any) {
    return this.http.post("http://localhost:54095/api/Account/register", model, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  logOut() {
    localStorage.removeItem("jwt");
  }

}