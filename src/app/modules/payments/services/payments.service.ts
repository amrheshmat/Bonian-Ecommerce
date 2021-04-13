import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHelperService } from '../../../shared/services/http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  controllerName: string = 'ApiECommerceSalesOrder';
  constructor(private http: HttpClient,private jwtHelper: JwtHelperService, private httpHelperService: HttpHelperService) { }
 
}
