import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../services/payments.service';
import { AuthService } from '../../authentication/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

import { CheckOutComponent } from '../../cart/components/check-out/check-out.component';

@Component({
  selector: 'app-orders',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
public redirectLink;
public checkOutComponent : CheckOutComponent;
public saveRedirectLink;
  constructor(private paymentsService: PaymentsService,private authService:AuthService,private sanitizer: DomSanitizer) { 

  }

  ngOnInit(): void {
 //  this.redirectLink = this.sendApi();
  // this.saveRedirectLink = this.getSafeUrl(this.redirectLink);
  // window.location.href = this.saveRedirectLink ;
 this.redirectLink = this.checkOutComponent.redirectUrl;
  }
  
}
