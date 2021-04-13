import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from 'src/app/modules/authentication/models/user-profile.model';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { SalesOrderService } from 'src/app/modules/cart/services/sales-order.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  public paymentstatus;
  constructor(private authService: AuthService,
    private salesOrderService:SalesOrderService) { }
    userProfileModel : UserProfileModel;
  ngOnInit(): void {
    this.userProfileModel = this.authService.getUserProfileFromLocalStorage();
    this.salesOrderService.paymentStatus().subscribe(res=>{
      this.paymentstatus = res;
    });
   
  }

}
