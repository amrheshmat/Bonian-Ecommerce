import { Component, OnInit } from '@angular/core';
import { SalesOrderService } from '../../cart/services/sales-order.service';
import { UserProfileModel } from '../../authentication/models/user-profile.model';
import { AuthService } from '../../authentication/services/auth.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public userProfileModel: UserProfileModel;
  private getOrder;
  
  constructor(private authService: AuthService,
    private router: Router,
    private salesOrderService: SalesOrderService) { }

  ngOnInit(): void {
    this.getUserName();
    console.log(this.userProfileModel);
   //this.getOrder =  this.salesOrderService.getListByProfileId(1);
  }
  
  private getUserName() {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
  }
}
